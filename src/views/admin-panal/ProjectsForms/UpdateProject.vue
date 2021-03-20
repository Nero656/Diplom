<template>
  <form class="container text-left mt-5 mb-4" >
    <div class="form-group">
      <label>Edit service</label>
      <b-form-select v-model="selected">
        <b-form-select-option
            v-for="(item, id) in selectService"
            v-bind:key="id"
            :value="item.id"
            @click="select(id)"
        >
          {{ item.title }}
        </b-form-select-option>
      </b-form-select>
    </div>

    <div class="form-group">
      <label>New project</label>
      <b-input type="text" v-model="preview[0].title" placeholder="Title"/>
    </div>

    <div class="form-group">
      <label>Image</label>
      <b-form-file
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          @change="fileUploadUpdate"
      ></b-form-file>
    </div>

    <!--      <div class="form-group">-->
    <!--        <label>Image URL</label>-->
    <!--        <b-input type="text" placeholder="URL" @change="fileUpload"/>-->
    <!--      </div>-->

    <!--            @change="fileUpload" -->
    <div class="form-group">
      <label for="tags-separators">Tags</label>
      <b-form-tags
          input-id="tags-separators"
          v-model="preview[0].tags"
          tag-pills
          tag-variant="primary"
          separator=" ,;"
          placeholder="Enter new tags separated by space, comma or semicolon"
          no-add-on-enter
      ></b-form-tags>
    </div>

    <div class="form-group">
      <label for="sb-step">Width</label>
      <b-form-spinbutton
          id="sb-step"
          v-model="preview[0].width"
          min="1"
          max="12"
          step="1"
      ></b-form-spinbutton>
    </div>

    <div class="form-group">
      <label>Color</label>
      <b-input type="color" v-model="preview[0].color"/>
    </div>

    <div class="form-group">
      <label>Description</label>
      <b-form-textarea
          id="textarea"
          v-model="preview[0].desc"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
      ></b-form-textarea>
    </div>

    <div class="form-group" v-show="preview[0].title">
      <label>Preview</label>
      <br>
      <Product
          :title="preview[0].title"
          :photo_url="picture_create"
          :color="preview[0].color"
          :width="preview[0].width"
          :tags="preview[0].tags"
          :desc="preview[0].desc"
      />
    </div>


    <b-button variant="primary" @click.prevent="updateProject">
      update
      <b-spinner small v-show="load"></b-spinner>
    </b-button>
  </form>
</template>

<script>
import axios from "axios";
import {server} from "@/Helper";
import Product from "@/components/Product";

export default {
  name: "UpdateProject",
  components: {Product},
  data: ()=>({
    selected: 0,
    load: false,
    tags: [],
    picture_create: '',
    tagsSTR: '',
    selectService: [],
    preview: [
      {
        title: '',
        photo_url: '',
        tags: [],
        width: 0,
        desc: '',
        color: '',
      }
    ],
  }),
  mounted() {
    axios.get(`${server.baseURL}/projects`)
        .then(res => {
          this.selectService = res.data
        })
  },
  methods:{

    fileUploadUpdate(event) {
      this.photo_url[0] = event.target.files[0];
      this.picture_create = URL.createObjectURL(this.photo_url);
    },

    updateProject() {
      this.load = true;
      for (let i = 0; i < this.preview[0].tags.length; i++) {
        this.tagsSTR += this.preview[0].tags[i];
        if (i < this.preview[0].tags.length - 1) {
          this.tagsSTR += ',';
        }
      }

      let fr = new FormData();

      fr.append("title", this.preview[0].newProject);
      fr.append("photo_url", this.preview[0].photo_url);
      fr.append("tags", this.preview[0].tagsSTR);
      fr.append("width", this.preview[0].width);
      fr.append("desc", this.preview[0].desc);
      fr.append("color", this.preview[0].color);


      // {
      //   title: this.preview[0].title,
      //       photo_url: this.preview[0].photo_url,
      //     tags: this.tagsSTR,
      //     width: this.preview[0].width,
      //     desc: this.preview[0].desc,
      //     color: this.preview[0].color
      // }

      axios
          .put(`${server.baseURL}/projects/` + this.selected, fr, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json'
            }
          })
          .then(res => {
            axios.get(`${server.baseURL}/projects`)
                .then(res => {
                  this.selectService = res.data
                })
            this.toast(
                'Success',
                'b-toaster-top-center',
                'success',
                'You create new project'
            );
            this.load = false;
          }, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .catch(error => {
            this.load = false;
            this.toast(
                'ERROR',
                'b-toaster-top-center',
                'danger',
                error.response.data.message
            );
          })
      this.tagsSTR = ''
    },

    select(id) {
      this.preview[0].title = this.selectService[id].title
      this.preview[0].photo_url = this.selectService[id].photo_url
      this.preview[0].tags = this.selectService[id].tags.split(',')
      this.preview[0].width = this.selectService[id].width
      this.preview[0].desc = this.selectService[id].desc
      this.preview[0].color = this.selectService[id].color
    },
    toast(title, toaster, variant, message) {
      this.counter++
      this.$bvToast.toast(message, {
        title: title,
        toaster: toaster,
        variant: variant,
        solid: true,
      })
    }
  }
}
</script>

<style scoped>

</style>

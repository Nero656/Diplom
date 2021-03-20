<template>
  <form class="container text-left mt-5 mb-4" >
    <div class="form-group">
      <label>New project</label>
      <b-input type="text" v-model="newProject" placeholder="Title"/>
    </div>

<!--    <div class="form-group">-->
<!--      <label>Image</label>-->
<!--      <b-form-file-->
<!--          placeholder="Choose a file or drop it here..."-->
<!--          drop-placeholder="Drop file here..."-->
<!--          @change="fileUpload"-->
<!--      ></b-form-file>-->
<!--    </div>-->
    <!--            -->

    <div class="form-group">
      <label>Image URL</label>
      <b-input type="text" v-model="photo_url" placeholder="URL"/>
    </div>

    <!--            -->
    <div class="form-group">
      <label for="tags-separators">Tags</label>
      <b-form-tags
          input-id="tags-separators"
          v-model="tags"
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
          v-model="width"
          min="1"
          max="12"
          step="1"
      ></b-form-spinbutton>
    </div>

    <div class="form-group">
      <label>Color</label>
      <b-input type="color" v-model="color"/>
    </div>

    <div class="form-group">
      <label>Description</label>
      <b-form-textarea
          id="textarea"
          v-model="desc"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
      ></b-form-textarea>
    </div>

    <div class="form-group" v-show="newProject">
      <label>Preview</label>
      <br>
      <Product
          :title="newProject"
          :photo_url="photo_url"
          :color="color"
          :width="width"
          :tags="tags"
          :desc="desc"
      />
    </div>

    <b-button variant="primary" @click.prevent="createProject">
      Create
      <b-spinner small v-show="load"></b-spinner>
    </b-button>
  </form>
</template>

<script>
import axios from "axios";
import {server} from "@/Helper";
import Product from "@/components/Product";

export default {
name: "CreateProject",
  components: {Product},
  data: ()=>({
    newProject: '',
    photo_url: '',
    picture_create: '',
    color: '',
    width: 1,
    desc: '',
    load: false,
    tags: [],
    tagsSTR: '',
  }),
  methods:{
    // fileUpload(event) {
    //   this.photo_url = event.target.files[0];
    //   this.picture_create = URL.createObjectURL(this.photo_url);
    // },

    createProject() {
      this.load = true;

      for (let i = 0; i < this.tags.length; i++) {
        this.tagsSTR += this.tags[i];
        if (i < this.tags.length - 1) {
          this.tagsSTR += ',';
        }
      }
      // todo
      // let fr = new FormData();
      //
      // fr.append("title", this.newProject);
      // fr.append("photo_url", this.photo_url);
      // fr.append("tags", this.tagsSTR);
      // fr.append("width", this.width);
      // fr.append("desc", this.desc);
      // fr.append("color", this.color);


      // console.log(fr, fr.get('photo_url'))
      // {

      axios
          .post(`${server.baseURL}/projects`,  {
            title: this.newProject,
            photo_url: this.photo_url,
            tags: this.tagsSTR,
            width: this.width,
            desc: this.desc,
            color: this.color
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
            this.tagsSTR = '';
          })
          .catch(error => {
            this.load = false;
            this.toast(
                'ERROR',
                'b-toaster-top-center',
                'danger',
                error.response.data.message
            );
            this.tagsSTR = '';
          })
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

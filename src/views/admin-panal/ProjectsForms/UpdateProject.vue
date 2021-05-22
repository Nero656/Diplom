<template>
  <form class="container text-left mt-5 mb-4">
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
      <label>Image URL</label>
      <b-input type="text" placeholder="URL"/>
    </div>

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
          :photo_url="preview[0].photo_url"
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
import {server} from "@/Helper";
import Product from "@/components/Product";

export default {
  name: "UpdateProject",
  components: {Product},
  data: () => ({
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
    fetch(`${server.baseURL}/projects/`).then(response =>{
      if(response.status !== 200){
        console.log(response.status);
      }else{
        response.json().then(data =>{
          this.selectService = data;
          this.LoadingCom = false;
        });
      }
    });
  },
  methods: {

    updateProject() {
      this.load = true;
      for (let i = 0; i < this.preview[0].tags.length; i++) {
        this.tagsSTR += this.preview[0].tags[i];
        if (i < this.preview[0].tags.length - 1) {
          this.tagsSTR += ',';
        }
      }


      fetch(`${server.baseURL}/projects/` + this.selected, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.preview[0].title,
          photo_url: this.preview[0].photo_url,
          tags: this.tagsSTR,
          width: this.preview[0].width,
          desc: this.preview[0].desc,
          color: this.preview[0].color
        })
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {

          fetch(`${server.baseURL}/projects`).then(response =>{
            response.json().then(data =>{
              this.selectService = data;
              this.LoadingCom = false;
            });
          });

          this.toast(
              'Success',
              'b-toaster-top-center',
              'success',
              'You create new project'
          );
          this.load = false;
          this.tagsSTR = '';
        }
      }).catch(error => {
            this.load = false;
            this.toast(
                'ERROR',
                'b-toaster-top-center',
                'danger',
                error
            )
      });
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

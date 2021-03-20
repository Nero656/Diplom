<template>
  <form class="container text-left mt-5"  >
    <div class="form-group">
      <label>New Stack</label>
      <b-input type="text" v-model="stack" placeholder="Title"/>
    </div>

    <div class="form-group"  v-show="picture_create">
      <label>Preview </label>
      <br>
      <div class='stack__list d-flex flex-wrap'>
        <div class="stack__list-item col-2">
          <b-img  class='stack__icon' :src = 'picture_create'  :alt="picture_create"></b-img>
          <h2 class='stack__name'>{{stack}}</h2>
        </div>
      </div>
    </div>

<!--    <div class="form-group">-->
<!--      <label>Image URL</label>-->
<!--      <b-input type="text" v-model="img" placeholder="URL"/>-->
<!--    </div>-->
    <div class="form-group">
      <label>Image</label>
      <b-form-file
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          @change="fileUpload"
      ></b-form-file>
    </div>


    <b-button variant="primary" @click.prevent="createStack">
      Create
      <b-spinner small v-show="load"></b-spinner>
    </b-button>
  </form>
</template>

<script>
import axios from "axios";
import {server} from "@/Helper";

export default {
name: "CreateStack",
  data: () =>({
    preview: {},
    stack: '',
    photo_url: '',
    selected: 0,
    selectStack: [],
    picture_create: '',
    load: false,
  }),
  methods: {
    fileUpload(event) {
      this.photo_url = event.target.files[0];
      this.picture_create = URL.createObjectURL(this.photo_url);
    },

    createStack(){
      this.load = true;

      let fr = new FormData();

      fr.append("title", this.stack);
      fr.append("photo_url", this.photo_url);

      axios
          .post(`${server.baseURL}/stack`,  fr, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json'
            }})
          .then(res => {

            axios
                .get(`${server.baseURL}/stack`)
                .then(res => {this.selectStack = res.data});

            this.toast(
                'Success',
                'b-toaster-top-center',
                'success',
                'You create new serves'
            );

            this.stack = '';
            this.img = '';
            this.load = false;
          })
          .catch(error => {
                this.toast(
                    'ERROR',
                    'b-toaster-top-center',
                    'danger',
                    error.response.data.message
                );
                this.load = false;
              }
          )
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

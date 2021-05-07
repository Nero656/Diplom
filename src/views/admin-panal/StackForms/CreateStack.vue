<template>
  <form class="container text-left mt-5"  >
    <div class="form-group">
      <label>New Stack</label>
      <b-input type="text" v-model="stack" placeholder="Title"/>
    </div>

    <div class="form-group"  v-show="img">
      <label>Preview </label>
      <br>
      <div class='stack__list d-flex flex-wrap'>
        <div class="stack__list-item col-2">
          <b-img  class='stack__icon' :src = 'img'  :alt="img"></b-img>
          <h2 class='stack__name'>{{stack}}</h2>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Image URL</label>
      <b-input type="text" v-model="img" placeholder="URL"/>

    </div>
<!--    <div class="form-group">-->
<!--      <label>Image</label>-->
<!--      <b-form-file-->
<!--          placeholder="Choose a file or drop it here..."-->
<!--          drop-placeholder="Drop file here..."-->
<!--          @change="fileUpload"-->
<!--      ></b-form-file>-->
<!--    </div>-->


    <b-button variant="primary" @click.prevent="createStack">
      Create
      <b-spinner small v-show="load"></b-spinner>
    </b-button>
  </form>
</template>

<script>
import {server} from "@/Helper";

export default {
name: "CreateStack",
  data: () =>({
    preview: {},
    stack: '',
    selected: 0,
    img: '',
    selectStack: [],
    load: false,
  }),
  methods: {
    // fileUpload(event) {
    //   this.photo_url = event.target.files[0];
    //   this.picture_create = URL.createObjectURL(this.photo_url);
    // },

    createStack(){
      this.load = true;

      // let fr = new FormData();
      //
      // fr.append("title", this.stack);
      // fr.append("photo_url", this.photo_url);

      fetch(`${server.baseURL}/stack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title:  this.stack,
          photo_url: this.img
        })
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {
          fetch(`${server.baseURL}/stack`).then(response =>{
            response.json().then(data =>{
              this.selectStack = data
            });
          });
          this.toast(
              'Success',
              'b-toaster-top-center',
              'success',
              'You create new stack'
          );
          this.load = false;
          this.tagsSTR = '';
        }
      }).catch(error => {
        this.toast(
            'ERROR',
            'b-toaster-top-center',
            'danger',
            error
        );
        this.load = false;
      });

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

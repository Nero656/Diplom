<template>
  <form class="container text-left mt-5">
    <div class="form-group">
      <label>Edit service</label>
      <b-form-select v-model="selected">
        <b-form-select-option
            v-for="(item, id) in selectStack"
            v-bind:key="id"
            :value="item.id"
            @click="select(id)"
        >
          {{ item.title }}
        </b-form-select-option>
      </b-form-select>
    </div>

    <div class="form-group" v-show="preview[0].img">
      <label>Preview </label>
      <br>
      <div class='stack__list d-flex flex-wrap'>
        <div class="stack__list-item col-2">
          <b-img class='stack__icon' :src='preview[0].img' :alt="preview[0].img"></b-img>
          <h2 class='stack__name'>{{ preview[0].title }}</h2>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>New Stack</label>
      <b-input type="text" v-model="preview[0].title" placeholder="Title"/>
    </div>

    <div class="form-group">
      <label>Image URL</label>
      <b-input type="text" v-model="preview[0].img" placeholder="URL"/>
    </div>

    <!--    <div class="form-group">-->
    <!--      <label>Image</label>-->
    <!--      <b-form-file-->
    <!--          placeholder="Choose a file or drop it here..."-->
    <!--          drop-placeholder="Drop file here..."-->
    <!--          @change="fileUpload"-->
    <!--      ></b-form-file>-->
    <!--    </div>-->

    <b-button variant="primary" @click.prevent="updateStack">
      Create
      <b-spinner small v-show="load"></b-spinner>
    </b-button>
  </form>
</template>

<script>
import axios from "axios";
import {server} from "@/Helper";

export default {
  name: "UpdateStack",
  data: () => ({
    preview: [
      {
        title: '',
        img: '',
      }
    ],
    selected: 0,
    selectStack: [],
    load: false,
  }),
  mounted() {
    axios.get(`${server.baseURL}/stack`)
        .then(res => {
          this.selectStack = res.data
        })
  },
  methods: {
    // fileUpload(event) {
    //   this.photo_url = event.target.files[0];
    //   this.preview.img = URL.createObjectURL(this.photo_url);
    // },

    updateStack() {
      this.load = true;

      // let fr = new FormData();
      //
      // fr.append("title", this.stack);
      // fr.append("photo_url", this.photo_url);

      axios
          .put(`${server.baseURL}/Stack/` + this.selected, {
            title: this.preview[0].title,
            photo_url: this.preview[0].img
          })
          .then(
              res => {
                axios
                    .get(`${server.baseURL}/stack`)
                    .then(res => {
                      this.selectStack = res.data
                    });
                this.toast(
                    'Success',
                    'b-toaster-top-center',
                    'success',
                    'You update stack'
                );
                this.stack = '';
                this.img = '';
                this.load = false;
              }
          )
          .catch(error => {
                this.toast(
                    'ERROR',
                    'b-toaster-top-center',
                    'danger',
                    error.response.data
                );
                this.load = false;
              }
          )
    },

    select(id) {
      this.preview[0].img = this.selectStack[id].photo_url;
      this.preview[0].title = this.selectStack[id].title;
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

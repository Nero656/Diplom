<template>
  <form class="container text-left mt-5" >
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

    <div class="form-group" v-show="img">
      <label>Preview</label>
      <br>
      <b-img
          height="150px"
          class="mt-2 ml-2 partners__item"
          :src="img"
      />
    </div>

    <b-button variant="primary" @click.prevent="createPartner">
      Create
      <b-spinner small v-show="load"></b-spinner>
    </b-button>
  </form>
</template>

<script>
import axios from "axios";
import {server} from "@/Helper";

export default {
  name: "CreatePartners",
  data: () => ({
    selected: 0,
    img: '',
    preview: '',
    picture_create: '',
    selectPartners: [],
    load: false,
  }),
  methods: {
    // fileUpload(event) {
    //   this.photo_url = event.target.files[0];
    //   this.picture_create = URL.createObjectURL(this.photo_url);
    // },

    createPartner(){
      this.load = true;

      // let fr = new FormData();
      //
      // fr.append("photo_url", this.photo_url);

      axios
          .post(`${server.baseURL}/partners`,{
            photo_url: this.img
          })
          .then(res => {
            this.toast(
                'Success',
                'b-toaster-top-center',
                'success',
                'You create new serves'
            );
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

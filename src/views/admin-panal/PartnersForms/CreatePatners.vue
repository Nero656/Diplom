<template>
  <form class="container text-left mt-5">
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

    createPartner() {
      this.load = true;

      // let fr = new FormData();
      //
      // fr.append("photo_url", this.photo_url);

      fetch(`${server.baseURL}/partners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          photo_url: this.img
        })
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {
          fetch(`${server.baseURL}/partners`).then(response => {
            response.json().then(data => {
              this.selectStack = data
            });
          });
          this.toast(
              'Success',
              'b-toaster-top-center',
              'success',
              'You create new partner'
          );
          this.img = '';
          this.load = false;
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

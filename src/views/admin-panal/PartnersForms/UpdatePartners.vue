<template>
  <form class="container text-left mt-5" v-show="navBut[1].state" >
    <div class="form-group">
      <label>Edit service</label>
      <b-form-select v-model="selected">
        <b-form-select-option
            v-for="(item, id) in selectPartners"
            v-bind:key="id"
            :value="item.id"
            @click="select(id)"
        >
          {{item.id}}
        </b-form-select-option>
      </b-form-select>
    </div>

    <div class="form-group"  v-show="preview">
      <label>Preview </label>
      <br>
      <b-img
          height="150px"
          class="partners__item"
          :src="preview"
      />
    </div>

<!--    <div class="form-group">-->
<!--      <label>Image</label>-->
<!--      <b-form-file-->
<!--          placeholder="Choose a file or drop it here..."-->
<!--          drop-placeholder="Drop file here..."-->
<!--          @change="fileUpload"-->
<!--      ></b-form-file>-->
<!--    </div>-->

    <div class="form-group">
      <label>Image URL</label>
      <b-input type="text" v-model="preview" placeholder="URL"/>
    </div>


    <b-button variant="primary" @click.prevent="updatePartner">
      Create
      <b-spinner small v-show="load"></b-spinner>
    </b-button>
  </form>

</template>

<script>
import {server} from "@/Helper";

export default {
  name: "UpdatePartners",
  data:()=>({
    selected: 0,
    preview: '',
    selectPartners: [],
    load: false,
    navBut: [
      {id: 0, name: 'create', state: true},
      {id: 1, name: 'update', state: false},
      {id: 2, name: 'delete', state: false},
    ]
  }),
  mounted() {
    fetch(`${server.baseURL}/partners`).then(response => {
      response.json().then(data => {
        this.selectPartners = data
      });
    });
  },
  methods:{
    // fileUpload(event) {
    //   this.photo_url = event.target.files[0];
    //   this.preview = URL.createObjectURL(this.photo_url);
    // },

    updatePartner(){
      this.load = true;

      // let fr = new FormData();
      //
      // fr.append("photo_url", this.photo_url);

      fetch(`${server.baseURL}/partners/`+this.selected, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          photo_url: this.preview
        })
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {
          this.toast(
              'Success',
              'b-toaster-top-center',
              'success',
              'You update partner'
          );
          this.preview = '';
          this.load = false;
        }
        fetch(`${server.baseURL}/partners`).then(response => {
          response.json().then(data => {
            this.selectStack = data
          });
        });
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

    select(id){
      this.preview = this.selectPartners[id].photo_url;
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

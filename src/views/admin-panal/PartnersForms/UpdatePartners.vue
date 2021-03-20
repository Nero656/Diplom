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
import axios from "axios";
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
    axios.
    get(`${server.baseURL}/partners`)
        .then(res => {this.selectPartners = res.data})
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

      axios
          .put(`${server.baseURL}/partners/`+this.selected,{
            photo_url: this.preview
          } )
          .then(
              res => {
                axios.
                get(`${server.baseURL}/partners`)
                    .then(res => {this.selectPartners = res.data})
                this.toast(
                    'Success',
                    'b-toaster-top-center',
                    'success',
                    'You update new serves'
                );
                this.selectPartner = this.preview;
                this.preview = '';
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

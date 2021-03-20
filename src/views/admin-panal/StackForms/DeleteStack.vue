<template>
  <form class="container text-left mt-5"  >
    <div class="form-group">
      <label>Delete service category</label>
      <b-form-select v-model="selected">
        <b-form-select-option
            v-for="(item, id) in selectStack"
            v-bind:key="id"
            :value="item.id"
            @click="select(id)"
        >
          {{item.title}}
        </b-form-select-option>
      </b-form-select>
    </div>

    <div class="form-group"  v-show="preview.img">
      <label>Preview </label>
      <br>
      <div class='stack__list d-flex flex-wrap'>
        <div class="stack__list-item col-2">
          <b-img  class='stack__icon' :src = 'preview.img'  :alt="img"></b-img>
          <h2 class='stack__name'>{{preview.title}}</h2>
        </div>
      </div>
    </div>

    <b-button variant="danger" @click.prevent="deleteStack">
      Delete
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
    preview: {},
    stack: '',
    photo_url: '',
    img: '',
    selected: 0,
    selectStack: [],
    load: false,
  }),
  mounted() {
    axios.
    get(`${server.baseURL}/stack`)
        .then(res => {this.selectStack = res.data})
  },
  methods:{
    deleteStack(){
      this.load = true;
      axios
          .delete(`${server.baseURL}/stack/`+this.selected)
          .then(
              res => {
                axios
                    .get(`${server.baseURL}/stack`)
                    .then(res => {this.selectStack = res.data});

                this.load = false;
                this.toast(
                    'Success',
                    'b-toaster-top-center',
                    'success',
                    'You delete new serves'
                );
              }
          )
          .catch(error => {
                this.load = false;
                this.toast(
                    'ERROR',
                    'b-toaster-top-center',
                    'danger',
                    error.response.data.message
                );
              }
          )
    },

    select(id){
      this.preview.img = this.selectStack[id].photo_url;
      this.preview.title = this.selectStack[id].title;
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

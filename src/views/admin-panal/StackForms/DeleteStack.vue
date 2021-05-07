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
    fetch(`${server.baseURL}/stack`).then(response =>{
      response.json().then(data =>{
        this.selectStack = data
      });
    });
  },
  methods:{
    deleteStack(){
      this.load = true;
      fetch(`${server.baseURL}/stack/`+this.selected, {
        method: 'DELETE',
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
              'You update stack'
          );
          this.stack = '';
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

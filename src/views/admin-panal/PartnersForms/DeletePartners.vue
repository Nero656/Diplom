<template>
  <form class="container text-left mt-5" >
    <div class="form-group">
      <label>Delete service category</label>
      <b-form-select v-model="selected">
        <b-form-select-option
            v-for="(item, id) in selectPartners"
            v-bind:key="id"
            :value="item.id"
            @click="select(id)"
        >
          {{ item.id }}
        </b-form-select-option>
      </b-form-select>

    </div>
    <div class="form-group" v-show="preview">
      <label>Preview </label>
      <br>
      <b-img
          height="150px"
          class="partners__item"
          :src="preview"
      />
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
  name: "DeletePartners",
  data: () => ({
    selected: 0,
    img: '',
    preview: '',
    selectPartners: [],
    load: false,

  }),
  mounted() {
    fetch(`${server.baseURL}/partners`).then(response => {
      response.json().then(data => {
        this.selectPartners = data
      });
    });
  },
  methods: {
    deleteStack() {
      this.load = true;
      fetch(`${server.baseURL}/partners/`+this.selected, {
        method: 'DELETE',
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

    select(id) {
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

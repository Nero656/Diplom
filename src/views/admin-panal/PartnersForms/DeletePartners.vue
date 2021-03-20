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
    axios.get(`${server.baseURL}/partners`)
        .then(res => {
          this.selectPartners = res.data
        })
  },
  methods: {
    deleteStack() {
      this.load = true;
      axios
          .delete(`${server.baseURL}/partners/` + this.selected)
          .then(
              res => {
                axios.get(`${server.baseURL}/partners`)
                    .then(res => {
                      this.selectPartners = res.data
                    })
                this.toast(
                    'Success',
                    'b-toaster-top-center',
                    'success',
                    'You delete new serves'
                );
                this.load = false;
              }
          )
          .catch(error => {
                this.load = false;
                this.toast(
                    'ERROR',
                    'b-toaster-top-center',
                    'danger',
                    'You not delete new serves'
                );
              }
          )
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

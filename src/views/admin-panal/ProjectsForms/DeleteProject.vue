<template>
  <form class="container text-left mt-5" >
    <div class="form-group">
      <label>Delete service project</label>
      <b-form-select v-model="selected">
        <b-form-select-option
            v-for="(item, id) in selectService"
            v-bind:key="id"
            :value="item.id"
            @click="select(id)"
        >
          {{ item.title }}
        </b-form-select-option>
      </b-form-select>
    </div>

    <div class="form-group" v-show="preview[0].title">
      <label>Preview</label>
      <br>
      <Product
          :title="preview[0].title"
          :photo_url="preview[0].photo_url"
          :color="preview[0].color"
          :width="preview[0].width"
          :tags="preview[0].tags"
          :desc="preview[0].desc"
      />
    </div>


    <b-button variant="danger" @click.prevent="deleteProject">
      Delete
      <b-spinner small v-show="load"></b-spinner>
    </b-button>
  </form>
</template>

<script>
import axios from "axios";
import {server} from "@/Helper";
import Product from "@/components/Product";

export default {
  name: "DeleteProject",
  components: {Product},
  data: () => ({
    selected: 0,
    selectService: [],
    picture_create: '',
    load: false,
    tags: [],
    tagsSTR: '',
    preview: [
      {
        title: '',
        photo_url: '',
        tags: [],
        width: 0,
        desc: '',
        color: '',
      }
    ]
  }),
  mounted() {
    axios.get(`${server.baseURL}/projects`)
        .then(res => {
          this.selectService = res.data
        })
  },
  methods:{
    deleteProject() {
      this.load = true;
      axios
          .delete(`${server.baseURL}/projects/` + this.selected)
          .then(
              res => {
                axios.get(`${server.baseURL}/projects`)
                    .then(res => {
                      this.selectService = res.data
                    })

                this.toast(
                    'Success',
                    'b-toaster-top-center',
                    'success',
                    'You delete new project'
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
                    error.response.data
                );
              }
          )
      this.newCategory = '';
    },

    select(id) {
      this.preview[0].title = this.selectService[id].title
      this.preview[0].photo_url = this.selectService[id].photo_url
      this.preview[0].tags = this.selectService[id].tags.split(',')
      this.preview[0].width = this.selectService[id].width
      this.preview[0].desc = this.selectService[id].desc
      this.preview[0].color = this.selectService[id].color
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

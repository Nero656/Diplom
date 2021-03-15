<template>
  <div>
    <b-nav tabs align="center">
      <li class="nav-item" v-for="(item, id) in navBut" v-bind:key="id" style="cursor: pointer">
        <span v-if="item.state === true" class="nav-link active">{{ item.name }}</span>
        <span class="nav-link" v-if="item.state !== true" @click="checkedForm(item.id)">{{ item.name }}</span>
      </li>
    </b-nav>


    <!--  create  -->
    <form class="container text-left mt-5" v-show="navBut[0].state" >
      <div class="form-group">
        <label>Image URL</label>
        <b-input type="text" v-model="img" placeholder="URL"/>
      </div>

      <b-button variant="primary" @click.prevent="createStack">
        Create
        <b-spinner small v-show="load"></b-spinner>
      </b-button>
    </form>


    <!--  update  -->
    <form class="container text-left mt-5" v-show="navBut[1].state" >
      <div class="form-group">
        <label>Edit service</label>
        <b-form-select v-model="selected">
          <b-form-select-option
              v-for="(item, id) in selectPartners"
              v-bind:key="id"
              :value="item.id"
          >
            {{item.title}}
          </b-form-select-option>
        </b-form-select>
      </div>

      <div class="form-group">
        <label>Image URL</label>
        <b-input type="text" v-model="img" placeholder="URL"/>
      </div>

      <b-button variant="primary" @click.prevent="updateStack">
        Create
        <b-spinner small v-show="load"></b-spinner>
      </b-button>
    </form>

    <!--  del  -->
    <form class="container text-left mt-5"  v-show="navBut[2].state">
      <div class="form-group">
        <label>Delete service category</label>
        <b-form-select v-model="selected">
          <b-form-select-option
              v-for="(item, id) in selectPartners"
              v-bind:key="id"
              :value="item.id"
          >
            {{item.title}}
          </b-form-select-option>
        </b-form-select>
      </div>
      <b-button variant="danger" @click.prevent="deleteStack">
        Delete
        <b-spinner small v-show="load"></b-spinner>
      </b-button>
    </form>

  </div>
</template>

<script>
import axios from "axios";
import {server} from "@/Helper";

export default {
  name: "PartnersForm",
  data:()=>({
    selected: 0,
    img: '',
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
    checkedForm(id)
    {
      for (let i = 0; i < this.navBut.length; i++){
        if (this.navBut[i].state === true){
          this.navBut[i].state = false;
        }
      }
      this.navBut[id].state = !this.navBut[id].state
    },


    createStack(){
      this.load = true;
      axios
          .post(`${server.baseURL}/partners`, {
            photo_url: this.img
          })
          .then(res => {
            this.toast(
                'b-toaster-top-center',
                'success',
                'You create new serves'
            );
            this.img = '';
            this.load = false;
          })
          .catch(error => {
                this.toast(
                    'b-toaster-top-center',
                    'danger',
                    'You not create new serves'
                );
                this.load = false;
              }
          )
    },

    updateStack(){
      this.load = true;
      axios
          .put(`${server.baseURL}/partners/`+this.selected, {
            photo_url: this.img
          })
          .then(
              res => {
                this.toast(
                    'b-toaster-top-center',
                    'success',
                    'You update new serves'
                );
                this.img = '';
                this.load = false;
              }
          )
          .catch(error => {

                this.toast(
                    'b-toaster-top-center',
                    'danger',
                    'You not update new serves'
                );
                this.load = false;
              }
          )
    },

    deleteStack(){
      this.load = true;
      axios
          .delete(`${server.baseURL}/partners/`+this.selected)
          .then(
              res => {
                this.load = false;
                this.toast(
                    'b-toaster-top-center',
                    'success',
                    'You delete new serves'
                );
              }
          )
          .catch(error => {
                this.load = false;
                this.toast(
                    'b-toaster-top-center',
                    'danger',
                    'You not delete new serves'
                );
              }
          )
    },


    toast(toaster, variant, message) {
      this.counter++
      this.$bvToast.toast(message, {
        title: `Success`,
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

<template>
  <div>
    <b-nav tabs align="center">
      <li class="nav-item" v-for="(item, id) in navBut" v-bind:key="id" style="cursor: pointer">
        <span v-if="item.state === true" class="nav-link active">{{ item.name }}</span>
        <span class="nav-link" v-if="item.state !== true" @click="checkedForm(item.id)">{{ item.name }}</span>
      </li>
    </b-nav>

    <form class="container text-left mt-5" v-show="navBut[0].state" >
      <div class="form-group">
        <label>Select service</label>
        <b-form-select v-model="selectedCategory">
          <b-form-select-option
              v-for="(item, id) in selectService"
              v-bind:key="id"
              :value="item.id"
          >
            {{item.title}}
          </b-form-select-option>
        </b-form-select>

        <label class="mt-3">New service category</label>
        <b-input type="text" v-model="newCategory"/>

        <label class="mt-3">Description</label>
        <b-form-textarea
            id="textarea"
            v-model="desc"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
        ></b-form-textarea>
      </div>
      <b-button variant="primary" @click.prevent="createService">
        Create
        <b-spinner small v-show="load"></b-spinner>
      </b-button>
    </form>

    <form class="container text-left mt-5" v-show="navBut[1].state">
      <div class="form-group">
        <label>Select service</label>
        <b-form-select v-model="selected">
          <b-form-select-option
              v-for="(item, id) in selectService"
              v-bind:key="id"
              :value="item.id"
          >
            {{item.title}}
          </b-form-select-option>
        </b-form-select>

        <label class="mt-3">Edit category</label>
        <b-form-select v-model="selectedCategory">
          <b-form-select-option
              v-for="(item, id) in selectCategory"
              v-bind:key="id"
              :value="item.id"
          >
            {{item.title}}
          </b-form-select-option>
        </b-form-select>
        <label class="mt-3">Edit service name</label>
        <b-input type="text" v-model="newCategory" placeholder="New name"/>

        <label class="mt-3">Description</label>
        <b-form-textarea
            id="textarea"
            v-model="desc"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
        ></b-form-textarea>
      </div>

      <b-button variant="primary" @click.prevent="updateService">
        update
        <b-spinner small v-show="load"></b-spinner>
      </b-button>
    </form>

    <form class="container text-left mt-5"  v-show="navBut[2].state">
      <div class="form-group">
        <label>Delete service</label>
        <b-form-select v-model="selected">
          <b-form-select-option
              v-for="(item, id) in selectCategory"
              v-bind:key="id"
              :value="item.id"
          >
            {{item.title}}
          </b-form-select-option>
        </b-form-select>
      </div>
      <b-button variant="danger" @click.prevent="deleteService">
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
  name: "serviceCategoryForm",
  data:()=>({
    newCategory: '',
    desc: '',
    selected: 0,
    selectedCategory: 0,
    selectService: [],
    selectCategory: [],
    load: false,
    navBut: [
      {id: 0, name: 'create', state: true},
      {id: 1, name: 'update', state: false},
      {id: 2, name: 'delete', state: false},
    ]
  }),
  mounted() {
    fetch(`${server.baseURL}/services/`).then(response =>{
      if(response.status !== 200){
        console.log(response.status);
      }else{
        response.json().then(data =>{
          this.selectService = data;
          this.LoadingCom = false;
        });
      }
    });

    fetch(`${server.baseURL}/services-categories/`).then(response =>{
      if(response.status !== 200){
        console.log(response.status);
      }else{
        response.json().then(data =>{
          this.selectCategory = data;
          this.LoadingCom = false;
        });
      }
    });
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

    createService(){
      this.load = true;
      fetch(`${server.baseURL}/services-categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.newCategory,
          service: this.selectedCategory,
          desc: this.desc
        })
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {
          this.toast(
              'b-toaster-top-center',
              'success',
              'You create new serves'
          );
          fetch(`${server.baseURL}/services/`).then(response =>{
            response.json().then(data =>{
              this.selectService = data;
              this.LoadingCom = false;
            });
          });
          fetch(`${server.baseURL}/services-categories/`).then(response =>{
            response.json().then(data =>{
              this.selectCategory = data;
              this.LoadingCom = false;
            });
          });
          this.load = false;
        }
      }).catch(error => {
        this.load = false;
        this.toast(
            'b-toaster-top-center',
            'danger',
            'You not create new serves ' + error,
        );
      });
      this.newCategory = '';
      this.selectedCategory = '';
      this.desc = '';
    },

    updateService(){
      this.load = true;
      fetch(`${server.baseURL}/services-categories/`+this.selected, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.newCategory,
          service: this.selectedCategory,
          desc: this.desc
        })
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {
          this.toast(
              'b-toaster-top-center',
              'success',
              'You update new serves'
          );

          fetch(`${server.baseURL}/services/`).then(response =>{
            response.json().then(data =>{
              this.selectService = data;
              this.LoadingCom = false;
            });
          });
          fetch(`${server.baseURL}/services-categories/`).then(response =>{
            response.json().then(data =>{
              this.selectCategory = data;
              this.LoadingCom = false;
            });
          });
          this.load = false;
        }
      }).catch(error => {
        this.load = false;
        this.toast(
            'b-toaster-top-center',
            'danger',
            'You not create new serves ' + error,
        );
      });

      this.newCategory = '';
      this.selected = '';
      this.desc = '';
    },

    deleteService(){
      this.load = true;
      fetch(`${server.baseURL}/services-categories/`+this.selected, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.newCategory,
          service: this.selectedCategory,
          desc: this.desc
        })
      }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        } else {
          this.toast(
              'b-toaster-top-center',
              'success',
              'You update new serves'
          );

          fetch(`${server.baseURL}/services/`).then(response =>{
            response.json().then(data =>{
              this.selectService = data;
              this.LoadingCom = false;
            });
          });
          fetch(`${server.baseURL}/services-categories/`).then(response =>{
            response.json().then(data =>{
              this.selectCategory = data;
              this.LoadingCom = false;
            });
          });
          this.load = false;
        }
      }).catch(error => {
        this.load = false;
        this.toast(
            'b-toaster-top-center',
            'danger',
            'You not create new serves ',
            error,
        );
      });



      this.newCategory = '';
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


<template>
 <div>
   <b-nav tabs align="center">
     <li class="nav-item" v-for="(item, id) in navBut" v-bind:key="id" style="cursor: pointer">
       <span v-if="item.state === true" class="nav-link active">{{ item.name }}</span>
       <span class="nav-link" v-if="item.state !== true" @click="checkedForm(item.id)">{{ item.name }}</span>
     </li>
   </b-nav>
<!-- create   -->
   <form class="container text-left mt-5" v-show="navBut[0].state" >
     <div class="form-group">
       <label>New service</label>
       <b-input type="text" v-model="newCategory"/>
     </div>
     <b-button variant="primary" @click.prevent="createService">
       Create
       <b-spinner small v-show="load"></b-spinner>
     </b-button>
   </form>

   <form class="container text-left mt-5" v-show="navBut[1].state">
     <div class="form-group">
       <label>Edit service</label>
       <b-form-select v-model="selected">
         <b-form-select-option
             v-for="(item, id) in selectService"
             v-bind:key="id"
             :value="item.id"
         >
           {{item.title}}
         </b-form-select-option>
       </b-form-select>
       <label class="mt-3">Edit service category name</label>
       <b-input type="text" v-model="newCategory" placeholder="New name"/>
     </div>
     <b-button variant="primary" @click.prevent="updateService">
       update
       <b-spinner small v-show="load"></b-spinner>
     </b-button>
   </form>

   <form class="container text-left mt-5"  v-show="navBut[2].state">
     <div class="form-group">
       <label>Delete service category</label>
       <b-form-select v-model="selected">
         <b-form-select-option
             v-for="(item, id) in selectService"
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
  name: "servicesCreateForm",
  data:()=>({
    newCategory: '',
    selected: 0,
    selectService: [],
    load: false,
    navBut: [
      {id: 0, name: 'create', state: true},
      {id: 1, name: 'update', state: false},
      {id: 2, name: 'delete', state: false},
    ]
  }),
  mounted() {
    axios.
        get(`${server.baseURL}/services`)
        .then(res => {this.selectService = res.data})
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
      axios
        .post(`${server.baseURL}/services`, {
          title: this.newCategory
        })
        .then(
            res => {
              this.load = false;
              this.toast(
                  'b-toaster-top-center',
                  'success',
                  'You create new serves'
              );
            }
        )
        .catch(error => {
                this.load = false;
                this.toast(
                    'b-toaster-top-center',
                    'danger',
                    'You not create new serves'
                );
            }
        )
      this.newCategory = '';
    },

    updateService(){
      this.load = true;
      axios
          .put(`${server.baseURL}/services/`+this.selected, {
            title: this.newCategory
          })
          .then(
              res => {
                this.load = false;
                this.toast(
                    'b-toaster-top-center',
                    'success',
                    'You update new serves'
                );
              }
          )
          .catch(error => {
                this.load = false;
                this.toast(
                    'b-toaster-top-center',
                    'danger',
                    'You not update new serves'
                );
              }
          )
      this.newCategory = '';
    },

    deleteService(){
      this.load = true;
      axios
          .delete(`${server.baseURL}/services/`+this.selected, {
            title: this.newCategory
          })
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

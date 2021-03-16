<template>
  <b-modal :id="idModal" :ref="idModal" size="xl" hide-header hide-footer centered>

    <b-alert
        v-model="showTop"
        class="position-fixed fixed-top m-0 rounded-0"
        style="z-index: 2000;"
        variant="danger"
        dismissible
    >
      Error in input data: <b v-for="(item, id) in err" v-bind:key="id"><br> {{ item }} </b>
    </b-alert>

    <b-form   @submit.prevent="sendIdea">
      <div class="modal-header mb-4">
        <h3 class="Contact__Modal">Contact us</h3>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="row row-cols-1 row-cols-lg-2">
        <div class="container col-lg-5 " >
          <label for="input-name">Name:</label>
          <b-input-group class="mb-2 success">
            <b-input-group-prepend is-text>
              <b-icon icon="person"></b-icon>
            </b-input-group-prepend>
            <b-form-input
                required
                class="input__form"
                id="input-name"
                v-model="name"

                aria-describedby="input-live-help input-live-feedback"
                placeholder=" Enter your name"
            />

          </b-input-group>

          <br/>
          <label for="input-email">email:</label>
          <b-input-group class="mb-2 success">
            <b-input-group-prepend is-text>
              <b-icon icon="envelope"></b-icon>
            </b-input-group-prepend>
            <b-form-input
                type="email"
                required
                class="input__form form-control"
                id="input-email"
                v-model="email"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Enter your email"
                trim
            />
          </b-input-group>

          <br/>
          <label for="input-Phone">Phone number:</label>
          <b-input-group class="mb-2 success">
            <b-input-group-prepend is-text>
              <b-icon icon="telephone"></b-icon>
            </b-input-group-prepend>
            <input-mask
                required
                type="tel"
                class="input__form form-control"
                id="input-Phone"
                v-model="phoneNumber"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Enter your phone number"
                trim
                mask="+7\ 999 999 99 99"
                maskChar=" "
            />

          </b-input-group>
        </div>

        <div class="col-lg-7">
          <label for="textarea-rows">What is your project about?*:</label>
          <b-form-textarea
              required
              class="input__form"
              v-model="project"
              id="textarea-rows"
              placeholder="Tell us about your project..."
              style="height: 8em"
          ></b-form-textarea>
          <br>
          <label for="textarea-Budget*">budget*:</label>
            <div v-for="(item, id) in budgetArr" v-bind:key="id">
              <span class="ml-2 mt-1" :class="item.class" @click="ChoosePrice(id)"> {{item.price}}</span>
            </div>
        </div>

        <div class="ml-3 mt-4">
          <label for="textarea-Services*">Services*:</label>

          <div v-for="(item, id) in serviceArr" v-bind:key="id">
            <span class="ml-2 mt-1" :class="item.class"  @click="ChooseService(id)"> {{item.title}}</span>
          </div>
        </div>

      </div>

      <div class="container-fluid justify-content-center d-flex mt-4">
        <button class='button info__button'>
          send message
        </button>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import axios from "axios";
import { server } from '@/Helper'

export default {
  name: "ContactUs",
  data: () => ({
    showTop: false,
    name: '',
    email: '',
    project: '',
    phoneNumber: '',
    budgetArr: [
          { price : ' 10-20k $ ', active: false, class: 'budget__item'},
          { price : ' 30-50k $ ', active: false, class: 'budget__item'},
          { price : ' 75-100k $ ', active: false, class: 'budget__item'},
          { price : ' unlimited ', active: false, class: 'budget__item'}
        ],
    serviceArr: [],
    budget: '',
    service: '',
    err: []
  }),
  props:{
    idModal: {
      type: String,
      default: null
    }
  },
  mounted(){
    axios
        .get(`${server.baseURL}/services/`)
        .then(res => {this.serviceArr = res.data})
  },
  methods:{
    hideModal() {
      this.$refs[this.idModal].hide()
    },

    ChoosePrice(id){
      this.budgetArr[id].active = !this.budgetArr[id].active;

      if(this.budgetArr[id].active === true){
        this.budgetArr[id].class = 'budget__item__chosen';
      }
      else{
        this.budgetArr[id].class = 'budget__item';
      }
    },

    toast(toaster, append = false) {
      this.$bvToast.toast(`We will contact you shortly`, {
        title: `Message sent`,
        toaster: toaster,
        variant: 'success',
        solid: true,
        appendToast: append
      })
    },

    ChooseService(id){
      this.serviceArr[id].active = !this.serviceArr[id].active;

      if(this.serviceArr[id].active === true){
        this.serviceArr[id].class = 'budget__item__chosen';
        this.service = this.serviceArr[id].title;
      }
      else{
        this.serviceArr[id].class = 'budget__item';
      }
    },

    sendIdea() {
      for (let i = 0; i < this.budgetArr.length; i++){
        if (this.budgetArr[i].active === true){
           this.budget += this.budgetArr[i].price;
        }
      }

      for (let i = 0; i < this.serviceArr.length; i++){
        if (this.serviceArr[i].active === true){
          this.service += this.serviceArr[i].title+' ';
        }
      }

      axios
      .post(`${server.baseURL}/contact-us`, {
        name: this.name,
        phone_number: this.phoneNumber,
        email: this.email,
        about_project: this.project,
        budget: this.budget,
        services: this.service
      })
      .then(
          ()=>{
            this.name = '';
            this.email = '';
            this.budget = '';
            this.project = '';
            this.service = '';
            this.phoneNumber = '';
            this.err = [];

            for (let i = 0; i < this.budgetArr.length; i++){
              if (this.budgetArr[i].active === true){
                this.budgetArr[i].active = false;
                this.budgetArr[i].class = 'budget__item';
              }
            }

            for (let i = 0; i < this.serviceArr.length; i++){
              if (this.serviceArr[i].active === true){
                this.serviceArr[i].active = false;
                this.serviceArr[i].class = 'budget__item';
              }
            }


            this.$refs[this.idModal].hide()
            this.toast('b-toaster-bottom-left', true)
          }
      )
      .catch(err => {
        this.err = err.response.data.message;
        this.budget = '';
        this.service = '';
        this.showTop = true;
      })

    },
  }
}
</script>

<style scoped>
</style>

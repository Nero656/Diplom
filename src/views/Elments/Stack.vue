<template>
  <section class='container stack' id = 'Stack'>
    <h1 class='stack__title'>Stack</h1>

    <p class='stack__text'>
      From the vast number of existing technologies we only select the most effective
      ones for our work, in which we have high expertise and which enable us to deliver
      the best results.
    </p>
    <LoadingCom  v-if="LoadingCom === true"/>
    <div class='stack__list d-flex flex-wrap'>
      <div class="stack__list-item col-6 col-sm-3 col-lg-2" v-for="(item, id) in stackArr" v-bind:key="id">
        <b-img  class='stack__icon' :src = 'item.photo_url'  :alt="item.item"></b-img>
        <h2 class='stack__name'>{{item.title}}</h2>
      </div>
    </div>
  </section>
</template>

<script>
import { server } from "@/Helper";
import LoadingCom from "@/components/LoadingCom";
export default {
  name: "Stack",
  components: {LoadingCom},
  data: () => ({
    LoadingCom: true,
    stackArr: []
  }),
  mounted() {
    fetch(`${server.baseURL}/stack/`).then(response =>{
      if(response.status !== 200){
        console.log(response.status);
      }else{
        response.json().then( function( data ){
          this.stackArr = data;
          this.LoadingCom = false;
        }.bind(this));
      }
    })
  }
}
</script>

<style scoped>
  .stack{
    margin-top: 2%;
    text-align: left;
  }
</style>

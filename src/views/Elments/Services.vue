<template>
  <section class='container services main__services' id="Services">
    <h1 class='services__title'>Services</h1>
    <LoadingCom v-if="LoadingCom === true"/>
    <div v-for="(item, id) in serviceArr" v-bind:key="id" class='services__container position-relative' v-else>
      <ul class='services__list col d-flex flex-wrap p-0'>
        <li class='services__list-item col-12 col-lg-3 ml-3' v-for="(el, id) in item.categories" v-bind:key="id">
          <div class='service-card overflow-hidden'>
            <p class='service-card__text'>{{ el.title }}</p>

            <div class='service-card__description'>
              {{ el.desc }}
            </div>
          </div>
        </li>
      </ul>
      <div class='services__label'>
        <span class='services__label-text'>{{ item.title }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import {server} from '@/Helper'
import LoadingCom from "@/components/LoadingCom";

export default {
  name: "Services",
  components: {LoadingCom},
  data: () => ({
    LoadingCom: true,
    serviceArr: []
  }),
  mounted() {
    fetch(`${server.baseURL}/services/`).then( response => {
      if(response.status !== 200){
        console.log(response.status);
      }else{
        response.json().then(data =>{
          this.serviceArr = data;
          this.LoadingCom = false;
        });
      }
    });
  }
}
</script>

<style scoped>
.services {
  margin-top: 52%;
  text-align: left;
}
</style>

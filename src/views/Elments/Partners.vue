<template>
  <section class='partners container  main__services' id="Partners">
    <h1 class='partners__title'>Partners</h1>
      <LoadingCom  v-if="LoadingCom === true"/>
      <b-img
        v-else
        v-for="(item, id) in partnersArr" v-bind:key="id"
        class="ml partners__item col-12 col-sm-4 col-lg-4"
        :src="item.photo_url"
      />
  </section>
</template>

<script>
import axios from "axios";
import {server} from "@/Helper";
import LoadingCom from "@/components/LoadingCom";

export default {
  name: "Partners",
  components: {LoadingCom},
  data: () => ({
    LoadingCom : true,
    partnersArr: []
  }),
  mounted() {
    axios
        .get(`${server.baseURL}/partners`)
        .then(res => {
          this.partnersArr = res.data;
          this.LoadingCom = false
        })
  }
}
</script>

<style scoped>
  .partners{
    margin-top: 2%;
    text-align: left;
  }
</style>

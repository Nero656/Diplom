<template>
  <section class='container p-0 main__services' id="Projects">
    <h1 class='projects projects__title'>Projects</h1>
    <LoadingCom v-if="LoadingCom === true"/>
    <div class="projects__list container-fluid" v-else>
      <Product
          class="mt-1"
          v-for="(item,id) in projectsArr" v-bind:key="id"
          :title="item.title"
          :photo_url="item.photo_url"
          :color="item.color"
          :width="item.width"
          :tags="item.tags.split(',')"
          :desc="item.desc"
      />
    </div>
  </section>
</template>
<script>
import {server} from "@/Helper";
import Product from "@/components/Product";
import LoadingCom from "@/components/LoadingCom";

export default {
  name: "Projects",
  components: {LoadingCom, Product},
  data: () => ({
    LoadingCom: true,
    projectsArr: []
  }),
  comments: {},
  mounted() {
    fetch(`${server.baseURL}/projects/`).then(response => {
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        response.json().then(data => {
          this.projectsArr = data;
          this.LoadingCom = false;
        });
      }
    });
  }
}
</script>

<style scoped>
.projects {
  margin-top: 2%;
  text-align: left;
}
</style>

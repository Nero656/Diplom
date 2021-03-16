<template>
  <div :class="'pr text-white pt-md-3 overflow-hidden col-lg-'+width"
       :style="'background-color:'+color">
    <div>
      <h2 class="display-5">{{title}}</h2>
    </div>

    <span class="projects__hover pt-md-3">
       <h2 class="display-5">{{title}}</h2>
        <p class="lead">{{desc}}</p>
    </span>

    <div class="tags">
      <span class=" p-md-1" v-for="(item, id) in tags" v-bind:key="id"> {{ item }} </span>
    </div>
    <b-img :src="photo_url" class="mt-5" height="210" right :alt="title"/>
  </div>
</template>


<script>
export default {
  name: "Product",
  props:{
    title:{
      type: String,
      default: null
    },
    photo_url:{
      type: String,
      default: null
    },
    tags:{
      type: Array,
      default: null
    },
    width:{
      type: Number,
      default: null
    },
    desc:{
      type: String,
      default: null
    },
    color:{
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
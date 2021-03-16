<template>
  <section class='info main__info team'>
    <div class='container p-0'>
      <div class='col-10'>
        <h1 class='info__header'>
          Software Development & Dedicated Teams
        </h1>

        <ul class='info__motto d-flex'>
          <li class='info__motto-item'>Big Enough to Scale</li>
          <li class='info__motto-item'>|</li>
          <li class='info__motto-item'>Small Enough to Care</li>
        </ul>

        <ul class='info__stats d-flex'>
          <li class='info__stats-item'>
            <p class='info__stats-number'>8+</p>
            <span class='info__stats-text'>Years in development</span>
          </li>
          <li class='info__stats-item'>
            <p class='info__stats-number'>70+</p>
            <span class='info__stats-text'>Skilled Devs</span>
          </li>
          <li class='info__stats-item'>
            <p class='info__stats-number'>150+</p>
            <span class='info__stats-text'>Loyal Clients</span>
          </li>
        </ul>

        <button class='button info__button' v-b-modal.modal-center-body>
          Contact us
        </button>
      </div>

    </div>

    <button class='info__arrow mt-5'>
      <img class='info__arrow-image' src='img/ArrowDown.svg' alt='arrow to swipe down' @click="Scroll">
    </button>
    <ContactUs idModal="modal-center-body"/>
  </section>

</template>

<script>
import ContactUs from "@/components/ContactUs";
export default {
  name: "team",
  components: {ContactUs},
  methods:{
    Scroll(){
      window.scroll(0, 980);
    }
  }
}
</script>

<style scoped>
  .team{
    text-align: left;
  }

</style>

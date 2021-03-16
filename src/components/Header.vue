<template>
  <b-navbar toggleable="lg" type="light" class="container">

      <router-link  to="/" class="logo align-items-center row row-cols-2 col-11 col-md-5 col-lg-4">
          <img class='logo__image col-4 col-md-5 col-lg-3' src="img/Subtract.svg" alt="iLink logo">
          <div class='logo__text' style="text-align: left">
            iLink <br/>
            Digital agency
          </div>
      </router-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#Services" class="nav-menu__item col-2">Services</b-nav-item>
        <b-nav-item href="#Stack" class="nav-menu__item col-2">Stack</b-nav-item>
        <b-nav-item href="#Projects" class="nav-menu__item col-2">Projects</b-nav-item>
        <b-nav-item href="#Partners" class="nav-menu__item col-2">Partners</b-nav-item>
       </b-navbar-nav>

      <!-- Right aligned nav items -->

      <div class='col-md-4 float-right'>
          <button class='button header__button'  v-b-modal.modal-center-header>
            Contact us
          </button>
      </div>
    </b-collapse>
    <ContactUs idModal="modal-center-header"/>
  </b-navbar>
</template>

<script>
import ContactUs from "@/components/ContactUs";
export default {
name: "Header",
  components: {ContactUs}
}
</script>

<style scoped>

</style>

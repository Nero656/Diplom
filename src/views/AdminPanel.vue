<template>
  <div>
    <div class="about container text-left">
      <router-link to="/">back</router-link>
      <form class="form-signin mt-5">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
            type="text"
            id="inputEmail"
            class="form-control mb-2"
            placeholder="login"
            v-model="login"
            required=""
            autofocus=""
        >
        <label for="inputPassword" class="sr-only">Password</label>
        <input
            type="password"
            id="inputPassword"
            class="form-control mb-2"
            placeholder="Password"
            v-model="password"
            required=""
        >
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="click">Sign in</button>
        <p class="mt-5 mb-3 text-muted">© 2017-2021</p>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "admin-panel",
  data: () => ({
    user: {
      login: '',
      password: ''
    }
  }),
  methods: {
    click() {
      if (this.login === 'admin' && this.password === 'admin') {
        this.$store.dispatch('User/Auth');
      } else {
        this.makeToast()
      }
    },
    makeToast() {
      this.$bvToast.toast('Error, check if the data is correct ', {
        title: `Error`,
        variant: 'danger',
        solid: true
      })
    }
  }
}
</script>

<style scoped>

</style>

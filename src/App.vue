<template>
  <div id="app">
    <div id="cont">
      <router-view/>
    </div>
  </div>
</template>

<style>

#cont{
  margin-top: 2%;
  text-align: center;
}

#nav-collapse a{
  color: #000000;
}

#nav-collapse a:hover {
  color: #5057FF;
}

#nav-collapse a.router-link-exact-active {
  color: #454cd9;
}
</style>
<script>
</script>
<template>
  <div class="home">
      <Team/>
      <Services/>
      <Projects/>
      <Stack/>
      <Partners/>
  </div>
</template>

<script>
import Team from "@/views/Elments/Team";
import Services from "@/views/Elments/Services";
import Projects from "@/views/Elments/Projects";
import Stack from "@/views/Elments/Stack";
import Partners from "@/views/Elments/Partners";
export default {
  name: 'Home',
  components: {Partners, Stack, Projects, Services, Team},
}
</script>

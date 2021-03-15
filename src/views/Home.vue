<template>
  <div class="home">
    <Header/>
    <Team/>
    <Services/>
    <Projects/>
    <Stack/>
    <Partners/>
    <Footer/>
  </div>
</template>

<script>
import Team from "@/views/Elments/Team";
import Services from "@/views/Elments/Services";
import Projects from "@/views/Elments/Projects";
import Stack from "@/views/Elments/Stack";
import Partners from "@/views/Elments/Partners";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default {
  name: 'Home',
  components: {Header, Footer, Partners, Stack, Projects, Services, Team},
}
</script>

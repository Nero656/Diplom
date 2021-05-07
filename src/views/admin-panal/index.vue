<template>
  <div>
    <b-button
        class="left fixed-top ml-2 mt-4"
        squared
        size="md"
        variant="outline-primary"
        v-b-toggle.sidebar-backdrop
    >
      <b-icon icon="list"></b-icon>
    </b-button>


    <b-sidebar
        id="sidebar-backdrop"
        title="Menu"
        backdrop-variant="dark"
        backdrop
    >
      <template #footer="{ hide }">
        <div class="d-flex align-items-center px-3 py-2">
          <b-button variant="danger" @click="logout()">Return to site</b-button>
        </div>
      </template>
      <b-list-group style="text-align: left; border-radius:0">
        <div v-for="(item, id) in items" v-bind:key="id">
          <b-list-group-item button v-if="item.state === true" active>
            <b-icon :icon="item.icon"/>
            {{item.name}}
          </b-list-group-item>
          <b-list-group-item class="mt-n1" button v-if="item.state === false" @click="checkedForm(id)">
            <b-icon :icon="item.icon"/>
            {{item.name}}
          </b-list-group-item>
        </div>
      </b-list-group>
    </b-sidebar>

    <service-create-form v-show="items[0].state"/>
    <service-category-form v-show="items[1].state"/>
    <ProjectForm v-show="items[2].state"/>
    <StackForm v-show="items[3].state"/>
    <PartnersForm v-show="items[4].state"/>
  </div>
</template>

<script>
import serviceCreateForm from "@/views/admin-panal/serviceCreateForm";
import ServiceCategoryForm from "@/views/admin-panal/serviceCategoryForm";
import Projects from "@/views/Elments/Projects";
import ProjectForm from "@/views/admin-panal/ProjectForm";
import Stack from "@/views/Elments/Stack";
import StackForm from "@/views/admin-panal/StackForm";
import PartnersForm from "@/views/admin-panal/PartnersForm";
import router from "@/router";
export default {
name: "index",
  components: {PartnersForm, StackForm, Stack, ProjectForm, Projects, ServiceCategoryForm, serviceCreateForm},
  data: () => ({
    items: [
      { id: 1, icon: 'lightning', name: 'Service', state: true },
      { id: 2, icon: 'lightning-fill', name: 'Service category', state: false },
      { id: 3, icon: 'laptop', name: 'Project', state: false },
      { id: 4, icon: 'hdd-stack', name: 'Stack', state: false },
      { id: 5, icon: 'person-lines-fill', name: 'Partners', state: false },
    ]
  }),
  mounted() {
    if (this.$store.state.User.auth === false){
      alert('Authorization error');
      return router.push('/admin');
    }
  },
  methods: {
    checkedForm(id)
    {
      for (let i = 0; i < this.items.length; i++){
        if (this.items[i].state === true){
          this.items[i].state = false;
        }
      }
      this.items[id].state = !this.items[id].state
    },
    logout(){
      this.$store.dispatch('User/Logout');
    }
  }
}
</script>

<style scoped>

</style>

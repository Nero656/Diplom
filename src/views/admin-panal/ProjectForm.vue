<template>
  <div>
    <b-nav tabs align="center">
      <li class="nav-item" v-for="(item, id) in navBut" v-bind:key="id" style="cursor: pointer">
        <span v-if="item.state === true" class="nav-link active">{{ item.name }}</span>
        <span class="nav-link" v-if="item.state !== true" @click="checkedForm(item.id)">{{ item.name }}</span>
      </li>
    </b-nav>

    <!-- create -->
   <create-project v-show="navBut[0].state"/>

    <!--  update  -->
    <UpdateProject v-show="navBut[1].state"/>

    <!--  delete  -->
    <DeleteProject v-show="navBut[2].state"/>

  </div>
</template>

<script>
import Product from "@/components/Product";
import CreateProject from "@/views/admin-panal/ProjectsForms/CreateProject";
import UpdateProject from "@/views/admin-panal/ProjectsForms/UpdateProject";
import DeleteProject from "@/views/admin-panal/ProjectsForms/DeleteProject";

export default {
  name: "ProjectForm",
  components: {DeleteProject, UpdateProject, CreateProject, Product},
  data: () => ({
    navBut: [
      {id: 0, name: 'create', state: true},
      {id: 1, name: 'update', state: false},
      {id: 2, name: 'delete', state: false},
    ]
  }),
  methods: {
    checkedForm(id) {
      for (let i = 0; i < this.navBut.length; i++) {
        if (this.navBut[i].state === true) {
          this.navBut[i].state = false;
        }
      }
      this.navBut[id].state = !this.navBut[id].state
    },
  }
}
</script>

<style scoped>

</style>



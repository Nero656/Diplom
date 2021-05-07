<template>
  <div>
    <b-nav tabs align="center">
      <li class="nav-item" v-for="(item, id) in navBut" v-bind:key="id" style="cursor: pointer">
        <span v-if="item.state === true" class="nav-link active">{{ item.name }}</span>
        <span class="nav-link" v-if="item.state !== true" @click="checkedForm(item.id)">{{ item.name }}</span>
      </li>
    </b-nav>

    <!--  create  -->
   <CreateStack v-show="navBut[0].state"/>


    <!--  update  -->
    <UpdateStack  v-show="navBut[1].state"/>

    <!--  del  -->
    <DeleteStack v-show="navBut[2].state"/>

  </div>
</template>


<script>
import axios from "axios";
import {server} from "@/Helper";
import CreateStack from "@/views/admin-panal/StackForms/CreateStack";
import UpdateStack from "@/views/admin-panal/StackForms/UpdateStack";
import DeleteStack from "@/views/admin-panal/StackForms/DeleteStack";

export default {
  name: "StackForm",
  components: {DeleteStack, UpdateStack, CreateStack},
  data:()=>({
    preview: {},
    stack: '',
    img: '',
    selected: 0,
    selectStack: [],
    load: false,
    navBut: [
      {id: 0, name: 'create', state: true},
      {id: 1, name: 'update', state: false},
      {id: 2, name: 'delete', state: false},
    ]
  }),
  mounted() {
    axios.
    get(`${server.baseURL}/stack`)
        .then(res => {this.selectStack = res.data})
  },
  methods:{
    checkedForm(id) {
      for (let i = 0; i < this.navBut.length; i++) {
        if (this.navBut[i].state === true) {
          this.navBut[i].state = false;
        }
      }
      this.navBut[id].state = !this.navBut[id].state
    }
  }
}
</script>

<style scoped>

</style>

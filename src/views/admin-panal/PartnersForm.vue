<template>
  <div>
    <b-nav tabs align="center">
      <li class="nav-item" v-for="(item, id) in navBut" v-bind:key="id" style="cursor: pointer">
        <span v-if="item.state === true" class="nav-link active">{{ item.name }}</span>
        <span class="nav-link" v-if="item.state !== true" @click="checkedForm(item.id)">{{ item.name }}</span>
      </li>
    </b-nav>

    <!--  create  -->
    <CreatePartners v-show="navBut[0].state"/>


    <!--  update  -->
    <UpdatePartners v-show="navBut[1].state"/>

    <!--  del  -->
    <DeletePartners v-show="navBut[2].state"/>

  </div>
</template>

<script>

import CreatePartners from "@/views/admin-panal/PartnersForms/CreatePatners";
import UpdatePartners from "@/views/admin-panal/PartnersForms/UpdatePartners";
import DeletePartners from "@/views/admin-panal/PartnersForms/DeletePartners";

export default {
  name: "PartnersForm",
  components: {DeletePartners, UpdatePartners, CreatePartners},
  data:()=>({
    navBut: [
      {id: 0, name: 'create', state: true},
      {id: 1, name: 'update', state: false},
      {id: 2, name: 'delete', state: false},
    ]
  }),

  methods:{
    checkedForm(id)
    {
      for (let i = 0; i < this.navBut.length; i++){
        if (this.navBut[i].state === true){
          this.navBut[i].state = false;
        }
      }
      this.navBut[id].state = !this.navBut[id].state;
      this.selectPartner = ''
    },
  }
}
</script>

<style scoped>

</style>

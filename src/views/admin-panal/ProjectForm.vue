<template>
  <div>
    <b-nav tabs align="center">
      <li class="nav-item" v-for="(item, id) in navBut" v-bind:key="id" style="cursor: pointer">
        <span v-if="item.state === true" class="nav-link active">{{ item.name }}</span>
        <span class="nav-link" v-if="item.state !== true" @click="checkedForm(item.id)">{{ item.name }}</span>
      </li>
    </b-nav>

    <!-- create -->
    <form class="container text-left mt-5" v-show="navBut[0].state" >
      <div class="form-group">
        <label>New project</label>
        <b-input type="text" v-model="newProject" placeholder="Title"/>
      </div>

      <div class="form-group">
        <label>Image</label>
        <b-form-file disabled
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            v-model = 'file'
        ></b-form-file>
      </div>

      <div class="form-group">
        <label>Image URL</label>
        <b-input type="text" v-model="photo_url" placeholder="URL"/>
      </div>

      <!--            @change="fileUpload"-->
      <div class="form-group">
        <label for="tags-separators">Tags</label>
        <b-form-tags
            input-id="tags-separators"
            v-model="tags"
            tag-pills
            tag-variant="primary"
            separator=" ,;"
            placeholder="Enter new tags separated by space, comma or semicolon"
            no-add-on-enter
        ></b-form-tags>
      </div>

      <div class="form-group">
        <label for="sb-step">Width</label>
        <b-form-spinbutton
            id="sb-step"
            v-model="width"
            min="1"
            max="12"
            step="1"
        ></b-form-spinbutton>
      </div>

      <div class="form-group">
        <label>Color</label>
        <b-input type="color" v-model="color"/>
      </div>

      <div class="form-group">
        <label>Description</label>
        <b-form-textarea
            id="textarea"
            v-model="desc"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
        ></b-form-textarea>
      </div>

      <b-button variant="primary" @click.prevent="createProject">
        Create
        <b-spinner small v-show="load"></b-spinner>
      </b-button>
    </form>

    <!--  update  -->
    <form class="container text-left mt-5" v-show="navBut[1].state">
      <div class="form-group">
        <label>Edit service</label>
        <b-form-select v-model="selected">
          <b-form-select-option
              v-for="(item, id) in selectService"
              v-bind:key="id"
              :value="item.id"
          >
            {{item.title}}
          </b-form-select-option>
        </b-form-select>
      </div>

      <div class="form-group">
        <label>New project</label>
        <b-input type="text" v-model="newProject" placeholder="Title"/>
      </div>

      <div class="form-group">
        <label>Image</label>
        <b-form-file disabled
                     placeholder="Choose a file or drop it here..."
                     drop-placeholder="Drop file here..."
                     v-model = 'file'
        ></b-form-file>
      </div>

      <div class="form-group">
        <label>Image URL</label>
        <b-input type="text" v-model="photo_url" placeholder="URL"/>
      </div>

      <!--            @change="fileUpload"-->
      <div class="form-group">
        <label for="tags-separators">Tags</label>
        <b-form-tags
            input-id="tags-separators"
            v-model="tags"
            tag-pills
            tag-variant="primary"
            separator=" ,;"
            placeholder="Enter new tags separated by space, comma or semicolon"
            no-add-on-enter
        ></b-form-tags>
      </div>

      <div class="form-group">
        <label for="sb-step">Width</label>
        <b-form-spinbutton
            id="sb-step"
            v-model="width"
            min="1"
            max="12"
            step="1"
        ></b-form-spinbutton>
      </div>

      <div class="form-group">
        <label>Color</label>
        <b-input type="color" v-model="color"/>
      </div>

      <div class="form-group">
        <label>Description</label>
        <b-form-textarea
            id="textarea"
            v-model="desc"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
        ></b-form-textarea>
      </div>

      <b-button variant="primary" @click.prevent="updateProject">
        update
        <b-spinner small v-show="load"></b-spinner>
      </b-button>
    </form>

    <!--  delete  -->
    <form class="container text-left mt-5"  v-show="navBut[2].state">
      <div class="form-group">
        <label>Delete service project</label>
        <b-form-select v-model="selected">
          <b-form-select-option
              v-for="(item, id) in selectService"
              v-bind:key="id"
              :value="item.id"
          >
            {{item.title}}
          </b-form-select-option>
        </b-form-select>
      </div>
      <b-button variant="danger" @click.prevent="deleteProject">
        Delete
        <b-spinner small v-show="load"></b-spinner>
      </b-button>
    </form>

  </div>
</template>

<script>
import axios from "axios";
import {server} from "@/Helper";
export default {
  name: "ProjectForm",
  data:()=>({
    newProject: '',
    photo_url: '',
    color: '',
    width: 1,
    desc: '',
    selected: 0,
    selectService: [],
    load: false,
    tags: [],
    tagsSTR: '',
    navBut: [
      {id: 0, name: 'create', state: true},
      {id: 1, name: 'update', state: false},
      {id: 2, name: 'delete', state: false},
    ]
  }),
  mounted() {
    axios.
    get(`${server.baseURL}/projects`)
        .then(res => {this.selectService = res.data})
  },
  methods:{
    checkedForm(id)
    {
      for (let i = 0; i < this.navBut.length; i++){
        if (this.navBut[i].state === true){
          this.navBut[i].state = false;
        }
      }
      this.navBut[id].state = !this.navBut[id].state
    },

    // fileUpload(event) {
    //   this.photo_url = event.target.files[0];
    //   this.picture_create = URL.createObjectURL(this.photo_url);
    // },

    createProject(){
      this.load = true;

      for (let i = 0; i < this.tags.length; i++){
        this.tagsSTR += this.tags[i];
        if (i < this.tags.length-1){
          this.tagsSTR += ',';
        }
      }

      // let fr = new FormData();
      //
      // fr.append('title', this.newProject);
      // fr.append('photo_url', this.photo_url);
      // fr.append('tags', this.tagsSTR);
      // fr.append('width', this.width);
      // fr.append('desc', this.desc);
      // fr.append('color', this.color);

        axios
        .post(`${server.baseURL}/projects`, {
          title: this.newProject,
          photo_url: this.photo_url,
          tags: this.tagsSTR,
          width: this.width,
          desc: this.desc,
          color: this.color
        })
      .then(res => {
        this.toast(
            'b-toaster-top-center',
            'success',
            'You create new project'
        );
        this.load = false;
      })
      .catch(error => {
          this.load = false;
          this.toast(
              'b-toaster-top-center',
              'danger',
              error.response.data.message
          );
      })
    },

    updateProject(){
      this.load = true;

      for (let i = 0; i < this.tags.length; i++){
        this.tagsSTR += this.tags[i];
        if (i < this.tags.length-1){
          this.tagsSTR += ',';
        }
      }

      // let fr = new FormData();
      //
      // fr.append('title', this.newProject);
      // fr.append('photo_url', this.photo_url);
      // fr.append('tags', this.tagsSTR);
      // fr.append('width', this.width);
      // fr.append('desc', this.desc);
      // fr.append('color', this.color);

      axios
          .put(`${server.baseURL}/projects/`+this.selected, {
            title: this.newProject,
            photo_url: this.photo_url,
            tags: this.tagsSTR,
            width: this.width,
            desc: this.desc,
            color: this.color
          })
          .then(res => {
            this.toast(
                'b-toaster-top-center',
                'success',
                'You create new project'
            );
            this.load = false;
          })
          .catch(error => {
            this.load = false;
            this.toast(
                'b-toaster-top-center',
                'danger',
                error.response.data.message
            );
          })
    },

    deleteProject(){
      this.load = true;
      axios
          .delete(`${server.baseURL}/projects/`+this.selected)
          .then(
              res => {
                this.load = false;
                this.toast(
                    'b-toaster-top-center',
                    'success',
                    'You delete new project'
                );
              }
          )
          .catch(error => {
                this.load = false;
                this.toast(
                    'b-toaster-top-center',
                    'danger',
                    'You not delete project'
                );
              }
          )
      this.newCategory = '';
    },



    toast(toaster, variant, message) {
      this.counter++
      this.$bvToast.toast(message, {
        title: `Success`,
        toaster: toaster,
        variant: variant,
        solid: true,
      })
    }
  }
}
</script>

<style scoped>

</style>



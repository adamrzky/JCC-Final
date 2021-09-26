<template>
  <!-- templates blogs -->
  <v-container class="mt-8">
    <div class="mb-2 pointer d-inline-block" @click="$router.back()">
          <v-icon color="secondary">mdi-chevron-left</v-icon> 
          <span class="secondary--text text-decoration-underline">Back</span>
    </div>
    <div v-if="blog.id">
      <v-img
        :src="
          blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'
        "
        
        height="450"
      >
      </v-img>

      <div class="py-3">
        <h2 class="text-center display-2 font-weight-medium py-3 text-capitalize">{{ blog.title }}</h2>

        <h3 class="py-4">Description</h3>
        <p>
          {{ blog.description }}
        </p>
      </div>
      <div class="d-flex flex-row">
        <div>
          <v-btn :disabled="guest" @click="updateForm()" rounded color="secondary">
            <v-icon size="18" class="pr-2">mdi-pencil-box-outline</v-icon>  
            Update
          </v-btn>
        </div>
        <div class="px-5">
          <v-btn :disabled="guest" @click="uploadPhoto()" rounded color="secondary">
            <v-icon size="18" class="pr-2">mdi-tray-arrow-up</v-icon>  
            Upload File
          </v-btn>
        </div>
        <div>
          <v-btn :disabled="guest" @click="removeBlog()" rounded color="accent">
            <v-icon size="18" class="pr-2">mdi-trash-can-outline</v-icon>  
            Delete
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    blog: {},
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    endFormWatcher: null
  }),
  computed: {
    ...mapGetters({
      guest: "auth/guest",
      endForm: "dialog/endForm",
    }),
  },
  methods: {
    go() {
      let { id } = this.$route.params;
      const config = {
        method: "get",
        url: `${this.apiDomain}/api/v2/blog/${id}`,
      };
      this.axios(config)
        .then((response) => {
          let { blog } = response.data;
          this.blog = blog;
          this.setTitleBlog(this.blog.title);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    ...mapActions({
      setDialogComponent: "dialog/setComponent",
      setEndForm: "dialog/setEndForm",
      setTitleBlog: "blog/setTitle",
    }),

    updateForm() {
      this.setDialogComponent({
        component: "Form",
        params:{
          titleDialog: "Edit Blog",
          descriptionDialog:"edit the blog you wrote here",
          typeForm: "update",
          blog : this.blog
        }
      });
    },
    uploadPhoto() {
      this.setDialogComponent({
        component: "Form",
        params:{
          titleDialog: "Upload Photo",
          descriptionDialog:"Share any experience with us so that readers get positive insights",
          typeForm: "upload",
          blog : this.blog
        }
      });
    },

    removeBlog(){
      this.setDialogComponent({
        component : 'Delete',
        params : {
          blog : this.blog,
        }
      })
    }
  },
  created() {
    this.go();
    this.endFormWatcher = this.$watch('endForm', (value) => {
      if(value){
        this.go();
        this.setEndForm(false)
      }
    });
  },
  beforeDestroy(){
    this.endFormWatcher()
  }
};
</script>

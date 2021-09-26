<template>
  <!-- templates blogs -->
  <v-container grid-list-sm class="mt-5">
    <div class="row mb-7 mb-sm-0">
      <div class="col-12 col-sm-6 text-sm-left text-center">
        <v-subheader class="pa-4 pb-2 white--text title d-inline-block">
          All Blogs
        </v-subheader>
      </div>
      <div class="col-12 col-sm-6 text-sm-right text-center pr-6 align-self-end">
        <v-btn 
          color="secondary" 
          rounded 
          @click="openForm()"
          :disabled="guest"
        >
         Tambah Artikel
        </v-btn>
      </div>
      
    </div>

    <v-divider class="mx-4"></v-divider>
    <v-layout wrap>
      <blog-item-component
        v-for="blog in blogs"
        :key="`blog-${blog.id}`"
        :blog="blog"
        md="6"
        titleLength="49"
        descriptionLength="120"
      >
      </blog-item-component>
    </v-layout>
    <v-pagination
      v-model="page"
      @input="go"
      :length="lengthPage"
      :total-visible="perPage"
      color="secondary"
      circle
      class="elevation-0"
    >
    </v-pagination>
  </v-container>
</template>

<script>
import BlogItemComponent from "../components/BlogItemComponent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    blogs: [],
    page: 0,
    lengthPage: 0,
    perPage: 0,
  }),
  components: {
    "blog-item-component": BlogItemComponent,
  },
  computed: {
    ...mapGetters({
      guest: "auth/guest",
    }),
  },
  methods: {
    go() {
      const config = {
        method: "get",
        url: `${this.apiDomain}/api/v2/blog?`,
        params: { page: this.page },
      };
      this.axios(config)
        .then((response) => {
          let { blogs } = response.data;
          this.blogs = blogs.data;
          this.page = blogs.current_page;
          this.lengthPage = blogs.last_page;
          this.perPage = blogs.perPage;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    
    openForm() {
      this.setDialogComponent({
        component: "Form",
        params:{
          titleDialog: "Add Blog",
          descriptionDialog:"Share any experience with us so that readers get positive insights",
          typeForm: "tambah"
        }
      });
    },
    
    ...mapActions({
      setDialogComponent: "dialog/setComponent",
    }),
  },
  created() {
    this.go();
  },
};
</script>

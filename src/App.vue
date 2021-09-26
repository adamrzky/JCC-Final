<style>
  @import './assets/css/styles.css';
</style>

<template>
  <v-app>
    <alert />
    <Dialog />

    <!-- Start Navigation Drawer -->
    <v-navigation-drawer 
      app 
      right 
      temporary 
      v-model="drawer" 
      :permanent="$vuetify.breakpoint.mdAndUp ? (drawer = false) : false"
    >
      <v-list>
        <v-list-item v-if="!guest">
          <v-list-item-avatar 
              class="outlined--secondary" 
            >
            <img
              v-if="user.photo_profile"
              :alt="user.name"
              :src="`${apiDomain}${user.photo_profile}`"
            >
            <v-icon 
              v-else
              color="secondary" 
              size="20px"
            >
              mdi-account-outline
            </v-icon>
            
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ (user.name.length > 22 ) ? `${user.name.substring(0, 22)}...` : user.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div 
          class="pa-2" 
          v-if="guest"
        >
          <v-btn 
            block 
            color="secondary" 
            class="mb-1" 
            @click="goPage('/login')"
          >
            <v-icon left>mdi-lock</v-icon>
            Login
          </v-btn>
          <v-btn block color="accent">
            <v-icon left>mdi-account</v-icon>
            Register
          </v-btn>
        </div>

        <v-divider></v-divider>

        <v-list-item
          v-for="(item, index) in menus"
          :key="`menu-${index}`"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template 
        v-slot:append 
        v-if="!guest"
      >
        <div class="pa-2">
          <v-btn 
            block 
            color="accent" 
            dark 
            @click="logout"
          >
            <v-icon>mdi-lock</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <!-- End Navigation Drawer -->

    <!-- Start App Bar -->
    <v-app-bar 
      app 
      absolute 
      elevation="0" 
      color="transparent" 
      class="pt-3" 
      v-if="appBar"
    >
        <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/blogs">Blog</router-link> |
    <span v-if="isLoggedIn">
      <a @click="logout">Logout</a>
    </span>
    <span v-else>
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link> |
      <a @click="logout"> Logout </a>
  

    </span>
  </div>
    </v-app-bar>
    <!-- End App Bar -->

    <!-- Start Main Content -->
    <v-main 
      :class="(route == '/login' || route == '/register') ? 'pa-0' : 'mb-10'"
    >
      <v-container 
        fluid 
        :class="(route == '/login' || route == '/register') ? 'fill-height pa-0' : 'fill-height'"
      >
        <v-slide-y-transition hide-on-leave>
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>
    <!-- End Main Content -->

    <!-- Start Footer -->
    <v-footer 
      app 
      absolute 
      color="transparent" 
      v-if="footerStatus" 
      class="subtitle-2 d-block text-center font-weight-light"
    >
      Created © 2021 Team Adam Irsan Taufik
      <br>
      All rights reserved
    </v-footer>
    <!-- End Footer -->

  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Alert: () => import("./components/Alert.vue"),
    Dialog: () => import("./components/Dialog.vue"),
  },

  data: () => ({
    drawer: false,
    appBar:true,
    footerStatus:true,
    menus: [
      { title: "Home", icon:"mdi-home", route: "/" },
      { title: "Blogs", icon:"mdi-note", route: "/blogs" },
      { title: "About Us", icon:"mdi-account-group", route: "/about" },
    ],
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    route: ''
  }),

  computed: {
    ...mapGetters({
      guest: "auth/guest",
      user: "auth/user",
      token: "auth/token",
      titleBlog: "blog/title",
    }),
  },

  methods: {
    logout() {
      let config = {
        method: "post",
        url: `${this.apiDomain}/api/v2/auth/logout`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };

      this.axios(config)
        .then(() => {
          this.setToken("");
          this.setUser({});

          this.setAlert({
            status: true,
            color: "success",
            text: "Anda berhasil logout",
          });
        })
        .catch((responses) => {
          this.setAlert({
            status: true,
            color: "error",
            text: responses.data.error,
          });
        });
    },

    ...mapActions({
      setAlert: "alert/set",
      setToken: "auth/setToken",
      setUser: "auth/setUser",
      checkToken: "auth/checkToken",
    }),

    goPage(url){
      this.$router.push(url)
    },
    cekRoute(){
      this.route = this.$route;
      if(this.route.path == "/login" || this.route.path == "/register"){
        this.$vuetify.theme.dark = false;
        this.appBar = false
        this.footerStatus = false
      }else{
        this.$vuetify.theme.dark = true;
        this.appBar = true
        this.footerStatus = true
      }
    }
  },
  mounted() {
    this.cekRoute()
    if (this.token) {
      this.checkToken(this.token);
    }
  },
  updated(){
    this.cekRoute()
  },
  watch:{
    $route(to){
      if(this.$route.name != "Blog"){
        document.title = this.$route.name
      }

      if (to.matched.some(record => record.meta.guestArea)) {
        if(!this.guest){
          this.$router.push('/')
        }
      }
    },
    titleBlog(value) {
        document.title = value;
    }
  }
};
</script>

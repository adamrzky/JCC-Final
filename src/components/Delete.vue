<template>
  <v-card 
    light 
    class="px-16 py-8 rounded-xl "
    
  >

    <v-card-text class="text-center mb-8" >
      <span class="text-h4 ">Delete Blog </span> <br>
      <span class="text-body-1 ">Are you sure for delete this blog ?</span>
    </v-card-text>

    <div class="text-center d-flex justify-space-between px-10" >
        <v-btn 
        color="secondary"
        rounded
        outlined
        @click="close()"
        class="px-10 py-6 "
      >
        no
      </v-btn>

      <v-btn
        color="secondary"
        rounded
        @click="remove()"
        class="px-10 py-6 "
        :loading="loadingButton"
      >
        yes
      </v-btn>
    </div>
      
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    loadingButton: false
  }),
  computed: {
    ...mapGetters({
      token: "auth/token",
      params: "dialog/params",
    }),
  },
  methods:{
    ...mapActions({
      checkToken: "auth/checkToken",
      setAlert: "alert/set",
    }),

    close() {
      this.$emit("closed", false);
    },

    remove(){
      const id = this.params.blog.id
      this.loadingButton = true

      const config = {
          method: "post", 
          url: `${this.apiDomain}/api/v2/blog/${id}`,
          params: { _method: 'DELETE' },    
          headers: {
            'Authorization' : `Bearer ${this.token}`
          },    
      };

      this.axios(config)
          .then(() => {
              this.loadingButton = true
              this.close()
              this.setAlert({
                status: true,
                color: "success",
                text: "Blog berhasil dihapus",
              });

               this.goPage('/blogs')
          })
          .catch((error)=> {
              this.loadingButton = true
              console.log(error)

              this.setAlert({
                status: true,
                color: "error",
                text: "Data gagal dihapus",
              });
          })

    },
    goPage(url){
      this.$router.push(url)
    },
  },
  mounted() {
    if (this.token) {
      this.checkToken(this.token);
    }
    if (this.params.typeForm == "update") {
      this.editBlog()
    }
  },
}
</script>
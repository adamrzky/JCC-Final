<template>
    <v-card>
        <v-toolbar dark color="success">
            <v-toolbar-title>
                Login
            </v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <v-form ref="form">
                <v-text-field v-model="email" label="E-mail" required append-icon="mdi-email"></v-text-field>
                <v-text-field v-model="password" label="Password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" counter @click:append="showPassword = !showPassword"></v-text-field>
                <div class="text-xs-center">
                    <v-btn
                    :disabled="!valid"  
                    rounded
                    block
                    @click="login"
                  >
                    Login
                  </v-btn>
                </div> <br>
                 <div>
                  Belum Punya Akun
                  <router-link to="/register">
                      Daftar Disini
                  </router-link>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: () => ({
      background : 'accent',
      loadingButton: false,
      newRegistered: false,
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
      ],
      passwordShow: false,
      password: '',
      match:false,
      passwordRules: [(v) => !!v || 'Password is required.'],
      apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  computed: {
      ...mapGetters({
        guest : 'auth/guest'
      })
  },
  methods: {
      ...mapActions({
          setAlert: "alert/set",
          setToken: "auth/setToken",
      }),

      redirect() {
        this.$router.push("/")
      },

      login () {
        const validation = this.$refs.form.validate()

        if(validation){
          this.loadingButton = true

          const config = {
              method: "post", 
              url: `${this.apiDomain}/api/v2/auth/login`,
              data: {
                email: this.email,
                password: this.password,
              },
          };

          this.axios(config)
              .then((response) => {
                  this.loadingButton = false

                  this.setToken(response.data.access_token);

                  this.setAlert({
                    status: true,
                    color: "success",
                    text: "Login Berhasil",
                  });

                  this.redirect();
              })
              .catch((error) => {
                  this.loadingButton = false

                  console.log(error);

                  this.setAlert({
                    status: true,
                    color: "error",
                    text: "Login Gagal",
                  });
              });
        }
      },
    },
    mounted(){
      if(this.$route.params.newRegistered > 0){
        this.newRegistered = this.$route.params.newRegistered
      }
    },
  }
</script>
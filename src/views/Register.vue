<template>
    <v-card>
        <v-toolbar dark color="success">
            <v-toolbar-title>
                Register
            </v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <v-form ref="form">
                <v-text-field
                    v-model="fullName"
                    :rules="[rules.required]"
                    label="Full Name"
                    required
                    color="secondary"
                  ></v-text-field>
                   <v-text-field
                    v-model="email"
                    :rules="[emailRules,rules.required]"
                    label="E-mail Address"
                    required
                    color="secondary"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="passwordShow ? 'text' : 'password'"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    color="secondary"
                    @click:append="passwordShow = !passwordShow"
                  ></v-text-field>
                  <v-file-input
                      v-model="photo_profile"
                      show-size
                      counter
                      multiple
                      label="Photo Profile"
                      color="secondary"
                    :rules="[rules.required]"
                    ></v-file-input> 
                


                <div class="text-xs-center">
                    <v-btn
                    :disabled="!valid"  
                    rounded
                    block
                    @click="register"
                  >
                    Login
                  </v-btn>
                </div> <br>
                 <div>
                  Sudah Punya Akun >
                  <router-link to="/login">
                      Login Disini
                  </router-link>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    loadingButton: false,
    valid: true,
    photo_profile: null,
    fullName: "",
    fullNameRules: [(v) => !!v || 'Full Name is required.'],
    email: "",
    emailRules: [
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid.",
      (v) => !!v || 'E-mail is required',
    ],
    passwordShow: false,
    password: "",
    passwordRules: [(v)=> !!v || 'Password is required.'],
    match: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  computed: {
    ...mapGetters({
      guest: "auth/guest",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setToken: "auth/setToken",
    }),

    redirect() {
      this.$router.push({
        name: "Login",
        params: {
          newRegistered: true,
        },
      });
    },

    register() {
      const validation = this.$refs.form.validate();

      if (validation) {
        this.loadingButton = true;

        let formData = new FormData();
        formData.append("name", this.fullName);
        formData.append("email", this.email);
        formData.append("password", this.password);
        formData.append("photo_profile", this.photo_profile);

        const config = {
          method: "post",
          url: `${this.apiDomain}/api/v2/auth/register`,
          headers: {
            Accept: "application/json",
          },
          data: formData,
        };

        this.axios(config)
          .then(() => {
            this.loadingButton = false;

            this.setAlert({
              status: true,
              color: "success",
              text: "Register Berhasil",
            });

            this.redirect();
          })
          .catch((error) => {
            this.loadingButton = false;

            console.log(error);

            this.setAlert({
              status: true,
              color: "error",
              text: "Register Gagal",
            });
          });
      }
    },
  },
};
</script>

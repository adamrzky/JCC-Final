<template>
  <v-snackbar
    v-model="alert"
    :color="color"
    bottom
    multi-line
    rounded="true"
    timeout="3000"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="close"> X </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "alert",
  computed: {
    ...mapGetters({
      status: "alert/status",
      color: "alert/color",
      text: "alert/text",
    }),
    alert: {
      get() {
        return this.status;
      },
      set(value) {
        this.setAlert({
          status: value,
        });
      },
    },
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    close() {
      this.setAlert({
        status: false,
      });
    },
  },
};
</script>
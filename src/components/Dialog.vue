<template>
  <v-row justify="center" v-if="dialog">
    <keep-alive>
      <v-dialog
        v-model="dialog"
        max-width="450px"
      >
        <component :is="currentComponent" @closed="setDialogStatus"></component>
      </v-dialog>
    </keep-alive>
  </v-row>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Form: () => import("./Form.vue"),
    Delete: () => import("./Delete.vue"),
  },
  computed: {
    ...mapGetters({
      dialogStatus: "dialog/status",
      currentComponent: "dialog/component",
    }),
    dialog: {
      get() {
        return this.dialogStatus;
      },
      set(value) {
        this.setDialogStatus(value);
      },
    },
  },
  methods: {
    ...mapActions({
      setDialogStatus: "dialog/setStatus",
    }),
  },
};
</script>
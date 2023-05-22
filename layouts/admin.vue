<template>
  <v-app dark>
    <v-idle
      @idle="onidle"
      @remind="onremind"
      :loop="true"
      :reminders="[30]"
      :wait="30"
      :duration="1800"
    />
    <app-drawer class="app--drawer" ref="drawer" />
    <app-toolbar class="app--toolbar" @side-icon-click="handleDrawerVisible" />
    <v-main class="div-nuxt-content pb-0">
      <v-container fluid>
        <nuxt />
      </v-container>
      <v-footer :absolute="!fixed" app class="div-nuxt-content">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template>
    </v-main>

    <v-dialog v-model="isIdle" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Session Expired
        </v-card-title>

        <v-card-text>
          Sesi anda akan berakhir dalam {{ second }} detik
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="isIdle = false"> Kembali </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import AppDrawer from "~/components/layout/AppDrawer";
import AppToolbar from "~/components/layout/AppToolbar";
export default {
  components: {
    AppDrawer,
    AppToolbar,
  },
  name: "Admin",
  // middleware: "authenticated",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      isIdle: false,
      time: 10000,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  computed: {
    second() {
      return this.time / 1000;
    },
  },
  mounted() {
    this.$nuxt.$on("drawer-side", (data) => {
      console.log("drawer:", data);
      this.handleDrawerVisible(data);
    });
  },
  methods: {
    handleDrawerVisible(data) {
      this.$refs.drawer.toggleDrawer(data);
    },
    onidle() {
      this.$router.push("/logout");
    },
    onremind(time) {
      this.time = 30000;
      this.isIdle = true;
      let timerId = setInterval(() => {
        console.log("onremind.time", time);
        this.time -= 1000;
        if (!this.isIdle) clearInterval(timerId);
        if (this.time < 1) {
          clearInterval(timerId);
        }
      }, 1000);
    },
  },
};
</script>
<style>
.th-head {
  font-size: 13px !important;
}
.btn-actions {
  height: 28px !important;
  padding: 0px !important;
  min-width: 31px !important;
}
table,
th,
td {
  border: 1px solid #d8dbe0 !important;
  border-collapse: collapse;
}
.swal2-title,
.swal2-content,
.swal2-actions {
  font-family: sans-serif !important;
}

.alert-info {
  color: #1b508f;
  background-color: #d6ebff;
  border-color: #c6e2ff;
  padding: 10px;
  border-radius: 5px 5px;
}
.alert-warning {
  color: #815c15;
  background-color: #feefd0;
  border-color: #fde9bd;
  padding: 10px;
  border-radius: 5px 5px;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  border-radius: 5px 5px;
}
</style>

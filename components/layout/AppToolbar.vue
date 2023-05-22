<template>
  <v-app-bar color="white" app elevation="0">
    <v-app-bar-nav-icon @click="handleDrawerToggle" />
    <v-spacer />
    <div v-if="!isLoggedIn">
      <v-btn text to="/login">LOGIN</v-btn>
    </div>
    <v-toolbar-items v-if="isLoggedIn">
      <v-btn icon @click="handleFullScreen()">
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>
      <v-menu
        offset-y
        origin="center center"
        class="elevation-1"
        transition="scale-transition"
        :alt="user.email"
      >
      </v-menu>

      <v-divider
        style="border-color: rgba(255, 255, 255, 0.5)"
        vertical
      ></v-divider>

      <v-menu
        offset-y
        origin="center center"
        class="elevation-1"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ attrs, on }">
          <div style="margin: auto">
            <v-btn dense depressed text v-bind="attrs" v-on="on">
              <div class="mr-1">
                <v-avatar size="30px">
                  <img :src="avatar" :alt="user.username" /> &nbsp;
                </v-avatar>
              </div>
              <span v-if="!mdAndDown" style="font-size: 80%; text-align: left">
               
              </span>

              <v-spacer></v-spacer>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
        </template>
        <v-list class="pa-0">
          <v-list-item
            v-for="(item, index) in profileMenus"
            :to="!item.href ? { name: item.name } : null"
            @click="item.click"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="index"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group no-action v-if="listUserRole.length>0">
            <template v-slot:activator>
              <v-list-item-action>
                <v-icon>mdi-account-switch</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Switch Akses</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(u, idx) in listUserRole"
              :key="idx"
              @click="handleSwitch(u)"
              v-show="u.show"
            >
              <v-list-item-content>
                <v-list-item-title>{{ u.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <!-- Logout -->
          <v-list-item
            @click="handleLogout()"
          >
            <v-list-item-action>
              <v-icon>mdi-power</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <confirm-modal-dialog ref="confirm" />
  </v-app-bar>
</template>
<script>
import Swal from "sweetalert2";
import Util from "~/utils";
import { mapGetters } from "vuex";
import ConfirmModalDialog from "../custom/ConfirmModalDialog";

export default {
  name: "AppToolbar",
  components: {
    ConfirmModalDialog,
  },
  data() {
    return {
      isLoggedIn: false,
      listUserRole: [],
      domain: this.$config.domain,
      profileMenus: [
        {
          icon: "mdi-account",
          href: "#",
          title: "Profile",
          click: this.handleProfile,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
    avatar() {
      return require(`~/assets/avatar/boy.png`);
    },
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    },
    breadcrumbs() {
      const { matched } = this.$route;
      return matched.map((route, index) => {
        const to =
          index === matched.length - 1
            ? this.$route.path
            : route.path || route.redirect;
        const text = route.meta.title;
        return {
          text: text,
          to: to,
          exact: true,
          disabled: false,
        };
      });
    },
    mdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
  methods: {
    getUserRole() {
      this.listUserRole = []
      let idUser = this.user.id;
      let idRole = this.user.role.id;
      this.$userService()
        .retrieveById(idUser)
        .then((res) => {
          let user = res.data;
          let listRole = user.userRole || []
          if(listRole.length>0){
            this.listUserRole.push({
              idRole : user.roleId,
              name : user.namaRole,
              idProgramProdi : user.idProgramProdi,
              show : (user.roleId==idRole) ? false : true
            })
  
            listRole.forEach(el => {
              this.listUserRole.push({
                idRole : el.idRole,
                name : el.name,
                idProgramProdi : user.idProgramProdi,
                show : (el.idRole==idRole) ? false : true
              })
            });
          }
        });
    },
    handleSwitch(val) {
      Swal.fire({
        title: "Switch Akses",
        text: "Lanjutkan login sebagai role "+ val.name +"?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("auth/switchRole", {
            id: val.idRole,
            name: val.name,
            urut: 1,
            idProgramProdi: (val.idRole!='HA03') ? val.idProgramProdi : null
          });
          window.location.href = this.domain+'/dashboard'
        }
      });
    },
    handleDrawerToggle() {
      this.$emit("side-icon-click");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    handleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (process.client) {
        localStorage.setItem("theme_mode", this.$vuetify.theme.dark);
      }
    },
    async handleLogout() {
      Swal.fire({
        title: "Logout",
        text: "Apakah anda yakin ingin logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/logout");
        }
      });
    },
    handleChangeLocale({ value }) {
      this.$vuetify.lang.current = value;
    },
    handleSetting() {},

    handleProfile() {
      this.$router.push("/pengaturan/user/profile");
    },

    handleGoBack() {
      this.$router.go(-1);
    },
  },
  created() {
    // this.getUserRole();
  },
  mounted() {
    this.isLoggedIn = Boolean(this.user);
    if (process.client) {
      this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("theme_mode"));
    }
  },
};
</script>

<style lang="sass" scoped>
.v-toolbar__extension
  padding: 0 !important
</style>

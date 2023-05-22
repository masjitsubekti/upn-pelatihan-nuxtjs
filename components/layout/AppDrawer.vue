<template>
  <v-navigation-drawer
    app
    class="app--drawer"
    :mini-variant.sync="mini"
    v-model="drawer"
    :width="drawerWidth"
    floating
    :style="`max-height: 100%; border:0 `"
  >
    <v-toolbar elevation="0">
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down" style="color: green">SILATURAHMI</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>

    <v-row no-gutters style="padding: 15px 15px 0px 15px">
      <v-col cols="12" sm="3" md="3">
        <v-avatar
          color="primary"
          size="50"
          style="margin-top: 5px; color: white; font-weight: 500"
        >
          <img :src="avatar" />
        </v-avatar>
      </v-col>
      <v-col cols="12" sm="9" md="9">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle style="font-size: 10pt">{{
              nama_user
            }}</v-list-item-subtitle>
            <v-list-item-title style="font-size: 10pt">{{
              role
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-list class="pa-0">
      <template v-for="(item, key) in computeMenu">
        <template v-if="item.children && item.children.length > 0">
          <v-list-group
            active-class="green--text"
            :key="key"
            no-action
            :to="item.link"
          >
            <template v-slot:prependIcon>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" v-text="item.classIcon" />
                </template>
                <span> {{ item.nama }} </span>
              </v-tooltip>
            </template>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.nama" />
              </v-list-item-content>
            </template>
            <v-list-item
              :class="drawerWidth === 64 ? 'pl-4' : ''"
              v-for="subItem in item.children"
              :key="subItem.nama"
              :to="subItem.link"
              color="success"
            >
              <template v-if="drawerWidth === 64">
                <v-list-item-icon>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        v-text="subItem.classIcon"
                      />
                    </template>
                    <span>{{ subItem.nama }}</span>
                  </v-tooltip>
                </v-list-item-icon>
              </template>
              <template v-else>
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.nama" />
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item color="success" :key="key" :to="item.link">
            <v-list-item-icon>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" v-text="item.classIcon" />
                </template>
                <span>{{ item.nama }}</span>
              </v-tooltip>
            </v-list-item-icon>
            <v-list-item-content v-if="drawerWidth !== 64">
              <v-list-item-title v-text="item.nama" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
    </v-list>
    <!-- Collapse -->
    <template v-slot:append>
      <div class="grey lighten-3">
        <template v-if="drawerWidth === 64">
          <div class="d-flex">
            <v-btn
              width="64"
              icon
              tile
              @click="handleDrawerCollapse"
              class="mx-auto"
            >
              <v-icon class="text--disabled">mdi-arrow-collapse-right</v-icon>
            </v-btn>
          </div>
        </template>
        <template v-else>
          <div class="d-flex">
            <v-spacer />
            <v-btn icon tile @click="handleDrawerCollapse" class="mr-2">
              <v-icon class="text--disabled">mdi-arrow-collapse-left</v-icon>
            </v-btn>
          </div>
        </template>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
import menu from "@/api/menu";
import Util from "~/utils";
import { mapGetters } from "vuex";
import { toast } from "@/mixins/toast.js";

export default {
  name: "AppDrawer",
  components: {},
  mixins: [toast],
  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      mini: false,
      collapseDrawer: true,
      drawerWidth: 256,
      drawer: true,
      scrollSettings: {
        maxScrollbarLength: 160,
      },
      sponsor: {
        href: "https://www.theopticalfiber.com/",
        src: "https://www.theopticalfiber.com/images/logo/logo.png",
        srcMini: "https://www.theopticalfiber.com/images/logo/logo_mini.png",
      },
      computeMenu: [],
      nama_user: "",
      role: "",
      nip: "",
      nama_prodi: "",
    };
  },

  computed: {
    ...mapGetters({
      authMenus: "auth/menus",
      user: "auth/user",
    }),
    computeLogo() {
      return "/static/m.png";
    },
    avatar() {
      return require(`~/assets/avatar/boy.png`);
    },
    mdAndDown() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
  async mounted() {},
  created() {
    this.getMenu();
    this.role = this.$store.state.auth.user.role.name;
    this.nama_user = this.$store.state.auth.user.name;
    this.nip = this.$store.state.auth.user.username;
    this.nama_prodi = this.$store.state.auth.user.namaProdi;
  },

  methods: {
    async getMenu() {
      await this.$store.dispatch(`auth/loadAuthMenu`, this.user.role.id);
      if (
        this.authMenus == undefined ||
        this.authMenus == null ||
        this.authMenus.length == 0
      ) {
        this.showToast("warning", "Otorisasi menu untuk anda belum di set");
        this.$router.push("/logout");
        return;
      }

      let menu = this.authMenus != null ? this.authMenus : [];
      this.computeMenu = menu;
      for (var i = 0; i < this.computeMenu.length; i++) {
        const el = this.computeMenu[i];
        if (el.isPermission == true) {
          el.splice(el.indexOf(el), -1);
        }
        if (el.children == null) {
          delete el.children;
        }
      }
    },

    handleDrawerCollapse() {
      this.drawerWidth = this.drawerWidth === 256 ? 64 : 256;
    },
    toggleDrawer(val) {
      this.drawer = val ? false : !this.drawer;
    },

    handleFullScreen() {
      Util.toggleFullScreen();
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.font-size-role {
  font-size: 11px;
}
</style>

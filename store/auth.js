import { mapStatesToGetters, mapStatesToMutations } from "@/plugins";
import { TOKEN_KEY, TOKEN_API_KEY, TOKEN_SAMPLE } from "~/constants/global";
import Menu from "~/api/menu";

const states = () => {
  return {
    user: {
      name: "Insan Mulia",
      username: "superadmin",
      namaProdi: "INFORMATIKA",
      role: {
        id: "HA01",
        name: "SUPERADMIN",
      },
    },
    token: {
      AccessToken: null,
    },
    loggedIn: null,
    menus: [],
  };
};

export const state = () => states();

export const getters = {
  ...mapStatesToGetters(states()),
  getLoginStatus: (state) => {
    return Boolean(state.user);
  },
};

export const mutations = {
  ...mapStatesToMutations(states()),
  SET_ROLES(state, payload) {
    state.user.role.id = payload.id;
    state.user.role.name = payload.name;
    state.user.idProgramProdi = payload.idProgramProdi;
  },
};

export const actions = {
  async switchRole({ commit }, data) {
    commit("SET_ROLES", data);
  },
  async initUserData({ commit }, app) {
    const data = await app.$axios.$get("/user");
    commit("setData", data);
    return data;
  },
  async login({ commit }, payload) {
    try {
      // window.$nuxt.$root.$loading.start();
      // const { data } = await this.$axios.$post("/user/login", payload, {
      //   headers: {
      //     "x-api-key": TOKEN_API_KEY,
      //   },
      // });
      // this.$cookies.set(TOKEN_KEY, data.token.AccessToken);

      // // set localy
      // commit("user", data.user);
      // commit("token", data.token);

      // example
      this.$cookies.set(TOKEN_KEY, TOKEN_SAMPLE);
      commit("token", TOKEN_SAMPLE);
      this.$router.push("/dashboard");
    } catch (err) {
      console.log("error.login", err);
      throw err;
    } finally {
      console.log("Masuk finally");
      window.$nuxt.$root.$loading.finish();
    }
  },
  logout() {
    console.log("auth.logout");
    if (window.confirm("Apakah Anda yakin akan logout?")) {
      this.$router.push("/logout");
    }
  },
  async loadAuthMenu({ commit }, roleId) {
    // const { data } = await this.$axios.$get(`/menu-user`, {
    //   params: {
    //     roleId: roleId,
    //     app: 1,
    //   },
    // });
    commit("menus", Menu);
  },
};

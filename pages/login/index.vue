<template>
  <v-app id="login">
    <v-main>
      <div class="elps1"></div>
      <div class="elps2"></div>
      <v-container fill-height>
        <v-row>
          <v-col cols="12" md="12">
            <v-card class="bx-crd-lg" elevation="5">
              <v-card-text style="padding: 0px">
                <v-row>
                  <v-col
                    class="img-lg"
                    cols="12"
                    md="4"
                    style="padding: 0px; background-image: url(img-login.jpg)"
                  >
                    <div class="bck-lg mt-6 ml-5">
                      <v-btn
                        x-small
                        @click="$router.push('/')"
                        color="transparent"
                        elevation="0"
                        dark
                      >
                        <v-icon x-small>mdi-arrow-left</v-icon>
                        Kembali
                      </v-btn>
                    </div>
                    <div class="bx-grd"></div>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-container>
                      <div class="text-center">
                        <img width="12%" src="/upn-logo.png" />
                        <br />
                        <h3 style="color: #333">Login</h3>
                        <p>
                          Selamat datang di Aplikasi SILATURAHMI, silakan
                          masukkan NPM dan password Anda dengan benar
                        </p>
                      </div>
                      <v-form ref="form">
                        <v-row>
                          <v-col cols="12">
                            <label>Username/NIP/NPM</label>
                            <v-text-field
                              v-model="username"
                              @keyup.enter="handleValidasiLogin()"
                              :rules="[
                                (v) => !!v || 'Username/NIP/NPM Wajib diisi!',
                              ]"
                              required
                              placeholder="Masukan Username/NIP/NPM"
                              autofocus
                              outlined
                              dense
                            />
                            <label>Password</label>
                            <v-text-field
                              v-model="password"
                              @click:append="showPassword = !showPassword"
                              @keyup.enter="handleValidasiLogin()"
                              placeholder="Password"
                              :rules="[(v) => !!v || 'Password Wajib diisi!']"
                              :type="showPassword ? 'text' : 'password'"
                              :append-icon="
                                showPassword ? 'mdi-eye' : 'mdi-eye-off'
                              "
                              outlined
                              dense
                            />
                            <v-btn
                              @click="handleValidasiLogin()"
                              color="success"
                              block
                              >Login</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-form>
                      <br />
                      <small>Lupa password? <a href="">Click here</a></small>
                      <br />
                      <small
                        >Register InBound Mandiri
                        <a
                          @click="
                            $router.push('/pertukaran-mahasiswa/registrasi')
                          "
                          >Register here</a
                        ></small
                      >
                    </v-container>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent width="450px" scrollable>
          <v-card class="mx-auto" max-width="450" tile>
            <v-card-title
              style="color: green; padding-top: 10px; padding-bottom: 10px"
            >
              <span style="font-size: 18px">Login sebagai ?</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="handleClose()" color="error">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-list>
                <v-list-item-group
                  v-model="selectedRole"
                  color="warning"
                  active-class="pink--text"
                >
                  <template v-for="(item, index) in roles">
                    <v-hover v-slot:default="{ hover }" :key="index">
                      <v-list-item
                        :key="index"
                        color="success"
                        @click="handleLogin(item.idRole)"
                      >
                        <template v-slot:default="{}">
                          <v-row outlined color="blue">
                            <v-expand-transition>
                              <v-overlay
                                color="success"
                                absolute
                                :opacity="0.2"
                                :value="hover"
                              >
                              </v-overlay>
                            </v-expand-transition>
                            <v-list-item-icon style="padding-right: 10px">
                              <v-icon> mdi-account-circle </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ item.name }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-row>
                        </template>
                      </v-list-item>
                    </v-hover>
                    <v-divider
                      v-if="index + 1 < roles.length"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { toast } from "@/mixins/toast.js";
import AuthService from "./auth.service";
export default {
  layout: "auth",
  mixins: [toast],
  data() {
    return {
      showPassword: false,
      username: "",
      password: "",
      roles: [],
      selectedRole: null,
      dialog: false,
      isLoadingLogin: false,
    };
  },
  computed: {},
  methods: {
    async handleLogin(roleId) {
      if (this.$refs.form.validate()) {
        try {
          this.isLoadingLogin = true;
          await this.$store
            .dispatch("auth/login", {
              username: this.username,
              password: this.password,
              roleId: roleId,
            })
            .catch((err) => {
              this.hasErr = true;
              this.errMsg = err.message;
              this.$nuxt.$loading.finish();
            });
          this.isLoadingLogin = false;
        } catch (err) {
          console.log("errorlogin", err);
          throw err;
        }
      }
    },

    async handleValidasiLogin() {
      this.handleLogin('')
      // if (this.$refs.form.validate()) {
        // try {
        //   this.isLoadingLogin = true;
        //   const payload = {
        //     username: this.username,
        //     password: this.password,
        //   };
        //   await this.$authService()
        //     .validasiLogin(payload)
        //     .then(async (res) => {
        //       this.roles = res.data || [];
        //       if (this.roles.length > 1) {
        //         this.dialog = true;
        //       } else if (this.roles.length == 1) {
        //         await this.handleLogin(this.roles[0].idRole);
        //       } else {
        //         toast.methods.showToast("warning", "User tidak ditemukan");
        //       }
        //     });
        //   this.isLoadingLogin = false;
        // } catch (err) {
        //   console.log("errorlogin", err);
        // }
      // }
    },

    handleClose() {
      this.dialog = false;
    },

    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>
<style>
.bx-grd {
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 20px 0px 0px 20px;
  background-image: linear-gradient(
    159.36deg,
    #5cb270 4.04%,
    rgba(217, 217, 217, 0) 80.75%
  );
}
div.img-lg {
  padding: 0px;
  background-position: 48%;
  border-radius: 20px 0px 0px 20px;
  background-size: auto 478px;
  background-repeat: no-repeat;
  background-image: linear-gradient(
    159.36deg,
    #5cb270 4.04%,
    rgba(217, 217, 217, 0) 80.75%
  );
}
.bx-crd-lg {
  margin: auto;
  width: 80%;
  border-radius: 20px !important;
}
.bck-lg {
  position: absolute;
  z-index: 2;
}
.elps1 {
  background-color: #def0e2;
  border-radius: 50%;
  width: 620px;
  height: 620px;
  position: absolute;
  left: -210px;
  top: -280px;
}
.elps2 {
  background-color: #def0e2;
  border-radius: 50%;
  width: 350px;
  height: 350px;
  position: absolute;
  left: 95%;
  top: 350px;
}
</style>

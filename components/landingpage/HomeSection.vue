<template>
  <section id="home">
    <v-parallax
      dark
      :src="require('~/assets/image/landingpage/bg-silaturahmi2.png')"
      height="750"
    >
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" xl="8">
              <v-btn
                rounded
                outlined
                color="#5cb270"
                large
                style="margin-top: 250px; margin-left: -65px"
              >
                <span style="font-size: 12pt"
                  >Pelajari Selengkapnya
                  <v-icon class="ml-2">mdi-arrow-right</v-icon></span
                >
              </v-btn>

              <!-- <v-btn
                rounded
                outlined
                large
                dark
                @click="$vuetify.goTo('#features')"
                class="mt-5"
              >
                Saiba mais
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn> -->
              <!-- <div class="video d-flex align-center py-4">
                <a @click.stop="dialog = true" class="playBut">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                    x="0px"
                    y="0px"
                    width="60px"
                    height="60px"
                    viewBox="0 0 213.7 213.7"
                    enable-background="new 0 0 213.7 213.7"
                    xml:space="preserve"
                  >
                    <polygon
                      class="triangle"
                      id="XMLID_18_"
                      fill="none"
                      stroke-width="7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      points="73.5,62.5 148.5,105.8 73.5,149.1 "
                    />

                    <circle
                      class="circle"
                      id="XMLID_17_"
                      fill="none"
                      stroke-width="7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      cx="106.8"
                      cy="106.8"
                      r="103.3"
                    />
                  </svg>
                </a>
                <p class="subheading ml-2 mb-0">Assista o vídeo</p>
              </div> -->
            </v-col>
            <v-col cols="12" md="6" xl="4" class="hidden-sm-and-down"> </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-parallax>

    <v-container fluid id="features" style="margin-top: -50px">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-card class="card-count">
            <v-card-text>
              <v-row align="center">
                <v-col cols="11" md="4" sm="7">
                  <div style="width: 70%">
                    <h3 class="h3-mitra">8116</h3>
                    <p class="p-mitra">Mahasiswa Mengikuti MBKM</p>
                  </div>
                </v-col>
                <v-col cols="11" md="4" sm="7">
                  <div style="width: 70%">
                    <h3 class="h3-mitra">300</h3>
                    <p class="p-mitra">Mitra Terlibat MBKM</p>
                  </div>
                </v-col>
                <v-col cols="11" md="4" sm="7">
                  <div style="width: 70%">
                    <h3 class="h3-mitra">385</h3>
                    <p class="p-mitra">Dosen Terlibat MBKM</p>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="svg-border-waves">
      <img :src="require('~/assets/image/landingpage/wave2.svg')" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      videoId: "i8IvvHJssWE",
    };
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.pause();
      }
    },
  },
  methods: {
    ready(event) {
      this.player = event.target;
    },
    playing(event) {
      // The player is playing a video.
    },
    change() {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      this.videoId = "another video id";
    },
    stop() {
      this.player.stopVideo();
    },
    pause() {
      this.player.pauseVideo();
    },
  },
};
</script>

<style lang="scss">
.h3-mitra {
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 75px;
  text-align: center;
  color: #5cb270;
}

.p-mitra {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #262d27;
  text-align: center;
}

.circle {
  stroke: white;
  stroke-dasharray: 650;
  stroke-dashoffset: 650;
  -webkit-transition: all 0.5s ease-in-out;
  opacity: 0.3;
}

.playBut {
  /*  border: 1px solid red;*/
  display: inline-block;
  -webkit-transition: all 0.5s ease;

  .triangle {
    -webkit-transition: all 0.7s ease-in-out;
    stroke-dasharray: 240;
    stroke-dashoffset: 480;
    stroke: white;
    transform: translateY(0);
  }

  &:hover {
    .triangle {
      stroke-dashoffset: 0;
      opacity: 1;
      stroke: white;
      animation: nudge 0.7s ease-in-out;

      @keyframes nudge {
        0% {
          transform: translateX(0);
        }
        30% {
          transform: translateX(-5px);
        }
        50% {
          transform: translateX(5px);
        }
        70% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }

    .circle {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
}
</style>

<style>
.btn-play {
  transition: 0.2s;
}

.svg-border-waves .v-image {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3rem;
  width: 100%;
  overflow: hidden;
}

#home {
  z-index: 0;
}
.svg-border-waves img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: -2px;
  z-index: -1;
}

.card {
  min-height: 300px;
  padding: 10px;
  transition: 0.5s ease-out;
}

.card .v-image {
  margin-bottom: 15px;
  transition: 0.75s;
}

.card h1 {
  margin-bottom: 10px;
}

.zoom-efect {
  transform: scale(1.1);
}

.up {
  transform: translateY(-20px);
  transition: 0.5s ease-out;
}

.card-count {
  /* height: 178px; */
  background: #ffffff;
  box-shadow: 0px 0px 119px -54px #868686 !important;
  border-radius: 50px !important;
  padding: 5px 5px 5px 50px;
}
</style>

<style>
section {
  position: relative;
}
</style>

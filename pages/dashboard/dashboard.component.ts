import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  layout: "admin",
})
export default class DashboardComponent extends Vue {
  public data = {};
  public ListGrafik = {};
  public listMatkulSKS: any = {
    IdMahasiswa: "",
    JumlahMatkul: "",
    JumlahSKS: "",
  };
  public listKrs = [];
  public listStatusMBKM = {};
  public listFakultas: any = [];
  public listJenisMBKM: any = [];
  public listProgramMBKM: any = [];

  created() {}

  loadAll(): void {
    this.$dashboardService()
      .retrieve()
      .then((res) => {
        this.data = res.data;
      });
  }

  loadMatkulSKS() {
    this.$dashboardService()
      .retrieveMatkulSKS({
        IdSiamikMahasiswa: this.$store.state.auth.user.idSiamikMahasiswa,
      })
      .then((res) => {
        this.listMatkulSKS = res.data[0] || {};
        this.listMatkulSKS.JumlahSKS = 0;
      });
  }

  getKrs() {
    this.$dashboardService()
      .KrsMahasiswa({
        npm: this.$store.state.auth.user.username,
      })
      .then((res) => {
        this.listKrs = res.data ? res.data.data : [];
        let sks = this.listKrs.reduce((sum: any, val: any) => {
          return sum + parseInt(val.sks);
        }, 0);
        this.listMatkulSKS.JumlahSKS = sks;
      });
  }

  loadStatusMBKM() {
    this.$dashboardService()
      .retrieveStatusMBKM({
        IdSiamikMahasiswa: this.$store.state.auth.user.idSiamikMahasiswa,
      })
      .then((res) => {
        this.listStatusMBKM = res.data;
      });
  }

  loadGrafik() {
    this.$dashboardService()
      .retrieveGrafik({
        idProgram: this.listJenisMBKM,
      })
      .then((res) => {
        this.ListGrafik = res.data;
      });
  }

  loadJenisMBKM() {
    this.$dashboardService()
      .retrieveJenisMBKM()
      .then((res) => {
        this.listJenisMBKM = res.data;
      });
  }

  loadProgramMBKM() {
    this.$dashboardService()
      .retrieveProgramMBKM()
      .then((res) => {
        this.listProgramMBKM = res.data;
      });
  }

  loadFakultas() {
    this.$dashboardService()
      .retrieveFakultas()
      .then((res) => {
        this.listFakultas = res.data;

        // cara cek pada konsol log
        // console.log("datalistFakultas",this.listFakultas);
      });
  }
}

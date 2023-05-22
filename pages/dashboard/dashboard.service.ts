import { $axios } from "~/utils/api";
import axios from "axios";
export default class dashboardService {
  public retrieve(req?: any): Promise<any> {
    return $axios.$get(`/v9/dashboard/jumlah-all-mbkm`, {
      params: req,
    });
  }

  public retrieveMatkulSKS(req: any): Promise<any> {
    return $axios.$get(`/v9/dashboard/mahasiswa/jumlah-matkul-sks`, {
      params: req,
    });
  }

  public retrieveStatusMBKM(req: any): Promise<any> {
    return $axios.$get(`/v9/dashboard/mahasiswa/jumlah-status-mbkm`, {
      params: req,
    });
  }

  public retrieveGrafik(req: any): Promise<any> {
    return $axios.$get(`/v9/dashboard/list-grafik-mbkm`, {
      params: req,
    });
  }

  public retrieveJenisMBKM(): Promise<any> {
    return $axios.$get(`/v9/dashboard/list-jenis-mbkm`, {});
  }

  public retrieveProgramMBKM(): Promise<any> {
    return $axios.$get(`/v9/dashboard/list-program-mbkm`, {});
  }

  public retrieveFakultas(): Promise<any> {
    return $axios.$get(`/v9/dashboard/list-fakultas-mbkm`, {});
  }

  public retrieveFakjur(): Promise<any> {
    return $axios.$get(`/v9/dashboard/list-fakjur-mbkm`, {});
  }

  //dashboard
  public KrsMahasiswa(req: any): Promise<any> {
    return $axios.$get(`/silaturahmi/master/krs`, {
      params: req,
    });
  }
}

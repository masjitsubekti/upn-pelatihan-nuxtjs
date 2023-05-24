import { $axios } from "~/utils/api";

export default class PendaftarProgramMbkmService {
  public create(req: any): Promise<any> {
    return $axios.$post(`/mbkm/pendaftar-program-mbkm`, req);
  }
}

import { $axios } from "~/utils/api";

export default class KelasService {
  public retrieveAll(req?: any): Promise<any> {
    return $axios.$get(`/master/kelas/all`, {
      params: req,
    });
  }
}

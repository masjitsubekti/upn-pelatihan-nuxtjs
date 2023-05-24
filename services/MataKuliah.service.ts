import { $axios } from "~/utils/api";

export default class MataKuliahService {
  public retrieve(req?: any): Promise<any> {
    return $axios.$get(`/master/mata-kuliah`, {
      params: req,
    });
  }
}

import { $axios } from "~/utils/api";
export default class fileService {
  public readFile(req?: any): Promise<any> {
    return $axios.$get(`/files`, {
      params: req,
    });
  }
}

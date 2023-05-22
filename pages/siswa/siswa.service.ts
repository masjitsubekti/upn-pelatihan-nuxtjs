import { $axios } from "~/utils/api";

export default class SiswaService {
  public retrieve(req?: any): Promise<any> {
    return $axios.$get(`/master/siswa`, {
      params: req,
    });
  }
  public save(req: any): Promise<any> {
    if (req.id) {
      return this.update(req);
    } else {
      return this.create(req);
    }
  }
  public create(req: any): Promise<any> {
    return $axios.$post("/master/siswa", req);
  }
  public update(req: any): Promise<any> {
    return $axios.$post("/master/siswa/update", req);
  }
  public retrieveById(id: string): Promise<any> {
    return $axios.$get(`/master/siswa/` + id);
  }
  public delete(id: string): Promise<any> {
    return $axios.$delete(`/master/siswa/` + id);
  }
}

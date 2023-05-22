import { $axios } from "~/utils/api";

export default class KelasSiswaService {
  public retrieve(req?: any): Promise<any> {
    return $axios.$get(`/master/kelas-siswa`, {
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
    return $axios.$post("/master/kelas-siswa", req);
  }
  public update(req: any): Promise<any> {
    return $axios.$put("/master/kelas-siswa", req);
  }
  public retrieveById(id: string): Promise<any> {
    return $axios.$get(`/master/kelas-siswa/` + id);
  }
  public delete(id: string): Promise<any> {
    return $axios.$delete(`/master/kelas-siswa/` + id);
  }
}

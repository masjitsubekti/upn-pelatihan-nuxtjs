import { $axios } from "~/utils/api";

export default class JenisMbkmService {
  public retrieve(req?: any): Promise<any> {
    return $axios.$get(`/master/jenis-mbkm`, {
      params: req,
    });
  }
  public retrieveAll(req?: any): Promise<any> {
    return $axios.$get(`/master/jenis-mbkm/all`, {
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
    return $axios.$post(`/master/jenis-mbkm`, req);
  }
  public update(req: any): Promise<any> {
    return $axios.$put(`/master/jenis-mbkm/${req.id}`, req);
  }
  public retrieveById(id: string): Promise<any> {
    return $axios.$get(`/master/jenis-mbkm/${id}`);
  }
  public delete(id: string): Promise<any> {
    return $axios.$delete(`/master/jenis-mbkm/${id}`);
  }
}

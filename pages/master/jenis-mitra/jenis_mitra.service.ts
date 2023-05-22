import { $axios } from "~/utils/api";

export default class JenisMitraService {
    public retrieve(req?: any): Promise<any> {
        return $axios.$get(`/master/jenis-mitra`, {
            params: req,
        });
    }

    public save(req: any): Promise<any> {
        console.log("save", req)
        if (req.id) {
            return this.update(req);
        } else {
            return this.create(req);
        }
    }
    public create(req: any): Promise<any> {
        return $axios.$post('/master/jenis-mitra', req)
    }

    public update(req: any): Promise<any> {
        return $axios.$put('/master/jenis-mitra/'+req.id, req)
    }

    public retrieveById(id: string): Promise<any> {
        return $axios.$get(`/master/jenis-mitra/` + id);
    }

    public delete(id: string): Promise<any> {
        return $axios.$delete(`/master/jenis-mitra/` + id);
    }
}
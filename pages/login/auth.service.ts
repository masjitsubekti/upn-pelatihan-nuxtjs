import { $axios } from "~/utils/api";
import { TOKEN_API_KEY } from "~/constants/global";
export default class AuthService {
  public validasiLogin(req: any): Promise<any> {
    return $axios.$post(
      `/user/validasi-login`,
      {
        username: req.username,
        password: req.password,
      },
      {
        headers: {
          "x-api-key": TOKEN_API_KEY,
        },
      }
    );
  }
}

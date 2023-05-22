import { TOKEN_KEY } from "~/constants/global"
export default ({  app, redirect, $config }) => {
  if (app.$cookies.get(TOKEN_KEY)) {
    return redirect('/dashboard')
  }
}

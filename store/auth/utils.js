
import { POST_REQUEST_INIT } from "./consts"


export const isAuthenticated = (store) => {


  return true

}

export const getRequestInit = (ctx = undefined) => {


    return ctx && ctx.req && ctx.req.headers.cookie
      ? {
        ...POST_REQUEST_INIT,
        ...{ headers: { cookie: ctx.req.headers.cookie } }
      }
      : POST_REQUEST_INIT


}

export const apiUrl = (path, ctx = undefined) => {

  if (!ctx && typeof window !== "undefined") return path
  const req = ctx.req;
  const host = req
    ? req.headers["x-forwarded-host"] || req.headers.host
    : window.location.host
  const proto = req
    ? req.headers["x-forwarded-proto"] || "http"
    : window.location.protocol.slice(0, -1)
  console.log('proto ' + proto + ' host ' + host)
  return `${proto}://${host}${path}`
}
import { AuthActionTypes, AuthState, SET_AUTH, CLEAR_AUTH, CognitoCredentials, SET_CREDENTIALS, CLEAR_CREDENTIALS, SET_ERROR, SET_LOADING, SET_MESSAGE } from "./types"
import fetch from 'isomorphic-fetch'
import Router from "next/router"
import { POST_REQUEST_INIT } from "./consts"
//import { ReduxPageContext } from "../../utils/types"
import { getRequestInit, apiUrl } from "./utils"




export function setAuth(auth) {
  return {
    type: SET_AUTH,
    payload: auth
  }
}

export function clearAuth() {
  return {
    type: CLEAR_AUTH
  }
}

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error
  }
}



export function setCognitoCredentials(credentials ) {
  return {
    type: SET_CREDENTIALS,
    payload: credentials
  }
}

export function clearCognitoCredentials() {
  return {
    type: CLEAR_CREDENTIALS
  }
}

export function setLoading(value) {
  return {
    type: SET_LOADING,
    payload: value

  }
}

export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    payload: message

  }
}

export const register = (credentials) => {

  const url = '/api/register'
  return (dispatch) => {
    dispatch(setCognitoCredentials(credentials))
    dispatch(setLoading(true))
    return fetch(url, {
      ...POST_REQUEST_INIT,
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then((res) => {
        if (res.error) {
          throw (res.error)
        } else {
          dispatch(setLoading(false))
          Router.push({
            pathname: '/confirmregister',
            query: { username: res.user },
          })

        }



      })
      .catch(err => {
        dispatch(clearCognitoCredentials())
        dispatch(setLoading(false))
        dispatch(setError(err))
        console.log("Exception Thrown in action.js / register :" + err);

      })

  }
}

//TODO make sure password is not sendt again
export const confirmRegister = (credentials) => {
  const url = '/api/confirmregister'
  return (dispatch) => {
    dispatch(setCognitoCredentials(credentials))
    dispatch(setLoading(true))
    return fetch(url, {
      ...POST_REQUEST_INIT,
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then((res) => {
        if (res.error) {
          throw (res.error)
        }
        dispatch(setAuth(res))
        dispatch(setLoading(false))
        Router.push('/sign-in')

      })
      .catch(err => {
        dispatch(setLoading(false))
        dispatch(setError(err))
        console.log("Exception Thrown in action.js / confirmRegister :" + err);

      })

  }
}


export const resetPassword = (credentials) => {
  const url = '/api/resetpassword'
  return (dispatch) => {
    dispatch(setCognitoCredentials(credentials))
    dispatch(setLoading(true))
    return fetch(url, {
      ...POST_REQUEST_INIT,
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then((res) => {
        if (res.error) {
          console.log('got error')
          throw (res.error)
        } else {
          dispatch(clearCognitoCredentials())
          dispatch(setLoading(false))
          Router.push({
            pathname: '/confirmpassword',
            query: { username: res.user },
          })
        }
      })
      .catch(err => {
        dispatch(setLoading(false))
        dispatch(setError(err))
        console.log("Exception Thrown in action.js / resetPassword :" + err);

      })

  }

}

export const confirmPassword = (credentials) => {
  const url = '/api/confirmpassword'
  return (dispatch) => {
    dispatch(setCognitoCredentials(credentials))
    dispatch(setLoading(true))
    return fetch(url, {
      ...POST_REQUEST_INIT,
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then((res) => {
        if (res.error) {
          throw (res.error)
        }
        dispatch(setLoading(false))
        dispatch(setMessage('Password updated , please login'))
        Router.push({
          pathname: '/sign-in'
        })

      })
      .catch(err => {
        console.log('confirmPassword error : ' + err)
        dispatch(setLoading(false))
        dispatch(setError(err))
        console.log("Exception Thrown in action.js / confirmPassword :" + err);

      })

  }

}

export const signIn = (credentials) => {

  const url = '/api/signin'
  return (dispatch) => {
    dispatch(setCognitoCredentials(credentials))
    dispatch(setLoading(true))
    return fetch(url, {
      ...POST_REQUEST_INIT,
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then((res) => {
        if (res.error) {
          throw (res.error)
        }
        dispatch(setAuth(res))
        dispatch(setLoading(false))
        Router.push('/')

      })
      .catch(err => {
        //TODO fix error handling
        dispatch(clearAuth())
        dispatch(setLoading(false))
        dispatch(setError(err))
        console.log("Exception Thrown in action.js / signIn :" + err);

      })

  }
}

export function signOut() {

  const url = '/api/signout'

  return (dispatch) => {
    return fetch(url, {
      ...POST_REQUEST_INIT
    }).then(() => {
      dispatch({
        type: CLEAR_AUTH
      })
      Router.push('/')
    })
  }
}

//TODO: dynamic server url based on host
export const refreshToken = (ctx = undefined) => {
  const url = apiUrl('/api/refreshtoken', ctx)
  const requestInit = getRequestInit(ctx)
  return (dispatch) => {
    return fetch(url, {
      ...requestInit
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw (res.error)
        }
        dispatch(setAuth(res))
      })
      .catch(err => {
        dispatch(setLoading(false))
        dispatch(clearAuth())
        dispatch(setError(err))
        console.log("Exception Thrown in action.js / refreshToken :" + err);

      })
  }
}

export const refreshTokenClient = () => {



  const url = '/api/refreshtoken'
  const requestInit = getRequestInit()
  return (dispatch) => {
    return fetch(url, {
      ...requestInit
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw (res.error)
        }
        dispatch(setAuth(res))
      })
      .catch(err => {
        dispatch(setLoading(false))
        dispatch(clearAuth())
        dispatch(setError(err))
        console.log("Exception Thrown in action.js / refreshTokenClient :" + err);
      })
  }
}

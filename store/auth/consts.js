import { AuthState, CognitoCredentials } from './types';

export const INITIAL_CREDENTIALS = {
  email: '',
  password: ''
}


export const AUTH_INITIAL_STATE = {
    credentials: INITIAL_CREDENTIALS,
    loading: false,
    jwt: '',
    jwt_expired: 0,
    email: '',
    authenticated: false,
    error: ''
  }


  export const POST_REQUEST_INIT = {
    method: 'POST',
    mode: 'same-origin',
    redirect: 'follow',
    credentials: 'same-origin', 
    headers: { 'Content-Type': 'application/json' }
  }


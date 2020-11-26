import {
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js"
import { getUserPool } from '../../utils/auth'


const login = async ( req, res) => {

    const authenticationDetails = new AuthenticationDetails({
        Username: req.body.email,
        Password: req.body.password,
    })

    const cognitoUser = new CognitoUser({
        Username: req.body.email,
        Pool: getUserPool()
    })

    return new Promise((resolve, reject) => {

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                const expirationTime = new Date(result.getAccessToken().payload.exp * 1000)
                const auth = {
                    jwt: result.getAccessToken().getJwtToken(),
                    jwt_expired: expirationTime,
                    email: req.body.email,
                    authenticated: true
                }
               
                resolve(res.status(200).json(auth))
            },
            onFailure: function (err) {

                if (err) {
                    if (err.code === "NotAuthorizedException") {
                        reject(res.status(401).json({ error: err.message }))
                    } else {
                        reject(res.status(500).json({ error: "Server Error " + err.message }))
                    }
                }
            },
        })
    })
}

export default login
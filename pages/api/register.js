import {
    CognitoUserAttribute,
    CognitoUser,
} from "amazon-cognito-identity-js"
import { getUserPool } from '../../utils/auth'

const register = async (req , res) => {

    const attributeList = [
        new CognitoUserAttribute({Name: "email", Value: req.body.email}),
        //new CognitoUserAttribute({Name: "custom:timestamp", Value: Date.now().toString()})
    ]

      return new Promise((resolve, reject) => {

      getUserPool().signUp(req.body.email, req.body.password, attributeList, null, function(err, result){
        if (err) {
          try {
            err.message = err.message
            resolve(res.status(400).json({error: err}))
          } catch (err) {
            reject(res.status(500))
          }
        }else{
          const cognitoUser = result.user
          resolve(res.json({user: cognitoUser.getUsername()}))
        }
     
    })
})

} 


export default register
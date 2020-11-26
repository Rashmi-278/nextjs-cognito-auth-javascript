import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    CognitoUserSession,
} from "amazon-cognito-identity-js";


export const getUserPool = () => {

   
    const userPool = new CognitoUserPool ({
        //UserPoolId : 'us-east-1_cS2g0tYO6',
        //ClientId : '7iucdm7ru8adagdq0oohj4un1h'
        //UserPoolId : 'us-east-1_cbS2C8dst', //Development userpool
       // ClientId : '474mlhvvni5lu0l5riks39om11' //development-client

        UserPoolId : 'us-east-1_tKWMCc2RA', //dev with custom attribute
        ClientId : '2949c4eslknr4keujg5ihb9lkj'
    });

    return userPool;

}

export const getCognitoUser = () => {

    return getUserPool().getCurrentUser();
}
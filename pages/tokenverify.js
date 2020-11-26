import React from "react"
import Layout from "../components/Layout"
import withAuthSync from "../hoc/withAuthSync"
import withAuthentication from "../hoc/withAuthenticated"
import { withRedux } from "../hoc/withRedux"
import { useDispatch, useStore, useSelector } from "react-redux"
//import { AppState } from "../store/types"
import { refreshToken } from "../store/auth/actions"
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Button,
  makeStyles,
  Grid
} from "@material-ui/core"

import withNotAuthenticated from "../hoc/withNotAuthenticated"
import withAuthenticated from "../hoc/withAuthenticated"
import { useStyles } from "../utils/consts"
import { useRouter } from "next/router"
import CognitoExpress from "cognito-express"

const myStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  }
}))

const TokenPage2 = () => {
  const classes = myStyles()
  const router = useRouter()
  const isAuthenticated = useSelector(
    state => state.authModule.authenticated
  )
  const jwt = useSelector(state => state.authModule.jwt)
  const jwt_expired = useSelector(
    state => state.authModule.jwt_expired
  )
  const dispatch = useDispatch()

  const refreshClick = (e) => {
    dispatch(refreshToken())
  }

  console.log("this : " + jwt);

  const cognitoExpress = new CognitoExpress({
    region: "us-east-1",
    cognitoUserPoolId: "us-east-1_cS2g0tYO6",
    tokenUse: "access", //Possible Values: access | id
    tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
  });

  cognitoExpress.validate(jwt, function(err, response) {

    if (err) console.log("error while validation " + err)
    console.log("validated , response " + response )

  });

  

  return (
    <Layout title="Token page">
        <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              JWT TOKEN
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph noWrap>
            Token: {jwt}
            
            </Typography>
        
            <Typography align="center" component="h1" variant="h5">
            Valid to: {new Date(jwt_expired).toLocaleString()}
          </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button onClick={refreshClick} variant="contained" color="primary">
                   Refresh Token
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        </main>
    </Layout>
  )
}
export default withAuthenticated(TokenPage2)

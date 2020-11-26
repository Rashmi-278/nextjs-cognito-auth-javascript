import Layout from "../components/Layout"
import { withRedux } from "../hoc/withRedux"
import { Container, CssBaseline, Avatar, Typography } from "@material-ui/core"
import { useStyles } from "../utils/consts"
import { Icon, InlineIcon } from '@iconify/react'
import Head from "next/head";
function Index() {

  const classes = useStyles()

return (
  
  <Layout title="Home">
    <Head>
      <meta name = "viewport" content = "viewport-fit = cover"  />
    </Head>

  <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
      <img src="/images/asset1.png" height="70"></img>
        <Typography align="center" component="h1" variant="h5">
          <br></br>
          NextJS / SSR / AWS Cognito 
        </Typography>
        <Typography align="center" component="h4" variant="h2">
          <br></br>
          Welcome to NextJS APP
        </Typography>
      </div>
    </Container>
    </Layout>
  )
}

export default withRedux(Index)
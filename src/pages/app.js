import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/login"
import Logout from "../components/logout"

const App = () => (
  <Layout>
    <Router>
      <Login path="/app/login" component={Login} />
      <Logout path="/app/logout" component={Logout} />
      {/* <PrivateRoute path="/app/profile" component={Profile} /> */}
      <Profile path="/app/profile" component={Profile} />
    </Router>
  </Layout>
)

export default App

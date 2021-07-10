import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"

class Logout extends React.Component {
  render() {
    if (isLoggedIn()) {
      logout();
    }
    return (
      navigate(`/app/login`)
    )
  }
}

export default Logout
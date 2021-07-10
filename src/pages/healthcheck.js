import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const Healthcheck = () => (
  <Layout>
    <Seo title="Healthcheck" />
    <h1>Healthcheck</h1>
    <p>Welcome to page 2</p>
    <p>
      <Link to="/">Home</Link> {` | `}
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout>
)

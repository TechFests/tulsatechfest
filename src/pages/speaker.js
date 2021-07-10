import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Speaker = () => (
  <Layout pageTitle="Speaker">
    <Seo title="Speaker" />
    <h1><Link to="/speakers">Speaker</Link></h1>
    <p>bio</p>
    <p>talks
      <ul>
        <li>...</li>
      </ul>
    </p>
  </Layout>
)

export default Speaker

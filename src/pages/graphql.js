import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const GraphQL = () => (
  <Layout>
    <Seo title="GraphQL" />
    <iframe src="/___graphql" title="graphql" style={{width:`100%`,height:`100%`}}></iframe>
  </Layout>
)

export default GraphQL

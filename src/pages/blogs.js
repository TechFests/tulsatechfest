import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Blogs = ({ data }) => (
  <Layout pageTitle="Blogs">
    <Seo title="Blogs" />
    <h1>Blogs</h1>
      <ol>
        {
          data.allFile.nodes.map(node => (
            <li key={node.name}><Link to={`/blogs/${node.name}`}>{node.name}</Link></li>
          ))
        }
      </ol>
  </Layout>
)

export const query = graphql`
  query {
    allFile (filter: { sourceInstanceName: {eq: "blogs"}}, sort: {fields: name, order: ASC}) { 
      nodes {
        name
      }
    }
  }
`

export default Blogs

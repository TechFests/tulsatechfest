import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Blog = ({ data }) => (
  <Layout pageTitle="Blog">
    <Seo title="Blog" />
    <h1>Blog</h1>
      <ol>
        {
          data.allFile.nodes.map(node => (
            <li key={node.name}><Link to={`/blog/${node.name}`}>{node.name} - {node.relativePath}</Link></li>
          ))
        }
      </ol>
  </Layout>
)

export const query = graphql`
  query {
    allFile (filter: { sourceInstanceName: {eq: "blog"}}, sort: {fields: name, order: ASC}) { 
      nodes {
        name
        relativePath
      }
    }
  }
`

export default Blog

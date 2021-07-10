import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
const { toTitleCase } = require('../../lib/str');

const Speakers = ({ data }) => (
  <Layout pageTitle="Speakers">
    <Seo title="Speakers" />
    <h1>Speakers</h1>
      <ol>
        {
          data.allFile.nodes.map(node => (
            <li key={node.name}><Link to={`/speakers/${node.name}`}>{toTitleCase(node.name)}</Link></li>
          ))
        }
      </ol>
  </Layout>
)

export const query = graphql`
  query {
    allFile (filter: { sourceInstanceName: {eq: "speakers"}}, sort: {fields: name, order: ASC}) { 
      nodes {
        name
      }
    }
  }
`

export default Speakers

import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
const { toTitleCase } = require('../../lib/str');

const Links = ({ data }) => (
  <Layout pageTitle="Links">
    <Seo title="Links" />
    <h1>Links</h1>
      <ol>
        {
          data.allDirectory.nodes.map(node => (
            <li key={node.name}><Link to={`/links/${node.name}`}>{toTitleCase(node.name)}</Link></li>
          ))
        }
      </ol>
  </Layout>
)

export const query = graphql`
  query {
    allDirectory (filter: { sourceInstanceName: {eq: "links"}}) { 
      nodes {
        name
      }
    }
  }
`

// export const query = graphql`
//   query {
//     allFile(filter: {relativeDirectory: {eq: "data/links"}}, sort: {fields: name, order: ASC}) {
//       nodes {
//         absolutePath
//           base
//           relativeDirectory
//           relativePath
//           name
//       }
//     }
//   }
// `

// export const query = graphql`
//   query IndexQuery {
//     allMarkdownRemark(
//       filter: { fileAbsolutePath: {regex : "\/links/"} },
//       sort: {fields: [frontmatter___date], order: DESC},
//     ) {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             slug
//             date(formatString: "DD MMMM YYYY")
//             category
//           }
//           excerpt
//         }
//       }
//     }
//   }
// `;

export default Links

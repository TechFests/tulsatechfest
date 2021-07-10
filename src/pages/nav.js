import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Nav = ({ data }) => (
  <Layout pageTitle="Nav">
    <Seo title="Nav" />
    <h1>Nav</h1>
      <ol>
        {
          data.allFile.nodes.map(node => (
            <li key={node.name}><Link to={`/${node.name}`}>{node.name}</Link></li>
          ))
        }
      </ol>
  </Layout>
)

export const query = graphql`
  query {
    allFile (filter: { sourceInstanceName: {eq: "nav"}}) { 
      nodes {
        absolutePath
          base
          relativeDirectory
          relativePath
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

export default Nav

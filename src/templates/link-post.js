import React from "react"
import { graphql } from "gatsby"

// export default function LinkPost({ data }) {
//   const { markdownRemark } = data // data.markdownRemark holds your post data
//   const { frontmatter, html } = markdownRemark
//   return (
//     <div className="link-post">
//       <h1>{frontmatter.title}</h1>
//       <h2>{frontmatter.date}</h2>
//       <div
//         className="link-post-content"
//         dangerouslySetInnerHTML={{ __html: html }}
//       />
//     </div>
//   )
// }

// export const pageQuery = graphql`
//   query($path: String!) {
//     markdownRemark(frontmatter: { path: { eq: $path } }) {
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         path
//         title
//       }
//     }
//   }
// `
import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function BlogPost() {
  return (
    <Layout>
      <div>Hello blog post</div>
    </Layout>
  )
}
// export default function BlogPost({ data }) {
//   const { markdownRemark } = data // data.markdownRemark holds your post data
//   const { frontmatter, html } = markdownRemark
//   return (
//     <div className="blog-post">
//       <h1>{frontmatter.title}</h1>
//       <h2>{frontmatter.date}</h2>
//       <div
//         className="blog-post-content"
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
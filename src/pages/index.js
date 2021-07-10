import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
//import 'bootstrap/dist/css/bootstrap.min.css';

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <p>TULSATECHFEST 2021! (#14)</p>
    <h1>JOIN US!</h1>    
    <p>Friday, November 12th, 2021</p>
    <Link to="/about">
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
    </Link>
  </Layout>
)

export default IndexPage

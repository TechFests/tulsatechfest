/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children, location, crumbLabel }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: "column"
    }}>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
          paddingTop: 0
        }}
      >
        <div className="wrapper">
          <main>
            <Breadcrumb location={location} crumbLabel={crumbLabel} crumbSeparator=" / " />
            {children}
          </main>
          <div className="push"></div>
        </div>
      </div>
      <Footer siteTitle={data.site.siteMetadata?.title || `Title`} />
    </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

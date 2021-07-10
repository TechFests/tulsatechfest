import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import NavMain from "./navMain"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"

export const Header = ({ siteTitle, location, crumbLabel }) => (
  <header className="header">
    <div className="title">
      <h1 style={{ margin: 0 }}>
        <Link to="/" className="title-link">{siteTitle}</Link>
      </h1>
    </div>
    <div className="global-nav header-right">
      <div className="row">
        <nav className="main-nav">
          <NavMain />
          {/* <Link class="nav-link" to="/about">About</Link>
          <Link class="nav-link" to="/contact">Contact</Link> */}
          {/* <Link class="nav-link" to="/blog">Blog</Link> */}
        </nav>
        <div className="utility-nav">              
          {/* <a href="https://twitter.com/tulsatechfest" class="social-icon-link u-link-white" target="_blank" rel="noreferrer"><FaTwitter/></a>
          <a href="https://fb.me/e/1CHxlbSR1" class="social-icon-link u-link-white" target="_blank" rel="noreferrer"><FaFacebook/></a> */}
        </div>
      </div>
    </div>
    <Breadcrumb location={location} crumbLabel={crumbLabel} />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

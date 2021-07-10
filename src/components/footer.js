import * as React from "react"
import PropTypes from "prop-types"
import FooterNav from'./footerNav'

const Footer = ({ siteTitle }) => (
  <footer className="footer">
      <FooterNav siteTitle={siteTitle} />
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer

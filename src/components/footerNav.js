import * as React from "react"
import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"
import { FaTwitter, FaFacebook } from 'react-icons/fa';
const { removeSortIndex,toTitleCase } = require('../../lib/str');

function doNode(node, siteTitle) {
  //console.log(`node.name:${node.name}`);
  if (node.name.endsWith('twitter')) {
    return(
      <a href="https://twitter.com/tulsatechfest" target="_blank" rel="noreferrer" key={node.id}><FaTwitter aria-label="Twitter"/></a>
  )} else if (node.name.endsWith('facebook')) {
    return(
      <a href="https://fb.me/e/1CHxlbSR1" target="_blank" rel="noreferrer" key={node.id}><FaFacebook aria-label="Facebook"/></a>
  )} else {
    return (
      <Link className="nav-link" to={node.name === `1-sitetitle` ? `/` : `/${removeSortIndex(node.name)}`} key={node.id}>{node.name === `1-siteTitle` ? `Copyright © ${new Date().getFullYear()} - ${siteTitle}` : toTitleCase(node.name)}</Link>
  )}
}

const FooterNav = ({ siteTitle }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
            allFile (filter: { sourceInstanceName: {eq: "navfooter"}}, sort: {fields: name, order: ASC}) { 
              nodes {
                name
              }
            }
          }
      `}
      render={siteTitle, data => (
        <nav>
          {data.allFile.nodes.map(node => (
            doNode(node, siteTitle)
          ))}
        </nav>
      )}
    />
  )
}

FooterNav.propTypes = {
  siteTitle: PropTypes.string,
}

FooterNav.defaultProps = {
  siteTitle: ``,
}

export default FooterNav

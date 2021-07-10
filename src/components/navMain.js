import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import { getUser, isLoggedIn } from "../services/auth"
// import { GrUserSettings, IoLogin, IoLogOut, IoMegaphone } from 'react-icons/fa';
const { removeSortIndex,toTitleCase } = require('../../lib/str');

const NavMain = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
            allFile (filter: { sourceInstanceName: {eq: "navmain"}}, sort: {fields: name, order: ASC}) { 
              nodes {
                name
              }
            }
          }
      `}
      render={data => (
        <nav>
          {data.allFile.nodes.map(node => (
            <Link className="nav-link" to={`/${removeSortIndex(node.name)}`} key={node.id}>{toTitleCase(node.name)}</Link>
          ))}
        </nav>
      )}
    />
  )
}

export default NavMain

import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import {strMethods} from "../helpers/helpers"

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  
function makeDisplayName(slug){
  slug = slug.replace(/-/gim,' ');
  slug = slug.split(/\//).map((e)=>{return toTitleCase(e)}).join('/');
  return slug;
}

export default (props) => {
  const displayName = makeDisplayName(props.pageContext.slug);
  const children = props.pageContext.meta.children;
  // Compile listings - subdirectories and files
  let listings = [];
  listings = listings.concat(children.dirs.map(function(d){return {
    path: '/' + d.relativePath,
    display: '/' + d.name,
    isDir: true
  }}));
  listings = listings.concat(children.md.map(function(m){return {
    path: m.fields.slug,
    display: m.parent.name,
    isDir: false
  }}));
  return (
    <Layout>
      <SEO title={`${props.pageContext.slug}`} />
      <h1>Generated Index Page - {`${displayName}`}</h1>
      <div className="directoryListingWrapper">
        <div className="directoryListingRow">
          <i className="material-icons">folder</i>
          <Link to={`${document.location.pathname + '/../'}`}>..</Link>
        </div>
        {listings.map((listing)=>{
          return (
            <div className="directoryListingRow" key={`${listing.path + ((new Date()).getTime())}`}>
              <i className="material-icons">{listing.isDir ? 'folder' : 'description'}</i>
              <Link to={`${listing.path}`}>
                {listing.display}
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
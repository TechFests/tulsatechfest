import React from "react"
import { tags } from "../services/tags"

const NavLinks = () => {
  const tagsList = tags.map(tag => <li key={tag}>{tag}</li>)
  return (
<div id="menu" class="padding-sidebar bg-medium shadow-left" data-menu>
  {/* <p class="color-primary margin-top-m margin-bottom-m fst-italic fsi-0-875">{{ pkg.description }}</p> */}
  <nav class="margin-bottom-l" aria-labelledby="nav">
    <h2 class="margin-bottom-s fsi-1-25" id="nav">Links</h2>
    <ol class="nav">
      {tagsList}
    </ol>
  </nav>
</div>
  )
}

export default NavLinks

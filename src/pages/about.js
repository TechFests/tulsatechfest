import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

export const About = () => (
  <Layout>
    <Seo title="About" />
    {/* <h1>About TulsaTechFest 2021</h1> */}
    <p><strong>You do not want to miss the region's largest FREE training conference.</strong></p>

    <p><strong>When: Friday, November 12, 2021!</strong></p>

    <p><strong>Where: <a href="https://www.osu-tulsa.okstate.edu" target="_blank" rel="noreferrer">OSU-Tulsa - 700 N Greenwood Ave, Tulsa, OK 74106</a></strong></p>

    <p><strong>Who Should Attend: Everyone!</strong> (With so many sessions, there is something for everyone.)</p>

    <p>Still got questions? <Link to="/contact">Contact Us</Link></p>
    
    <p>For example, learn how to use Microsoft Office more efficiently in the MS Office track!</p>

    <p>These folks cannot afford to miss it:
      <ul>
        <li>Every IT Professional</li>
        <li>IT Job seekers and IT Recruiters and Hiring Managers</li>
        <li>Developers of all languages</li>
        <li>Graphic and Web Designers</li>
        <li>Infrastructure, IT and System Administrators</li>
        <li>Content, Marketing and Social Media Professionals</li>
        <li>Project Managers</li>
        <li>Compliance Managers</li>
        <li>IT Directors and Managers</li>
        <li>Chief Compliance Officers</li>
        <li>Chief Security Officers</li>
        <li>CIOs/CTOs</li>
        <li>CEOs/Executive Officers</li>
      </ul>
    </p>
    <p>With this many hours of training, anyone wanting to further develop their career will definitely find interesting and instructional presentations by professional speakers.</p>

    {/* <p>Previous events: 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018</p> */}

  </Layout>
)

module.exports = {
  siteMetadata: {
    title: `TulsaTechFest 2021`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@techfests`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,    
    {
      resolve: `gatsby-plugin-breadcrumb`,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tulsatechfest`,
        short_name: `tulsatechfest`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-remark`,    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogs`,
        path: `${__dirname}/content/blogs/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `faq`,
        path: `${__dirname}/content/faq`,
      },
    },        
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `navmain`,
        path: `${__dirname}/content/nav/main/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `navfooter`,
        path: `${__dirname}/content/nav/footer/`,
      },
    }, 
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `navutility`,
        path: `${__dirname}/content/nav/utility/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: 'community',
    //     path: `${__dirname}/content/links/community`,
    //   }
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: 'usergroups',
    //     path: `${__dirname}/content/links/user-groups`,
    //   }
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'links',
        path: `${__dirname}/content/links`,
      }
    }, 
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'speakers',
        path: `${__dirname}/content/speakers`,
      }
    },    
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

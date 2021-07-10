/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
// exports.onCreatePage = async ({ page, actions }) => {
//     const { createPage } = actions
  
//     // page.matchPath is a special key that's used for matching pages
//     // only on the client.
//     if (page.path.match(/^\/app/)) {
//       page.matchPath = "/app/*"
  
//       // Update the page.
//       createPage(page)
//     }
//   }
//replaced with gatsby-plugin-create-client-paths

exports.onCreateWebpackConfig = ({ actions }) => { actions.setWebpackConfig({ node: { fs: 'empty' }, })}

//const { createFilePath, createRemoteFileNode } = require('gatsby-source-filesystem')
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const OWNER_NAME = 'source'

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
  `)
      // featuredImageUrlSharp: File @link(from: "featuredImageUrlSharp___NODE")

  // Logs out all typeDefs
  // actions.printTypeDefinitions({ path: './typeDefs.txt' })
}

const AUTOBUILD_INDEXES = true;

exports.onCreateNode = async ({ node, actions, getNode, store, cache, createNodeId }) => {
  const { createNodeField, createNode } = actions
  if (node.internal.type === 'Mdx' && !node.internal.fieldOwners) {

    let path = source
    const value = createFilePath({ node, getNode })

    if (Array.isArray(source)) {
      path = node.fileAbsolutePath
        .split('/')
        .filter(str => source.includes(str))
        .toString()
    }
    createNodeField({
      node,
      name: `slug`,
      value: path ? `/${path}${value}` : value,
    })
    // a owner and parent node fields to the .mdx sourced from "source"
    createNodeField({
      node,
      name: `owner`,
      value: OWNER_NAME,
    })
    // used as a back link to URL, path is the "source" name
    createNodeField({
      node,
      name: `parent`,
      value: path,
    })

    // https://www.gatsbyjs.com/docs/how-to/images-and-media/preprocessing-external-images/
    if (
      node.frontmatter.featuredImageUrl &&
      node.frontmatter.featuredImageUrl !== undefined
    ) {
      let fileNode = await createRemoteFileNode({
        url: node.frontmatter.featuredImageUrl,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store,
      })

      if (fileNode) {
        node.featuredImageUrlSharp___NODE = fileNode.id
      }
    }

  } else if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    if (node.frontmatter && node.frontmatter.customPageSlug){
      slug = slug.replace((new RegExp(`\\/${fileNode.name}\\/$`)),`/${node.frontmatter.customPageSlug}/`);
    }

    actions.createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { source } = themeOptions
  const { createPage } = actions

  if (!source) return

  const resultMdx = await graphql(`
    query {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: "dummy" }
            navigationLabel: { ne: "dummy" }
            status: { ne: "draft" }
          }
          fields: { owner: { eq: "source" } }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          previous {
            frontmatter {
              title
              status
            }
            fields {
              slug
            }
          }
          next {
            frontmatter {
              title
              status
            }
            fields {
              slug
            }
          }
          node {
            id
            frontmatter {
              title
              navigationLabel
            }
            fields {
              slug
              owner
              parent
            }
          }
        }
      }
    }
  `)

  if (resultMdx.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const data = resultMdx.data.allMdx.edges

  data.forEach(({ node, previous, next }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.join(__dirname, `src/layouts/SourceLayout.js`),
      context: {
        id: node.id,
        prev: index === 0 ? null : previous,
        next: index === data.length - 1 ? null : next,
        // used as back link in SourceLayout
        parent: node.fields.parent,
      },
    })
  })


  let subdirsWithIndexPages = [];
  let subdirIndexesToCreate = [];
  let subdirIndexPages = {};

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
            parent {
              ... on File {
                relativePath
                base
                name
              }
            }
          }
        }
      }
      allDirectory(filter: {sourceInstanceName: {eq: "links"}}, sort: {fields: name, order: ASC}) {
        nodes {
          absolutePath
          base
          relativeDirectory
          relativePath
          name
        }
      }
    }
  `);

  function recordAsChild(subdir, child, isDir){
    subdirIndexPages[subdir] = typeof(subdirIndexPages[subdir])==='object' ? subdirIndexPages[subdir] : {children:{
      dirs: [],
      md: []
    }}
    const target = isDir ? subdirIndexPages[subdir].children.dirs : subdirIndexPages[subdir].children.md;
    target.push(child);
  }
  
  if (result && result.data && result.data.allMarkdownRemark && result.data.allMarkdownRemark.edges) {
    result.data.allMarkdownRemark.edges.forEach(async ({node}) => {
      // Get dir of file
      console.log(`slug:${node.fields.slug}`);
      const subdirAbs = path.dirname(node.fileAbsolutePath);
      // Note that this md file is child of dir
      recordAsChild(subdirAbs,node,false);
      // Create page for file itself
      actions.createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/default.js`),
        context: {
          // Becomes available as GraphQL variables within page queries
          slug: node.fields.slug
        }
      });
    });
    // Iterate over directories that contain MD, and check if they need an index page created
    let directoryIteratorPromise = new Promise((resolve,reject) =>{
      result.data.allDirectory.nodes.forEach(async (node, index, arr)=>{
        const subdirAbs = node.absolutePath;
        const subdirRel = node.relativePath;
        const parentDir = path.posix.dirname(subdirAbs);
        // Note child of dir
        recordAsChild(parentDir,node,true);
        // Create page for subdir that file is in, if it is missing an index page. Skip for homepage ('/'), or top level page (/test.md)
        const alreadyHasIndexPage = (subdirsWithIndexPages.indexOf(subdirAbs)!==-1 || subdirRel === '');
        if (!alreadyHasIndexPage){
          // Check for index.md
          const indexPath = path.posix.join(subdirAbs,'index.md');
          const existResult = await graphql(`
          {
            allMarkdownRemark(filter: {fileAbsolutePath: {eq: "${indexPath}"}}) {
              totalCount
            }
          }`);
          if (existResult.data.allMarkdownRemark.totalCount < 1) {
            console.log(`There is no index for ${indexPath}`);
            subdirIndexesToCreate.push({
              subdirAbs: subdirAbs,
              subdirRel: subdirRel,
              parentDir: parentDir
            });
          }
          subdirsWithIndexPages.push(subdirAbs);
        }
        if (index === arr.length-1) resolve();
      });
    });
    if (AUTOBUILD_INDEXES){
      directoryIteratorPromise.then(()=>{
        console.log('=============== BUILDING SUBDIR INDEX PAGES! ======================');
        for (let x=0; x<subdirIndexesToCreate.length; x++){
          const subdirPaths = subdirIndexesToCreate[x];
          // Create index page!
          console.log(`Create:${subdirPaths.subdirRel}`);
          actions.createPage({
            path: subdirPaths.subdirRel,
            component: path.resolve(`./src/templates/directory-index.js`),
            context: {
              slug: subdirPaths.subdirRel,
              hasIndex: false,
              meta: subdirIndexPages[subdirPaths.subdirAbs]
            }
          });
        }
      });
    }
  }
}

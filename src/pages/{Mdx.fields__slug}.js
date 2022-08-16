import React from "react"
import { graphql } from "gatsby"

export default function Component(props) {
  return (
    <pre>{JSON.stringify(props.data.mdx, null, 2)}</pre>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      tableOfContents
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`

export async function config() {
  const { data } = graphql`
    {
      oldPosts: allMdx(
        filter: {frontmatter: {
          latest: {
            ne: true
          }
        }}
        ) {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `

  const oldPosts = new Set(data.oldPosts.nodes.map(n => n.fields.slug))


  return ({ params }) => {
    return {
      defer: oldPosts.has(`/${params.fields__slug}/`)
    }
  }
}

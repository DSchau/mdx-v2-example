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
        filter: { frontmatter: { date: { lt: "2022-01-01" } } }
      ) {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `

  const oldPosts = new Set(data.oldPosts.nodes.map(n => n.frontmatter.slug))

  return ({ params }) => {
    return {
      defer: oldPosts.has(params.fields.slug)
    }
  }
}

const path = require('path')

module.exports = {
  siteMetadata: {
    title: `mdx-v2-example`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: path.join(__dirname, 'content')
      }
    },
  ],
};

module.exports = {
  siteMetadata: {
    siteUrl: "https://codedisplayuser.com",
    title: "Code Display User",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
        resolve: `gatsby-plugin-s3`,
        options: {
          bucketName: "codedisplayuser.com"
        }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `sketches`,
        path: `${__dirname}/sketches`,
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
  ],
};

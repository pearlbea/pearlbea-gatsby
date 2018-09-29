module.exports = {
  siteMetadata: {
    title: "Pearlbea"
  },
  plugins: [
    {
      resolve: "gatsby-plugin-favicon",
      options: {
        logo: `${__dirname}/src/img/icon.png`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`
      }
    },

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "img",
        path: `${__dirname}/src/img/`
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            maxWidth: 900
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {}
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
  ]
};

import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/layout';
import { SketchItem } from '../../components/sketch-item/sketch-item';
import {sketchGrid} from './index.module.css';
import { getImage } from 'gatsby-plugin-image';

const SketchPage = ({ data }) => {
  console.log(data);
  return (
    <Layout pageTitle="Code Display User">
      <div className={sketchGrid}>
      {
        data.allMdx.edges.map((dir) => (
          <SketchItem
            key={dir.node.id}
            name={dir.node.frontmatter.title}
            image={getImage(dir.node.frontmatter.hero_image)}
            imageAlt={dir.node.frontmatter.hero_image_alt}
            link={`/sketches/${dir.node.parent.relativeDirectory}`}
          />
        ))
      }
      </div>
    </Layout>
  )
}

export const query = graphql`
  query{
    allMdx(filter: {frontmatter: {visible: {eq: true}}}) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            hero_image_alt
            hero_image {
              childImageSharp {
                gatsbyImageData(
                  width: 500
                )
              }
            }
          }
          parent {
            id
            ... on File {
              id
              relativeDirectory
            }
          }
          id
        }
      }
    }
  }
`

export default SketchPage
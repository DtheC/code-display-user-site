import * as React from 'react';
import { graphql } from "gatsby";
import Layout from '../../components/layout';
import { useState } from "react";
import SketchWrapper from '../../components/sketch-wrapper/sketch-wrapper';

const Sketch = ({data}) => {
  const [ sketch, setSketch ] = useState();
  const [ markup, setMarkup ] = useState(data.allMdx.edges.filter(x => x.node.parent.relativeDirectory === data.directory.name));
  import(`../../../sketches/${data.directory.name}/default.js`).then(result => setSketch(result));

  return (
    sketch
      ? <SketchWrapper
          sketch={sketch.default}
          markup={markup}
        />
      : <Layout pageTitle='Code Display User'><div>Loading...</div></Layout>
  )
}

export const query = graphql`
query ($id: String) {
  directory(id: {eq: $id}) {
    id
    name
  }
  allFile(filter: {extension: {eq: "js"}}) {
    edges {
      node {
        id
        publicURL
        relativeDirectory
        name
        relativePath
      }
    }
  }
  allMdx(filter: {frontmatter: {visible: {eq: true}}}) {
    edges {
      node {
        body
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          hero_image_alt
          hero_image {
            childImageSharp {
              gatsbyImageData
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
      }
    }
  }
}
`

export default Sketch

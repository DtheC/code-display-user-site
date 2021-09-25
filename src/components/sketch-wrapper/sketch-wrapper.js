import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import p5 from 'p5';
import Layout from '../layout';
import { sketchContainer } from './sketch-wrapper.module.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const SketchWrapper = ({sketch, markup}) => {
  const sketchRef = useRef()
  useEffect(() => {
    new p5(sketch, sketchRef.current)
  }, [])
  return (
    <Layout pageTitle="Code Display User">
      <h2>{markup[0].node.frontmatter.title}</h2>
      <div className={sketchContainer} ref={sketchRef} />
      <MDXRenderer>
        {markup[0].node.body}
      </MDXRenderer>
    </Layout>
  )
}

SketchWrapper.propTypes = {
  sketch: PropTypes.func.isRequired
}

export default SketchWrapper
import * as React from 'react';
import Layout from '../components/layout';
import {aboutText} from './about.module.scss';

const AboutPage = () => {
  return (
    <Layout pageTitle="Code Display User">
      <div className={aboutText}>
        <p>
          Code Display User contains <a href="https://p5js.org/">p5.js</a> sketches created by <a href="https://denouncetheclock.com"> Travis Cox</a>. This serves as a repository of iterations on specific themes which have interested me at different times. Updated sporadically as the whim takes me.
        </p>

        <p>
          This site is generated using Gatsby. Some code for automatically generating p5.js sketch pages taken from the <a href="https://github.com/doubledherin/gatsby-p5-starter">gatsby-p5-starter</a> created by Wendy Dherin. 
        </p>
      </div>
    </Layout>
  )
}

export default AboutPage

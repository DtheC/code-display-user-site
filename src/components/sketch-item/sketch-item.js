import { Link } from 'gatsby';
import * as React from 'react';
import * as styles from './sketch-item.module.scss';
import { GatsbyImage } from 'gatsby-plugin-image'

const SketchItem = ({image, imageAlt, name, link}) => {
  return (
    <Link to={link} className={styles.sketchTitle}>
      <div className={styles.sketchItem}>
        <GatsbyImage
          image={image}
          alt={imageAlt}
        />
        <h2>{name}</h2>
      </div>
    </Link>
  )
}

export {SketchItem};

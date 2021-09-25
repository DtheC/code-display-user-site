import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { container, internalContainer, heading, navLinks, navLinkItem, navLinkText, siteTitle } from './layout.module.css';
import { DesignLine } from './design-line/design-line';

const Layout = ({ pageTitle, children }) => {
  return (
    <div className={container}>
      <DesignLine />
      <header>
        <h1 className={heading}>{pageTitle}</h1>
        <nav>
            <ul className={navLinks}>
              <li className={navLinkItem}>
                <Link className={navLinkText} to="/">About</Link>
              </li>
              <li className={navLinkItem}>
                <Link to="/sketches" className={navLinkText}>
                  Sketches
                </Link>
              </li>
            </ul>
          </nav>
      </header>
      <div className={internalContainer}>
        <main>
          {children}
        </main>
      </div>
      <footer>
        <DesignLine />
      </footer>
    </div>
  )
}

export default Layout;

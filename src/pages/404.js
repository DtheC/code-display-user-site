import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

// markup
const NotFoundPage = () => {
  return (
    <Layout pageTitle="Whoops">
      <h1 style={headingStyles}>Page not found</h1>
      <Link href="/">Go home</Link>
    </Layout>
  )
}

export default NotFoundPage

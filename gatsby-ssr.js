const React = require("react")

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  headComponents.push(<link rel="preconnect" href="https://fonts.googleapis.com" />);
  headComponents.push(<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />);
  headComponents.push(<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />);
  replaceHeadComponents(headComponents)
}
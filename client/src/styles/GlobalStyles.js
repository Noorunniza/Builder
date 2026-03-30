import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Inter, sans-serif;
}

html {
  width: 100%;
}

body {
  width: 100%;
  min-width: 320px;
  overflow-x: hidden;
  background: #f3f4f6;
}


#root {
  width: 100%;
  min-height: 100vh;
}


img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}
`

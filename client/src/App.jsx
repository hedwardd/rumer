import React from "react";
import { createGlobalStyle } from 'styled-components'
import AppRouter from "./AppRouter.jsx";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
  }
`

const App = () => {
  
  return (
    <div>
      <GlobalStyle />
      <AppRouter />
    </div>
  );
}

export default App;

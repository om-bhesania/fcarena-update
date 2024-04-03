  import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import "./index.css";
import { ChakraProvider } from '@chakra-ui/react'
import { I18nextProvider } from "react-i18next";
import i18n from "./components/translations/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <I18nextProvider i18n={i18n}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
   </I18nextProvider>
  </React.StrictMode>
);

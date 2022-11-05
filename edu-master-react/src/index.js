import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import Appshell from "./components/Appshell/Appshell";
import { BrowserRouter } from "react-router-dom";
import { Global } from "@mantine/core";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import {Provider} from 'react-redux'
import store from "./redux/store";
import { ToastContainer } from 'react-toastify';


function Providers({ children }) {
  return (
    <Provider store={store}>


    <MantineProvider
      theme={{
        colors: { brand: ["#3347B0"] },
        fontFamily: "Segoe UI, Sans-serif",
        headings: { fontFamily: "Segoe UI, Sans-serif" },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Global
        styles={[
          '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap")',
          '@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap")',
        ]}
      />
      <BrowserRouter>{children}</BrowserRouter>
    </MantineProvider>
    </Provider>

  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Providers>
      <Appshell>
      <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
/>
        <App />
      </Appshell>
    </Providers>
  </React.StrictMode>
);

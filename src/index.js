/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { StoreProvider } from './store';
import { PubicRoutes } from './routes'
import { DefaultLayout } from './layout'
import storeRedux  from "storeRedux";

const root = ReactDOM.createRoot(document.getElementById("root"));

storeRedux.subscribe(() => {
  document.title = storeRedux.getState().titlePage;
})

root.render(
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          { 
            PubicRoutes.map((route, index) => {
              let Page = route.component;
              let Layout = DefaultLayout;
              if(route.layout === null) {
                Layout = React.Fragment;
              } else if(route.layout) {
                Layout = route.layout;
              }
              return <Route key={index} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            })
          }
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
);
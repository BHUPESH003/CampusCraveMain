import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  BrowserRouter,
} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "../../Components/Header/Header";
import RenderSplash from "../SplashPage/RenderSplash";
import Footer from "../../Components/Footer/Footer";
const AppLayout = (props) => {
  return (
    <>
      <Suspense fallback={"Loading"}>
        <BrowserRouter>
          
            <Header />
      
          <Routes>
            {AppRoutes.map(
              (appRoute, idx) =>
                appRoute.component && (
                  <Route
                    caseSensitive={false}
                    key={idx}
                    path={`/${appRoute.path}`}
                    element={<appRoute.component />}
                  />
                )
            )}
          </Routes>{" "}
          <Outlet />{" "}
        </BrowserRouter>
        <Footer />
      </Suspense>
      
    </>
  );
};
export default React.memo(AppLayout);

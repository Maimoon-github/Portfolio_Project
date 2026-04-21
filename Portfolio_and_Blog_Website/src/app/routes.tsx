import { createBrowserRouter, Outlet } from "react-router";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CalculatorHub from "./pages/CalculatorHub";
import CalculatorDetail from "./pages/CalculatorDetail";
import NotFound from "./pages/NotFound";

function Root() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#131313",
        fontFamily: "'Space Grotesk', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navigation />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "portfolio", Component: Portfolio },
      { path: "blog", Component: Blog },
      { path: "blog/:slug", Component: BlogPost },
      { path: "calculators", Component: CalculatorHub },
      { path: "calculators/:slug", Component: CalculatorDetail },
      { path: "*", Component: NotFound },
    ],
  },
]);

import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Resume } from "./pages/Resume";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Knowledge } from "./pages/Knowledge";
import Courses from "./pages/Courses";
import ToolsPage from "./pages/Tools/Tools";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "projects", Component: Projects },
      { path: "projects/:slug", Component: ProjectDetail },
      { path: "resume", Component: Resume },
      { path: "courses", Component: Courses },
      { path: "knowledge", Component: Knowledge },
      { path: "tools", Component: ToolsPage },
      { path: "blog", Component: Blog },
      { path: "blog/:slug", Component: BlogPost },
      { path: "contact", Component: Contact },
      { path: "login", Component: Login },
      { path: "*", Component: NotFound },
    ],
  },
]);

import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Resume } from "./pages/Resume";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Knowledge } from "./pages/Knowledge";
import { Courses } from "./pages/Courses";
import ToolsPage from "./pages/Tools/Tools";
import APBioScoreCalculator from "./pages/Tools/ToolsPages/APBioScoreCalculator";
import Apcalcbccalculator from "./pages/Tools/ToolsPages/Apcalcbccalculator";
import Apchemscorecalculator from "./pages/Tools/ToolsPages/Apchemscorecalculator";
import Apphysics1scorecalculator from "./pages/Tools/ToolsPages/Apphysics1scorecalculator";
import Apstatscalculator from "./pages/Tools/ToolsPages/Apstatscalculator";
import Apworldscorecalculator from "./pages/Tools/ToolsPages/Apworldscorecalculator";
import Linearfeetcalculator from "./pages/Tools/ToolsPages/Linearfeetcalculator";
import Pokemoncatchratecalculator from "./pages/Tools/ToolsPages/Pokemoncatchratecalculator";
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
      {
        path: "tools",
        children: [
          { index: true, Component: ToolsPage },
          { path: "ap-bio-calculator", Component: APBioScoreCalculator },
          { path: "ap-calc-bc-calculator", Component: Apcalcbccalculator },
          { path: "ap-chem-calculator", Component: Apchemscorecalculator },
          { path: "ap-physics-1-calculator", Component: Apphysics1scorecalculator },
          { path: "ap-stats-calculator", Component: Apstatscalculator },
          { path: "ap-world-calculator", Component: Apworldscorecalculator },
          { path: "linear-feet-calculator", Component: Linearfeetcalculator },
          { path: "pokemon-catch-rate-calculator", Component: Pokemoncatchratecalculator },
        ]
      },
      { path: "blog", Component: Blog },
      { path: "blog/:slug", Component: BlogPost },
      { path: "contact", Component: Contact },
      { path: "login", Component: Login },
      { path: "*", Component: NotFound },
    ],
  },
]);

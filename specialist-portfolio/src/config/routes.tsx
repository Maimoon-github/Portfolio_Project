// src/config/routes.tsx
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy-load page components
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Resume = lazy(() => import('@/pages/Resume'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Tools = lazy(() => import('@/pages/Tools'));
const Blog = lazy(() => import('@/pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('@/pages/Blog').then(m => ({ default: m.BlogPost })));
const Documentation = lazy(() => import('@/pages/Documentation').then(m => ({ default: m.Documentation })));
const TutorialDetail = lazy(() => import('@/pages/Documentation').then(m => ({ default: m.TutorialTemplate })));
const Contact = lazy(() => import('@/pages/Contact'));
const Colophon = lazy(() => import('@/pages/Colophon'));
const Sitemap = lazy(() => import('@/pages/Sitemap'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  RESUME: '/resume',
  PORTFOLIO: '/work/portfolio',
  PROJECTS: '/work/projects',
  PROJECT_DETAIL: '/work/projects/:slug',
  TOOLS: '/capabilities/tools',
  BLOG: '/mind/blog',
  BLOG_POST: '/mind/blog/:slug',
  DOCUMENTATION: '/mind/docs',
  TUTORIAL_DETAIL: '/mind/docs/:slug',
  CONTACT: '/connect',
  COLOPHON: '/colophon',
  SITEMAP: '/sitemap',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];

export const routes: RouteObject[] = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.ABOUT, element: <About /> },
  { path: ROUTES.RESUME, element: <Resume /> },
  { path: ROUTES.PORTFOLIO, element: <Portfolio /> },
  { path: ROUTES.PROJECTS, element: <Projects /> },
  { path: ROUTES.PROJECT_DETAIL, element: <ProjectDetail /> },
  { path: ROUTES.TOOLS, element: <Tools /> },
  { path: ROUTES.BLOG, element: <Blog /> },
  { path: ROUTES.BLOG_POST, element: <BlogPost /> },
  { path: ROUTES.DOCUMENTATION, element: <Documentation /> },
  { path: ROUTES.TUTORIAL_DETAIL, element: <TutorialDetail /> },
  { path: ROUTES.CONTACT, element: <Contact /> },
  { path: ROUTES.COLOPHON, element: <Colophon /> },
  { path: ROUTES.SITEMAP, element: <Sitemap /> },
  { path: '*', element: <NotFound /> },
];
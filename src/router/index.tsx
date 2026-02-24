import { ComponentType } from "react"
import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "@/components/error-page"
import HeroLayout from "@/layout/hero-layout"
import ToolsLayout from "@/layout/tools-layout"

function lazy<T extends { default: ComponentType<unknown> }>(importer: () => Promise<T>) {
  return async () => {
    const module = await importer()
    return {
      Component: module.default,
    }
  }
}

/**
 * Main application router configuration using React Router v6.
 * Defines all routes and their corresponding components.
 */
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HeroLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          lazy: lazy(() => import("@/page/home")),
        },
        {
          path: "about",
          lazy: lazy(() => import("@/page/about")),
        },
        {
          path: "contact",
          lazy: lazy(() => import("@/page/contact")),
        },
      ],
    },
    {
      path: "/",
      element: <ToolsLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "json-viewer",
          lazy: lazy(() => import("@/page/json-viewer")),
        },
        {
          path: "json-grid",
          lazy: lazy(() => import("@/page/json-grid")),
        },
        {
          path: "bmi-calculator",
          lazy: lazy(() => import("@/page/bmi-calculator")),
        },
      ],
    },
  ],
  {
    basename: "/",
  }
)

export default router

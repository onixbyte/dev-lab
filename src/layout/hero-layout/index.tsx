import { Outlet, Link, useLocation } from "react-router-dom"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import LanguageSwitcher from "@/components/language-switcher"
import Header from "@/components/header"
import Footer from "@/components/footer"

/**
 * Main application component that serves as the root layout.
 * Uses React Router's Outlet to render child routes.
 */
export default function HeroLayout() {
  const today = useMemo(() => dayjs(), [])
  const { t } = useTranslation()

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Navigation Header */}
      <Header></Header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-hidden min-h-0">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer></Footer>
    </div>
  )
}

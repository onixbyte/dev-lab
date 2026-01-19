import { Outlet, Link, useLocation } from "react-router-dom"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import LanguageSwitcher from "@/components/language-switcher"

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
      <header className="bg-white shadow-sm border-b">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                {t("app.title")}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <nav className="flex space-x-8">
                <Link
                  to="/"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t("navigation.home")}
                </Link>
                <Link
                  to="/about"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t("navigation.about")}
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t("navigation.contact")}
                </Link>
              </nav>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-hidden min-h-0">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t shrink-0">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            {t("app.copyright", { year: today.year() })}
          </p>
        </div>
      </footer>
    </div>
  )
}

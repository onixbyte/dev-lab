import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "@/components/language-switcher"

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">{t("app.title")}</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                {t("navigation.home")}
              </Link>
              <Link
                to="/about"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                {t("navigation.about")}
              </Link>
              <Link
                to="/contact"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                {t("navigation.contact")}
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}

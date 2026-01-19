import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

/**
 * Home page component that displays the main landing content.
 */
export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t("home.title")}</h1>
        <p className="mt-4 text-lg text-gray-600">
          {t("home.description")}
        </p>
      </div>

      {/* Main CTA - Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-8 border border-gray-100 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t("home.getStarted")}</h2>
          <p className="text-gray-600 mb-6">
            {t("home.getStartedDescription")}
          </p>
          <Link
            to="/json-viewer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colours font-medium">
            {t("home.openJsonViewer")}
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-8 border border-gray-100 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t("home.getStarted")}</h2>
          <p className="text-gray-600 mb-6">
            {t("home.bmiCalculatorDescription")}
          </p>
          <Link
            to="/bmi-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colours font-medium">
            {t("home.openBmiCalculator")}
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("home.features.tools.title")}</h3>
          <p className="text-gray-600 text-sm">
            {t("home.features.tools.description")}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("home.features.privacy.title")}</h3>
          <p className="text-gray-600 text-sm">
            {t("home.features.privacy.description")}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("home.features.free.title")}</h3>
          <p className="text-gray-600 text-sm">
            {t("home.features.free.description")}
          </p>
        </div>
      </div>
    </div>
  )
}

import { useTranslation } from "react-i18next"

/**
 * Language switcher component that allows users to switch between supported languages.
 */
export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const handleLanguageChange = (language: string) => {
    void i18n.changeLanguage(language)
  }

  const currentLanguage = i18n.language

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
        aria-label={t("language.switch")}>
        <option value="en-GB">{t("language.english")}</option>
        <option value="zh-CN">{t("language.chinese")}</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}

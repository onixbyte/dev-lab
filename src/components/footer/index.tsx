import { useTranslation } from "react-i18next"
import { useMemo } from "react"
import dayjs from "dayjs"

export default function Footer() {
  const { t } = useTranslation()
  const today = useMemo(() => dayjs(), [])

  return (
    <footer className="bg-white border-t shrink-0">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          {t("app.copyright", { year: today.year() })}
        </p>
      </div>
    </footer>
  )
}

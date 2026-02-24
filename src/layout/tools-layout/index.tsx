import { useMemo, useState } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import LanguageSwitcher from "@/components/language-switcher"

export default function ToolsLayout() {
  const today = useMemo(() => dayjs(), [])
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)

  const toolGroups = useMemo(
    () => [
      {
        title: t("navigation.jsonProcessing"),
        items: [
          { to: "/json-viewer", label: t("home.jsonViewer"), shortLabel: "JV" },
          { to: "/json-grid", label: t("home.jsonGrid"), shortLabel: "JG" },
        ],
      },
      {
        title: t("navigation.dailyTools"),
        items: [{ to: "/bmi-calculator", label: t("home.bmiCalculator"), shortLabel: "BMI" }],
      },
    ],
    [t]
  )

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
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

      <main className="flex-1 p-4 overflow-hidden min-h-0">
        <div className="h-full flex gap-4 overflow-hidden">
          <aside
            className={`bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col transition-all duration-200 ${
              collapsed ? "w-16" : "w-56"
            }`}
          >
            <div className="px-3 py-3 border-b border-slate-200 flex items-center justify-between">
              {!collapsed && (
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("navigation.tools")}
                </span>
              )}
              <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                className="w-8 h-8 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colours text-sm"
                aria-label={
                  collapsed ? t("navigation.expandToolsMenu") : t("navigation.collapseToolsMenu")
                }
              >
                {collapsed ? "»" : "«"}
              </button>
            </div>

            <nav className="p-2 flex-1 overflow-auto">
              {toolGroups.map((group) => (
                <div key={group.title} className="mb-3 last:mb-0">
                  {!collapsed && (
                    <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {group.title}
                    </div>
                  )}
                  {group.items.map((tool) => (
                    <NavLink
                      key={tool.to}
                      to={tool.to}
                      className={({ isActive }) =>
                        `w-full flex items-center ${collapsed ? "justify-center" : "justify-start"} rounded-lg px-3 py-2 text-sm font-medium mb-1 transition-colours ${
                          isActive
                            ? "bg-indigo-100 text-indigo-700"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`
                      }
                      title={collapsed ? `${group.title} · ${tool.label}` : tool.label}
                    >
                      {collapsed ? tool.shortLabel : tool.label}
                    </NavLink>
                  ))}
                </div>
              ))}
            </nav>
          </aside>

          <section className="flex-1 overflow-hidden min-h-0">
            <Outlet />
          </section>
        </div>
      </main>

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

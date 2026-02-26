import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import Seo from "@/components/seo"

type ChangeTypeKey = "feat" | "fix" | "refactor" | "chore"

interface ChangeEntry {
  type: ChangeTypeKey
  title: string
  description?: string
  date?: string
}

interface ChangelogVersion {
  version: string
  date: string
  entries: ChangeEntry[]
}

const CHANGELOG_DATA: ChangelogVersion[] = [
  {
    version: "1.1.1",
    date: "2026-02-24",
    entries: [
      {
        type: "feat",
        title: "JSON Path Highlighting",
        description: "Add highlighting for JSON Path expression."
      }
    ]
  },
  {
    version: "1.1.0",
    date: "2026-02-24",
    entries: [
      {
        type: "feat",
        title: "JSON Grid",
        description: "Convert JSON arrays into sortable table view with CSV export functionality"
      },
      {
        type: "feat",
        title: "Tools Layout with Collapsible Menu",
        description: "Added a dedicated tools layout with categorised sidebar menu for quick tool switching",
      },
      {
        type: "feat",
        title: "Copy Selected JSON Feature",
        description: "Added ability to copy JSONPath selected data as raw JSON with one-click action",
      },
      {
        type: "feat",
        title: "Tool Categories",
        description: "Organised tools into JSON Processing (JSON Viewer, JSON Grid) and Daily Tools (BMI Calculator)",
      },
      {
        type: "fix",
        title: "Live Application Link",
        description: "Updated live application link in README",
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-01-19",
    entries: [
      {
        type: "feat",
        title: "JSON Viewer with JSONPath",
        description: "Full-featured JSON viewer with JSONPath query support and CSV export",
      },
      {
        type: "feat",
        title: "BMI Calculator",
        description: "Calculate Body Mass Index with category guidance and health advice",
      },
      {
        type: "feat",
        title: "Internationalization",
        description: "Support for English (GB) and Simplified Chinese with language switcher",
      },
    ],
  },
]

export default function Changelog() {
  const { t } = useTranslation()

  const changeTypeLabels = useMemo(() => {
    const labels: Record<ChangeTypeKey, { label: string; colour: string }> = {
      feat: { label: t("changelog.featureType"), colour: "bg-emerald-100 text-emerald-700" },
      fix: { label: t("changelog.fixType"), colour: "bg-blue-100 text-blue-700" },
      refactor: { label: t("changelog.refactorType"), colour: "bg-purple-100 text-purple-700" },
      chore: { label: t("changelog.choreType"), colour: "bg-slate-100 text-slate-700" },
    }
    return labels
  }, [t])

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title={t("seo.changelog.title")}
        description={t("seo.changelog.description")}
        path="/changelog"
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">{t("changelog.title")}</h1>
          <p className="mt-2 text-lg text-gray-600">{t("changelog.description")}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {CHANGELOG_DATA.map((changelog) => (
            <div key={changelog.version} className="relative">
              {/* Version header */}
              <div className="flex items-baseline gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">v{changelog.version}</h2>
                <time className="text-sm text-gray-500">{changelog.date}</time>
              </div>

              {/* Changes list */}
              <div className="space-y-4">
                {changelog.entries.map((entry, idx) => {
                  const typeInfo = changeTypeLabels[entry.type as ChangeTypeKey]
                  return (
                    <div key={`${changelog.version}-${idx}`} className="bg-white rounded-lg border border-slate-200 p-4">
                      <div className="flex items-start gap-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold ${typeInfo.colour}`}>
                          {typeInfo.label}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900">{entry.title}</h3>
                          {entry.description && (
                            <p className="mt-1 text-sm text-gray-600">{entry.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

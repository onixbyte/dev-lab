import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

type RowRecord = Record<string, unknown>

export default function JsonGrid() {
  const { t } = useTranslation()

  const initialData = [
    { id: 1, name: "Alice", role: "Developer", active: true },
    { id: 2, name: "Bob", role: "Designer", active: false },
    { id: 3, name: "Charlie", role: "Product Manager", active: true },
  ]

  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(initialData, null, 2))

  const result = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonInput)

      if (!Array.isArray(parsed)) {
        return { rows: [] as RowRecord[], columns: [] as string[], error: t("jsonTable.arrayOnlyError") }
      }

      const rows: RowRecord[] = parsed.map((item) => {
        if (item !== null && typeof item === "object" && !Array.isArray(item)) {
          return item as RowRecord
        }
        return { value: item }
      })

      const columns = Array.from(new Set(rows.flatMap((row) => Object.keys(row))))

      return { rows, columns, error: null }
    } catch (e) {
      return {
        rows: [] as RowRecord[],
        columns: [] as string[],
        error: `${t("jsonTable.parseError")} ${(e as Error).message}`,
      }
    }
  }, [jsonInput, t])

  const formatCell = (value: unknown): string => {
    if (value === null || value === undefined) return ""
    if (typeof value === "object") return JSON.stringify(value)
    return String(value)
  }

  const exportCsv = useCallback(() => {
    if (result.error || result.rows.length === 0 || result.columns.length === 0) return

    const escapeCsv = (value: string) => {
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }

    const header = result.columns.map(escapeCsv).join(",")
    const lines = result.rows.map((row) =>
      result.columns
        .map((column) => escapeCsv(formatCell(row[column])))
        .join(",")
    )
    const csvContent = [header, ...lines].join("\n")

    const blob = new Blob([`\uFEFF${csvContent}`], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "json-table.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [result, formatCell])

  return (
    <div className="h-full flex gap-4 overflow-hidden">
      <div className="w-[35%] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-0">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {t("jsonTable.jsonInput")}
          </span>
        </div>
        <textarea
          className="flex-1 w-full p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none overflow-auto"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          spellCheck={false}
        />
      </div>

      <div className="w-[65%] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-0">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {t("jsonTable.tableResult")}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
              {result.rows.length} {t("jsonTable.rows")}
            </span>
            <button
              onClick={exportCsv}
              disabled={!!result.error || result.rows.length === 0 || result.columns.length === 0}
              className="text-xs font-medium px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colours"
            >
              {t("jsonTable.exportCsv")}
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-auto min-h-0">
          {result.error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-sm">
              {result.error}
            </div>
          ) : result.rows.length === 0 ? (
            <div className="text-slate-500 text-sm">{t("jsonTable.empty")}</div>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {result.columns.map((column) => (
                    <th
                      key={column}
                      className="text-left font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-2"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, index) => (
                  <tr key={index} className="odd:bg-white even:bg-slate-50">
                    {result.columns.map((column) => (
                      <td key={column} className="border border-slate-200 px-3 py-2 align-top text-slate-700">
                        {formatCell(row[column])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

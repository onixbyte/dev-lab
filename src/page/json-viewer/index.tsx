import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import jp from "jsonpath"
import JsonTreeNode from "@/components/json-tree-node"
import JsonCodeEditor from "@/components/json-code-editor"
import Seo from "@/components/seo"

const jsonPathTokenRegex = /(\$)|(\.\.)|(\.)|(\[\*\])|(\[\d+\])|(\[(?:'[^']*'|"[^"]*")\])|(\*)|(@)|(\?)|(\(|\))|([A-Za-z_][\w-]*)/g

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function getJsonPathTokenClass(token: string): string {
  if (token === "$" || token === "@") return "text-indigo-600"
  if (token === "." || token === "..") return "text-slate-400"
  if (token === "*" || token === "[*]") return "text-violet-600"
  if (token.startsWith("[") && token.endsWith("]")) return "text-amber-600"
  if (token === "?" || token === "(" || token === ")") return "text-rose-600"
  return "text-emerald-600"
}

function highlightJsonPath(input: string): string {
  if (!input) return " "

  let result = ""
  let lastIndex = 0

  for (const match of input.matchAll(jsonPathTokenRegex)) {
    const token = match[0]
    const index = match.index ?? 0

    result += escapeHtml(input.slice(lastIndex, index))
    result += `<span class="${getJsonPathTokenClass(token)}">${escapeHtml(token)}</span>`
    lastIndex = index + token.length
  }

  result += escapeHtml(input.slice(lastIndex))
  return result
}

/**
 * JSON Viewer page component that displays the JSON visualisation tool in DevLab.
 */
export default function JsonViewer() {
  const { t } = useTranslation()
  const initialData = {
    centre_id: "LON-01",
    location: "London",
    is_active: true,
    staff_members: [
      { id: 100, name: "TTY", roles: ["CEO"] },
      { id: 101, name: "Alice", roles: ["Admin", "Manager"] },
      { id: 102, name: "Bob", roles: ["Developer"] },
    ],
    config: {
      colour_scheme: "Dark Mode",
      retention_days: 30,
    },
  }

  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(initialData, null, 2))
  const [query, setQuery] = useState<string>("$.staff_members[*].name")
  const [copiedCsv, setCopiedCsv] = useState(false)
  const [copiedRawJson, setCopiedRawJson] = useState(false)
  const highlightedQuery = useMemo(() => highlightJsonPath(query), [query])

  const isPlainObject = (value: unknown): value is Record<string, unknown> => {
    return value !== null && typeof value === "object" && !Array.isArray(value)
  }

  // Compute matching results
  const result = useMemo(() => {
    let parsed
    try {
      parsed = JSON.parse(jsonInput)
    } catch (e) {
      return {
        parsed: null,
        matchedPaths: [],
        matchedValues: [],
        error: (e as Error).message,
        queryError: null,
      }
    }

    try {
      const nodes = jp.nodes(parsed, query)
      return {
        parsed,
        matchedPaths: nodes.map((n) => jp.stringify(n.path)),
        matchedValues: nodes.map((n) => n.value),
        error: null,
        queryError: null,
      }
    } catch (e) {
      // When JSONPath expression is invalid, still display the JSON tree but with no matches
      return {
        parsed,
        matchedPaths: [],
        matchedValues: [],
        error: null,
        queryError: (e as Error).message,
      }
    }
  }, [jsonInput, query])

  // Copy as CSV
  const copyAsCsv = useCallback(() => {
    if (result.matchedValues.length === 0) return

    const escapeCsvValue = (val: unknown): string => {
      const str = typeof val === "object" ? JSON.stringify(val) : String(val)
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }

    const objectMatches = result.matchedValues.filter(isPlainObject)
    const isObjectTable =
      objectMatches.length > 0 && objectMatches.length === result.matchedValues.length

    const csv = isObjectTable
      ? (() => {
          const columns = Array.from(new Set(objectMatches.flatMap((item) => Object.keys(item))))
          const headerRow = columns.map(escapeCsvValue).join(",")
          const valueRows = objectMatches.map((item) =>
            columns.map((column) => escapeCsvValue(item[column])).join(",")
          )
          return [headerRow, ...valueRows].join("\n")
        })()
      : (() => {
          const header = query
          const rows = result.matchedValues.map(escapeCsvValue)
          return [header, ...rows].join("\n")
        })()

    navigator.clipboard.writeText(csv).then(() => {
      setCopiedCsv(true)
      setTimeout(() => setCopiedCsv(false), 2000)
    })
  }, [query, result.matchedValues])

  const copySelectedRawJson = useCallback(() => {
    if (result.matchedValues.length === 0) return

    const payload =
      result.matchedValues.length === 1 ? result.matchedValues[0] : result.matchedValues
    const json = JSON.stringify(payload, null, 2)

    navigator.clipboard.writeText(json).then(() => {
      setCopiedRawJson(true)
      setTimeout(() => setCopiedRawJson(false), 2000)
    })
  }, [result.matchedValues])

  return (
    <div className="h-full flex gap-4 overflow-hidden">
      <Seo
        title={t("seo.jsonViewer.title")}
        description={t("seo.jsonViewer.description")}
        path="/json-viewer"
      />
      {/* Left panel - 30% */}
      <div className="w-[30%] flex flex-col gap-4 min-h-0">
        {/* JSON Source - fills remaining height */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-0">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 shrink-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t("jsonViewer.jsonSource")}
            </span>
          </div>
          <JsonCodeEditor value={jsonInput} onChange={setJsonInput} />
        </div>

        {/* JSONPath Expression - fixed height */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 shrink-0">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="text-slate-500">{t("jsonViewer.jsonPathExpression")}</span>
            {result.queryError && (
              <span className="text-red-500 normal-case">{t("jsonViewer.invalidSyntax")}</span>
            )}
          </label>
          <div
            className={`relative w-full border rounded-lg transition-all shadow-sm ${
              result.queryError
                ? "border-red-300 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500"
                : "border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500"
            }`}
          >
            <pre
              aria-hidden
              className="m-0 p-3 font-mono text-sm leading-6 whitespace-pre overflow-hidden pointer-events-none"
            >
              <code dangerouslySetInnerHTML={{ __html: highlightedQuery }} />
            </pre>
            <input
              type="text"
              className="absolute inset-0 w-full h-full p-3 font-mono text-sm leading-6 bg-transparent text-transparent caret-slate-900 outline-none placeholder:text-slate-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("jsonViewer.placeholder")}
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      {/* Right visualisation panel - 70% */}
      <div className="w-[70%] bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden min-h-0">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {t("jsonViewer.visualisedResult")}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
              {result.matchedPaths.length} {t("jsonViewer.matches")}
            </span>
            <button
              onClick={copySelectedRawJson}
              disabled={result.matchedValues.length === 0 || !!result.error}
              className="text-xs font-medium px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colours">
              {copiedRawJson ? t("jsonViewer.copied") : t("jsonViewer.copyRawJson")}
            </button>
            <button
              onClick={copyAsCsv}
              disabled={result.matchedValues.length === 0 || !!result.error}
              className="text-xs font-medium px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colours">
              {copiedCsv ? t("jsonViewer.copied") : t("jsonViewer.copyAsCsv")}
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto font-mono text-sm leading-relaxed min-h-0">
          {result.error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-xs mb-4">
              <strong>{t("jsonViewer.error")}</strong> {result.error}
            </div>
          )}
          {result.parsed && (
            <JsonTreeNode data={result.parsed} path={["$"]} matchedPaths={result.matchedPaths} />
          )}
        </div>
      </div>
    </div>
  )
}

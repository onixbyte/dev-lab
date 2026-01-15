import { useCallback, useMemo, useState } from "react"
import jp from "jsonpath"
import JsonTreeNode from "@/components/json-tree-node"

/**
 * Home page component that displays the main landing content.
 */
export default function Home() {
  const initialData = {
    centre_id: "LON-01",
    location: "London",
    is_active: true,
    staff_members: [
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
  const [copied, setCopied] = useState(false)

  // 计算匹配结果
  const result = useMemo(() => {
    let parsed
    try {
      parsed = JSON.parse(jsonInput)
    } catch (e) {
      return { parsed: null, matchedPaths: [], matchedValues: [], error: (e as Error).message, queryError: null }
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
      // JSONPath 表达式无效时，仍显示 JSON 树，但无匹配
      return { parsed, matchedPaths: [], matchedValues: [], error: null, queryError: (e as Error).message }
    }
  }, [jsonInput, query])

  // 复制为 CSV
  const copyAsCsv = useCallback(() => {
    if (result.matchedValues.length === 0) return

    const escapeCsvValue = (val: unknown): string => {
      const str = typeof val === "object" ? JSON.stringify(val) : String(val)
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }

    const header = query
    const rows = result.matchedValues.map(escapeCsvValue)
    const csv = [header, ...rows].join("\n")

    navigator.clipboard.writeText(csv).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [query, result.matchedValues])

  return (
    <div className="h-full flex gap-4">
      {/* 左侧输入面板 - 40% */}
      <div className="w-2/5 flex flex-col gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              JSON Source
            </span>
          </div>
          <textarea
            className="flex-1 w-full p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="text-slate-500">JSONPath Expression</span>
            {result.queryError && (
              <span className="text-red-500 normal-case">— Invalid syntax</span>
            )}
          </label>
          <input
            type="text"
            className={`w-full p-3 font-mono text-sm border rounded-lg focus:ring-2 outline-none transition-all shadow-sm ${
              result.queryError
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-slate-200 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. $..roles"
          />
        </div>
      </div>

      {/* 右侧可视化面板 - 60% */}
      <div className="w-3/5 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Visualised Result
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
              {result.matchedPaths.length} matches
            </span>
            <button
              onClick={copyAsCsv}
              disabled={result.matchedValues.length === 0 || !!result.error}
              className="text-xs font-medium px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colours"
            >
              {copied ? "Copied!" : "Copy as CSV"}
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto font-mono text-sm leading-relaxed">
          {result.error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-xs">
              <strong>Error:</strong> {result.error}
            </div>
          ) : (
            <JsonTreeNode
              data={result.parsed}
              path={["$"]}
              matchedPaths={result.matchedPaths}
            />
          )}
        </div>
      </div>
    </div>
  )
}

import { useMemo, useState } from "react"
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

  // 计算匹配结果
  const result = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonInput)
      const nodes = jp.nodes(parsed, query)
      return {
        parsed,
        matchedPaths: nodes.map((n) => jp.stringify(n.path)),
        error: null,
      }
    } catch (e) {
      return { parsed: null, matchedPaths: [], error: (e as Error).message }
    }
  }, [jsonInput, query])

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            TypeScript JSONPath Explorer
          </h1>
          <p className="text-slate-500 text-sm">
            Debug and visualises your JSONPath queries with real-time highlighting.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 控制面板 */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  JSON Source
                </span>
              </div>
              <textarea
                className="w-full h-100 p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                spellCheck={false}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                JSONPath Expression
              </label>
              <input
                type="text"
                className="w-full p-3 font-mono text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. $..roles"
              />
            </div>
          </div>

          {/* 可视化面板 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Visualised Result
              </span>
              <span className="text-xs font-medium px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                {result.matchedPaths.length} matches
              </span>
            </div>

            <div className="p-6 overflow-auto max-h-[580px] font-mono text-sm leading-relaxed">
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
      </div>
    </div>
  )
}

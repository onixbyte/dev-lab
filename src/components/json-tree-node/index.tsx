import { useMemo, useState } from "react"
import jp, { PathComponent } from "jsonpath"
import _ from "lodash"

export interface JsonTreeNodeProps {
  data: unknown
  path: PathComponent[]
  matchedPaths: string[]
  defaultExpanded?: boolean
}

export default function JsonTreeNode({ data, path, matchedPaths, defaultExpanded = true }: JsonTreeNodeProps) {
  const currentPathString = useMemo(() => jp.stringify(path), [path])
  const isMatched = matchedPaths.includes(currentPathString)
  const [expanded, setExpanded] = useState(defaultExpanded)

  const highlightClass = isMatched ? "bg-yellow-200 ring-2 ring-yellow-400 rounded-sm" : ""

  if (_.isObject(data) && data != null) {
    const isArray = Array.isArray(data)
    const entries = Object.entries(data)

    return (
      <div className="ml-6 border-l border-slate-200 pl-3 transition-all">
        <span
          className="text-slate-500 cursor-pointer select-none hover:text-slate-700"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="inline-block w-4 text-xs">{expanded ? "▼" : "▶"}</span>
          {isArray ? "[" : "{"}
          {!expanded && <span className="text-slate-400">…{entries.length} items</span>}
          {!expanded && <span>{isArray ? "]" : "}"}</span>}
        </span>
        {expanded && (
          <>
            {entries.map(([key, value], index) => {
              const nextPath = [...path, isArray ? Number(key) : key]

              return (
                <div key={key} className="my-1">
                  {!isArray && <span className="text-indigo-600 font-medium">"{key}": </span>}
                  <JsonTreeNode data={value} path={nextPath} matchedPaths={matchedPaths} />
                  {index < entries.length - 1 && <span className="text-slate-400">,</span>}
                </div>
              )
            })}
            <span className="text-slate-500">{isArray ? "]" : "}"}</span>
          </>
        )}
      </div>
    )
  }

  const renderValue = () => {
    if (typeof data === "string") return <span className="text-emerald-600">"{data}"</span>
    if (typeof data === "number") return <span className="text-blue-600">{data}</span>
    if (typeof data === "boolean") return <span className="text-orange-600">{String(data)}</span>
    return <span className="text-gray-400">null</span>
  }

  return (
    <span className={`inline-block px-1 transition-colors duration-200 ${highlightClass}`}>
      {renderValue()}
    </span>
  )
}

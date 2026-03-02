import React, { useMemo, useRef } from "react"

type JsonCodeEditorProps = {
  value: string
  onChange: (value: string) => void
}

const tokenRegex = /"(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"\s*:?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function getTokenClass(token: string): string {
  if (token.startsWith('"')) {
    return token.endsWith(":") ? "text-indigo-600" : "text-emerald-600"
  }
  if (token === "true" || token === "false") {
    return "text-violet-600"
  }
  if (token === "null") {
    return "text-slate-500 italic"
  }
  return "text-amber-600"
}

function highlightJson(input: string): string {
  let result = ""
  let lastIndex = 0

  for (const match of input.matchAll(tokenRegex)) {
    const token = match[0]
    const index = match.index ?? 0

    result += escapeHtml(input.slice(lastIndex, index))
    result += `<span class="${getTokenClass(token)}">${escapeHtml(token)}</span>`
    lastIndex = index + token.length
  }

  result += escapeHtml(input.slice(lastIndex))
  return result || " "
}

export default function JsonCodeEditor({ value, onChange }: JsonCodeEditorProps) {
  const highlighted = useMemo(() => highlightJson(value), [value])
  const preRef = useRef<HTMLPreElement>(null)

  const syncScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    if (!preRef.current) return
    preRef.current.scrollTop = event.currentTarget.scrollTop
    preRef.current.scrollLeft = event.currentTarget.scrollLeft
  }

  return (
    <div className="relative flex-1 min-h-0">
      <pre
        ref={preRef}
        aria-hidden
        className="absolute inset-0 m-0 p-4 font-mono text-sm leading-6 overflow-auto whitespace-pre-wrap wrap-break-word"
      >
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
      <textarea
        className="absolute inset-0 w-full h-full p-4 font-mono text-sm leading-6 resize-none overflow-auto bg-transparent text-transparent caret-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        spellCheck={false}
      />
    </div>
  )
}

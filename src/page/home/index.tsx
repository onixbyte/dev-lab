import { Link } from "react-router-dom"

/**
 * Home page component that displays the main landing content.
 */
export default function Home() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">DevLab</h1>
        <p className="mt-4 text-lg text-gray-600">
          A powerful, privacy-focused tool for debugging and visualising complex JSON data
          structures.
        </p>
      </div>

      {/* Main CTA */}
      <div className="bg-white shadow rounded-lg p-8 border border-gray-100 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Started</h2>
        <p className="text-gray-600 mb-6">
          Start visualising and querying your JSON data with our intuitive JSONPath-based tool.
        </p>
        <Link
          to="/json-viewer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colours font-medium">
          Open JSON Viewer
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">🔍 JSONPath Queries</h3>
          <p className="text-gray-600 text-sm">
            Use powerful JSONPath expressions to query and filter your JSON data structures.
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">🎨 Visual Highlighting</h3>
          <p className="text-gray-600 text-sm">
            See matching paths highlighted in real-time as you type your queries.
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">🔒 Privacy First</h3>
          <p className="text-gray-600 text-sm">
            All processing happens locally in your browser. No data is ever sent to servers.
          </p>
        </div>
      </div>
    </div>
  )
}

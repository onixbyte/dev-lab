/**
 * About page component that displays information about the JSON Visualiser application.
 */
export default function About() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">About JSON Visualiser</h1>
        <p className="mt-4 text-lg text-gray-600">
          A powerful, privacy-focused tool for debugging and visualising complex JSON data
          structures.
        </p>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Technology Stack */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🛠️</span> Technology Stack
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                <strong>React 19 & TS</strong> - Type-safe UI components
              </span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                <strong>jsonpath</strong> - Robust query engine for data extraction
              </span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                <strong>Tailwind CSS</strong> - Modern, responsive styling
              </span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                <strong>Vite</strong> - Optimised build pipeline and dev experience
              </span>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🚀</span> Key Features
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                Interactive <strong>collapsible</strong> tree navigation
              </span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-700">
                Real-time JSONPath field <strong>highlighting</strong>
              </span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-700">One-click copy for matched results</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-700">Zero-latency local processing</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Privacy Commitment */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 text-indigo-900">
        <h2 className="text-xl font-semibold mb-3 flex items-center">
          <span className="mr-2">🔒</span> Privacy & Data Security
        </h2>
        <p className="leading-relaxed">
          We believe that your data belongs to you. This application is designed as a{" "}
          <strong>purely client-side tool</strong>. All JSON parsing, path evaluation, and visual
          rendering are performed locally within your browser. No data is ever uploaded to any
          server, ensuring that sensitive configuration or user data remains entirely private.
        </p>
      </div>

      {/* Architecture Overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🏗️</span> Architecture Overview
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">
            The application follows a modular React architecture focused on performance and
            maintainability:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              <strong>Recursive Renderer:</strong> A high-performance component tree that handles
              massive JSON objects without blocking the main thread.
            </li>
            <li>
              <strong>JSONPath Integration:</strong> Standardised path evaluation using the{" "}
              <code>jsonpath</code> library, ensuring cross-platform query compatibility.
            </li>
            <li>
              <strong>State Management:</strong> Efficient use of React hooks and useMemo to ensure
              real-time UI updates during text entry.
            </li>
          </ul>
          <p>
            Hosted on Vercel, this visualiser leverages modern edge deployment whilst strictly
            adhering to the local-first data processing principle.
          </p>
        </div>
      </div>
    </div>
  )
}

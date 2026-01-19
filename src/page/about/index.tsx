/**
 * About page component that displays information about the DevLab application.
 */
export default function About() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">About DevLab</h1>
        <p className="mt-4 text-lg text-gray-600">
          A powerful, privacy-focused tool for debugging and visualising complex JSON data
          structures.
        </p>
      </div>

      {/* GitHub & Deployment */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📦</span> Open Source & Deployment
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            This project is open source and available on GitHub. You can view the source code,
            contribute, or deploy your own instance.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/onixbyte/json-visualiser"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colours font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View on GitHub
            </a>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-900">
              <strong>⭐ Star us on GitHub:</strong> If you find this project helpful, we'd greatly
              appreciate it if you could give us a star on GitHub. It helps others discover the
              project and motivates us to keep improving!
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
            <p className="text-blue-900">
              <strong>💡 Self-Hosting:</strong> You can deploy this application yourself! The
              repository includes all necessary configuration files. Simply clone the repository,
              install dependencies, and deploy to your preferred hosting platform (Vercel, Netlify,
              or any static hosting service).
            </p>
          </div>
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
    </div>
  )
}

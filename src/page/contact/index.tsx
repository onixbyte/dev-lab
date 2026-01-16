import React from "react"

/**
 * Contact page component that encourages manual GitHub Issue submission.
 */
export default function Contact() {
  const owner = "onixbyte"
  const repo = "json-visualiser"

  const handleRedirect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const subject = formData.get("subject") as string
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string
    const type = formData.get("type") as string

    // Construct a professional body template for the GitHub issue
    const issueBody = `
### Description
${message}

---
*Generated via JSON Visualiser Contact Page*
    `.trim()

    const githubUrl = `https://github.com/${owner}/${repo}/issues/new?title=${encodeURIComponent(
      `[${type == "help wanted" ? "General Enquiry" : (type == "enhancement" ? "Feature request" : "Bug")}] ${subject}`
    )}&body=${encodeURIComponent(issueBody)}&labels=${type}`

    // Open in a new tab so they don't lose their place on your site
    window.open(githubUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Get in Touch</h1>
        <p className="mt-4 text-lg text-gray-600">
          The best way to reach us is via our GitHub repository.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Side: Information */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">🤝</span> Why GitHub Issues?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use GitHub to track all bug reports and feature requests. This ensures our
              development process remains **transparent** and that your feedback is properly
              prioritised by the community.
            </p>
          </section>

          <section className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
            <h3 className="text-blue-900 font-bold mb-2">How it works:</h3>
            <ol className="list-decimal list-inside text-blue-800 text-sm space-y-2">
              <li>Fill in the enquiry details in the form provided.</li>
              <li>
                Click <strong>"Prepare GitHub Issue"</strong>.
              </li>
              <li>You will be redirected to GitHub with the data pre-filled.</li>
              <li>
                Simply hit <strong>"Submit new issue"</strong> on their site.
              </li>
            </ol>
          </section>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 italic">
              Alternatively, you can email us directly at: <br />
              <a
                href="mailto:real@zihluwang.me"
                className="text-blue-600 font-medium hover:underline">
                real@zihluwang.me
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white shadow-xl shadow-gray-200/50 border border-gray-100 rounded-2xl p-8">
          <form onSubmit={handleRedirect} className="space-y-5">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="Bug report / Feature request"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Enquiry Type
              </label>
              <div className="relative group">
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full appearance-none px-4 py-3  bg-gray-50 border border-gray-200 rounded-xl  text-gray-700 text-sm cursor-pointer transition-all duration-200 hover:border-gray-300 hover:bg-gray-100/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none">
                  <option value="help wanted">General Enquiry</option>
                  <option value="enhancement">Feature Request</option>
                  <option value="bug">Bug</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 group-hover:text-gray-600 transition-colors">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 ml-1 text-[11px] text-gray-400">
                Selecting a type helps us categorise and prioritise your issue.
              </p>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all resize-none"
                placeholder="Describe your enquiry here..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-white font-bold bg-gray-900 hover:bg-gray-800 transition-all shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.297 24 12.017c0-6.627-5.373-12-12-12" />
              </svg>
              Prepare GitHub Issue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

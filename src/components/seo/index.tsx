import { useEffect } from "react"
import { useTranslation } from "react-i18next"

type SeoProps = {
  title: string
  description: string
  path: string
}

const SITE_URL = import.meta.env.VITE_SEO_SITE_URL
const DEFAULT_IMAGE = `${SITE_URL}/onixbyte.svg`

function setMetaTag(selector: string, attr: string, value: string) {
  let element = document.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement("meta")
    const [key, keyValue] = selector.replace("meta[", "").replace("]", "").split("=")
    element.setAttribute(key, keyValue.replace(/"/g, ""))
    document.head.appendChild(element)
  }
  element.setAttribute(attr, value)
}

function setLink(rel: string, href: string) {
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement("link")
    element.rel = rel
    document.head.appendChild(element)
  }
  element.href = href
}

function setJsonLd(id: string, payload: Record<string, unknown>) {
  let element = document.querySelector<HTMLScriptElement>(`script[data-seo="${id}"]`)
  if (!element) {
    element = document.createElement("script")
    element.type = "application/ld+json"
    element.setAttribute("data-seo", id)
    document.head.appendChild(element)
  }
  element.text = JSON.stringify(payload)
}

export default function Seo({ title, description, path }: SeoProps) {
  const { i18n } = useTranslation()
  const url = `${SITE_URL}${path}`
  const locale = i18n.language === "zh" ? "zh-CN" : "en-GB"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "DevLab",
      url: SITE_URL,
    },
  }

  useEffect(() => {
    document.title = title
    setMetaTag("meta[name=\"title\"]", "content", title)
    setMetaTag("meta[name=\"description\"]", "content", description)
    setLink("canonical", url)

    setMetaTag("meta[property=\"og:type\"]", "content", "website")
    setMetaTag("meta[property=\"og:url\"]", "content", url)
    setMetaTag("meta[property=\"og:title\"]", "content", title)
    setMetaTag("meta[property=\"og:description\"]", "content", description)
    setMetaTag("meta[property=\"og:image\"]", "content", DEFAULT_IMAGE)
    setMetaTag("meta[property=\"og:locale\"]", "content", locale)
    setMetaTag("meta[property=\"og:site_name\"]", "content", "DevLab")

    setMetaTag("meta[property=\"twitter:card\"]", "content", "summary_large_image")
    setMetaTag("meta[property=\"twitter:url\"]", "content", url)
    setMetaTag("meta[property=\"twitter:title\"]", "content", title)
    setMetaTag("meta[property=\"twitter:description\"]", "content", description)
    setMetaTag("meta[property=\"twitter:image\"]", "content", DEFAULT_IMAGE)

    setJsonLd("webpage", jsonLd)
  }, [title, description, url, locale, jsonLd])

  return null
}

// Add only fully edited articles with the actual first-publication and last-update timestamps.
// Each article: slug, headline, description, image, datePublished, dateModified (optional), body: string[].
export const PUBLISHED_ARTICLES = []

export function findPublishedArticle(slug) {
  return PUBLISHED_ARTICLES.find((article) => article.slug === slug) || null
}

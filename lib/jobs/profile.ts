export type JobCategory =
  | 'all'
  | 'development'
  | 'automation'
  | 'email'
  | 'website'
  | 'design'
  | 'content'

export type TargetJobCategory = Exclude<JobCategory, 'all'>

export const jobCategories: { id: JobCategory; label: string }[] = [
  { id: 'all', label: 'All priority searches' },
  { id: 'development', label: 'Full-stack & frontend' },
  { id: 'automation', label: 'AI & business automation' },
  { id: 'email', label: 'Email & Klaviyo' },
  { id: 'website', label: 'Websites & e-commerce' },
  { id: 'design', label: 'Design & landing pages' },
  { id: 'content', label: 'Specialist writing' },
]

export const targetJobCategories: { id: TargetJobCategory; label: string }[] = [
  { id: 'development', label: 'Full-stack & frontend' },
  { id: 'automation', label: 'AI & business automation' },
  { id: 'email', label: 'Email & Klaviyo' },
  { id: 'website', label: 'Websites & e-commerce' },
  { id: 'design', label: 'Design & landing pages' },
  { id: 'content', label: 'Specialist writing' },
]

type SearchLane = {
  id: TargetJobCategory
  titlePhrases: string[]
  requiredEvidence?: string[]
}

const searchLanes: SearchLane[] = [
  {
    id: 'development',
    titlePhrases: [
      'full stack developer', 'fullstack developer', 'full stack engineer', 'fullstack engineer',
      'front end developer', 'frontend developer', 'front end engineer', 'frontend engineer',
      'web developer', 'website developer', 'web application developer',
      'react developer', 'react engineer', 'next js developer', 'next js engineer',
      'supabase developer', 'tailwind developer', 'api integration developer',
      'third party api integration developer', 'api integration specialist',
      'mvp developer', 'saas developer', 'dashboard developer', 'feature developer',
      'figma to code', 'ui implementation', 'responsive ui implementation',
      'responsive frontend implementation', 'frontend implementation',
    ],
    requiredEvidence: [
      'react', 'react js', 'next js', 'nextjs', 'typescript', 'supabase',
      'tailwind css', 'figma to code', 'responsive frontend', 'responsive ui',
    ],
  },
  {
    id: 'automation',
    titlePhrases: [
      'ai integration developer', 'ai automation developer', 'automation developer',
      'workflow automation specialist', 'crm automation specialist', 'automation consultant',
      'marketing automation specialist', 'webhook integration developer',
      'webhook integration specialist', 'business automation specialist',
      'crm integration specialist', 'ai integration specialist',
    ],
  },
  {
    id: 'email',
    titlePhrases: [
      'klaviyo specialist', 'klaviyo email', 'email automation specialist',
      'email marketing designer', 'email designer', 'email copywriter',
      'email lifecycle specialist', 'email marketing specialist',
      'klaviyo email automation specialist', 'klaviyo email designer',
      'klaviyo flow specialist', 'email flows specialist', 'email campaign designer',
    ],
  },
  {
    id: 'website',
    titlePhrases: [
      'wordpress developer', 'wordpress website maintenance', 'wordpress maintenance',
      'wordpress support specialist', 'woocommerce developer', 'woocommerce store setup',
      'ecommerce website developer', 'e commerce website developer',
      'online store developer', 'landing page developer', 'wordpress support',
      'wordpress website support', 'woocommerce specialist', 'woocommerce setup',
      'website maintenance specialist', 'web app maintenance specialist',
      'conversion focused landing page developer',
    ],
  },
  {
    id: 'design',
    titlePhrases: [
      'ui ux designer', 'ux ui designer', 'ui designer', 'ux designer',
      'web designer', 'landing page designer',
      'marketing designer', 'social media graphic designer',
      'static ad creative designer', 'static ad designer', 'social media designer',
      'figma email designer', 'email marketing designer',
      'conversion focused landing page designer',
    ],
  },
  {
    id: 'content',
    titlePhrases: [
      'email copywriter', 'landing page copywriter', 'website copywriter',
      'technical content writer', 'content strategist', 'technical writer',
    ],
  },
]

const graphicDesignEvidence = [
  'marketing design', 'static ad creative', 'social media graphics',
  'advertising creative', 'brand assets',
]

const productDesignEvidence = [
  'figma', 'ui ux', 'user experience', 'user interface',
  'saas interface design', 'design systems',
]

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function containsPhrase(text: string, phrase: string) {
  return ` ${text} `.includes(` ${normalize(phrase)} `)
}

export function getTargetJobCategories(
  title: string,
  details = '',
  metadata: string[] = [],
): TargetJobCategory[] {
  const normalizedTitle = normalize(title)
  const normalizedDetails = normalize([details, ...metadata].join(' '))
  const titleHasSpecificWebRole = [
    'full stack', 'fullstack', 'front end', 'frontend', 'react', 'next js',
  ].some((phrase) => containsPhrase(normalizedTitle, phrase))

  if (
    containsPhrase(normalizedTitle, 'shopify')
    || (containsPhrase(normalizedTitle, 'software engineer') && !titleHasSpecificWebRole)
  ) {
    return []
  }

  const matches = searchLanes
    .filter((lane) => {
      const titleMatches = lane.titlePhrases.some((phrase) => containsPhrase(normalizedTitle, phrase))
      const evidence = lane.requiredEvidence
      return titleMatches && (!evidence || evidence.some((phrase) =>
        containsPhrase(normalizedTitle, phrase) || containsPhrase(normalizedDetails, phrase),
      ))
    })
    .map((lane) => lane.id)

  if (
    containsPhrase(normalizedTitle, 'product designer')
    && productDesignEvidence.some((phrase) => containsPhrase(normalizedDetails, phrase))
  ) {
    matches.push('design')
  }

  if (
    containsPhrase(normalizedTitle, 'graphic designer')
    && graphicDesignEvidence.some((phrase) => containsPhrase(normalizedDetails, phrase))
  ) {
    matches.push('design')
  }

  return Array.from(new Set(matches))
}

export function isTargetJob(
  title: string,
  details = '',
  metadata: string[] = [],
) {
  return getTargetJobCategories(title, details, metadata).length > 0
}

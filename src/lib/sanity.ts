import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'hb5scemv',
  dataset: 'production',
  useCdn: false, // Must be false for real-time updates
  apiVersion: '2024-04-22',
  perspective: 'published', // Ensures we only get published content, not drafts
});

export interface SanityBook {
  _id: string;
  title: string;
  description: string;
  coverUrl?: string;
  backgroundColor: string;
  textColor: string;
  order: number;
}

export interface SanityArticle {
  _id: string;
  title: string;
  category: string;
  readTime?: string;
  description: string;
  body?: any; // Represents Portable Text content
  link?: string;
  buttonText?: string;
  imageUrl?: string;
  order: number;
}

// Fetch all book review articles from Sanity
export async function fetchBookArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "bookArticle"] | order(order asc) {
    _id,
    title,
    category,
    readTime,
    description,
    link,
    "imageUrl": image.asset->url,
    order
  }`;
  
  return sanityClient.fetch(query);
}

// Fetch all brain health affiliate resources from Sanity
export async function fetchBrainResources(): Promise<SanityArticle[]> {
  const query = `*[_type == "brainResource"] | order(order asc) {
    _id,
    title,
    category,
    description,
    link,
    "imageUrl": image.asset->url,
    "buttonText": buttonText,
    order
  }`;
  
  // Appending a random tag to the request configuration defeats Vercel's caching
  const clientWithNoCache = sanityClient.withConfig({
    requestTagPrefix: Date.now().toString(),
  });

  return clientWithNoCache.fetch(query);
}

// Fetch all living well tips from Sanity
export async function fetchLivingWellArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "livingWellArticle"] | order(order asc) {
    _id, title, category, description, body, link, "imageUrl": headerImage.asset->url, order
  }`;
  
  const clientWithNoCache = sanityClient.withConfig({
    requestTagPrefix: Date.now().toString(),
  });

  return clientWithNoCache.fetch(query);
}

// Fetch all gardening articles from Sanity
export async function fetchGardeningArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "gardeningArticle"] | order(order asc) {
    _id,
    title,
    category,
    description,
    body,
    link,
    "imageUrl": image.asset->url,
    order
  }`;
  
  const clientWithNoCache = sanityClient.withConfig({
    requestTagPrefix: Date.now().toString(),
  });

  return clientWithNoCache.fetch(query);
}

// Fetch all dog training affiliate resources from Sanity
export async function fetchDogResources(): Promise<SanityArticle[]> {
  const query = `*[_type == "dogResource"] | order(order asc) {
    _id,
    title,
    category,
    description,
    link,
    "imageUrl": image.asset->url,
    "buttonText": buttonText,
    order
  }`;
  
  const clientWithNoCache = sanityClient.withConfig({
    requestTagPrefix: Date.now().toString(),
  });

  return clientWithNoCache.fetch(query);
}

// Fetch all music learning affiliate resources from Sanity
export async function fetchMusicResources(): Promise<SanityArticle[]> {
  const query = `*[_type == "musicResource"] | order(order asc) {
    _id,
    title,
    category,
    description,
    link,
    "imageUrl": image.asset->url,
    "buttonText": buttonText,
    order
  }`;
  
  const clientWithNoCache = sanityClient.withConfig({
    requestTagPrefix: Date.now().toString(),
  });

  return clientWithNoCache.fetch(query);
}

// Fetch all AI learning articles from Sanity
export async function fetchAiArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "aiArticle"] | order(order asc) {
    _id,
    title,
    category,
    description,
    body,
    link,
    "imageUrl": image.asset->url,
    order
  }`;
  
  const clientWithNoCache = sanityClient.withConfig({
    requestTagPrefix: Date.now().toString(),
  });

  return clientWithNoCache.fetch(query);
}

// Fetch the About Page from Sanity
export async function fetchAboutPage(): Promise<any> {
  const query = `*[_type == "aboutPage"][0] {
    title,
    description,
    body,
    "imageUrl": image.asset->url
  }`;
  
  const clientWithNoCache = sanityClient.withConfig({
    requestTagPrefix: Date.now().toString(),
  });

  return clientWithNoCache.fetch(query);
}
// Fetch all language learning affiliate resources from Sanity
export async function fetchLanguageResources(): Promise<SanityArticle[]> {
  const query = `*[_type == "languageResource"] | order(order asc) {
    _id,
    title,
    category,
    description,
    link,
    "imageUrl": image.asset->url,
    "buttonText": buttonText,
    order
  }`;
  
  const clientWithNoCache = sanityClient.withConfig({
    requestTagPrefix: Date.now().toString(),
  });

  return clientWithNoCache.fetch(query);
}
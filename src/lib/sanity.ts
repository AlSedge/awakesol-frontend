import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'hb5scemv',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-04-22',
  perspective: 'published',
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
  body?: any;
  link?: string;
  buttonText?: string;
  imageUrl?: string;
  order: number;
}

export async function fetchBookArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "bookArticle"] | order(order asc) {
    _id, title, category, readTime, description, link, "imageUrl": image.asset->url, order
  }`;
  return sanityClient.fetch(query);
}

export async function fetchBrainResources(): Promise<SanityArticle[]> {
  const query = `*[_type == "brainResource"] | order(order asc) {
    _id, title, category, description, link, "imageUrl": image.asset->url, "buttonText": buttonText, order
  }`;
  return sanityClient.fetch(query);
}

export async function fetchLivingWellArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "livingWellArticle"] | order(order asc) {
    _id, title, category, description, body, link, order
  }`;
  return sanityClient.fetch(query);
}

export async function fetchGardeningArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "gardeningArticle"] | order(order asc) {
    _id, title, category, description, body, link, "imageUrl": image.asset->url, order
  }`;
  return sanityClient.fetch(query);
}

export async function fetchDogResources(): Promise<SanityArticle[]> {
  const query = `*[_type == "dogResource"] | order(order asc) {
    _id, title, category, description, link, "imageUrl": image.asset->url, "buttonText": buttonText, order
  }`;
  return sanityClient.fetch(query);
}

export async function fetchMusicResources(): Promise<SanityArticle[]> {
  const query = `*[_type == "musicResource"] | order(order asc) {
    _id, title, category, description, link, "imageUrl": image.asset->url, "buttonText": buttonText, order
  }`;
  return sanityClient.fetch(query);
}

export async function fetchAiArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "aiArticle"] | order(order asc) {
    _id, title, category, description, body, link, "imageUrl": image.asset->url, order
  }`;
  return sanityClient.fetch(query);
}

export async function fetchAboutPage(): Promise<any> {
  const query = `*[_type == "aboutPage"][0] {
    title, description, body, "imageUrl": image.asset->url
  }`;
  return sanityClient.fetch(query);
}

export async function fetchLanguageResources(): Promise<SanityArticle[]> {
  const query = `*[_type == "languageResource"] | order(order asc) {
    _id, title, category, description, link, "imageUrl": image.asset->url, "buttonText": buttonText, order
  }`;
  
  // This tells Vercel: "DO NOT CACHE THIS! Always get fresh data!"
  const clientWithNoCache = sanityClient.withConfig({
    requestTagPrefix: Date.now().toString(),
  });

  return clientWithNoCache.fetch(query);
}
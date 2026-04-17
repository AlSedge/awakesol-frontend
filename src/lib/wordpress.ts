// This utility handles fetching data from the WordPress REST API
// By default, WordPress exposes its API at /wp-json/wp/v2/

const WP_API_URL = 'https://awakesol.com/wp-json/wp/v2';

// Set to TRUE to test locally without WordPress connected, FALSE for production
const USE_MOCK_DATA = false;

export interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
}

export async function fetchPosts(categorySlug?: string): Promise<WPPost[]> {
  if (USE_MOCK_DATA) {
    return getMockPosts(categorySlug);
  }

  try {
    let categoryQuery = '';
    if (categorySlug) {
      const categories = await fetchCategories();
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        categoryQuery = `&categories=${category.id}`;
      }
    }

    const response = await fetch(`${WP_API_URL}/posts?_embed=1&per_page=6${categoryQuery}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  } catch (error) {
    console.error('Error fetching WP posts:', error);
    return getMockPosts(categorySlug);
  }
}

export async function fetchCategories(): Promise<WPCategory[]> {
  if (USE_MOCK_DATA) {
    return getMockCategories();
  }

  try {
    const response = await fetch(`${WP_API_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  } catch (error) {
    console.error('Error fetching WP categories:', error);
    return getMockCategories();
  }
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  if (USE_MOCK_DATA) {
    const posts = getMockPosts();
    return posts.find(p => p.slug === slug) || null;
  }

  try {
    const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed=1`);
    if (!response.ok) throw new Error('Failed to fetch post');
    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching WP post by slug:', error);
    const mockPosts = getMockPosts();
    return mockPosts.find(p => p.slug === slug) || null;
  }
}

// --- MOCK DATA FOR DEVELOPMENT ---
function getMockCategories(): WPCategory[] {
  return [
    { id: 1, count: 12, description: '', name: 'Learning Online', slug: 'learning-online' },
    { id: 2, count: 8, description: '', name: 'Home Economy', slug: 'home-economy' },
    { id: 3, count: 24, description: '', name: 'Books', slug: 'books' },
    { id: 4, count: 5, description: '', name: 'Other', slug: 'other' },
  ];
}

function getMockPosts(categorySlug?: string): WPPost[] {
  const allPosts: WPPost[] = [
    {
      id: 101,
      title: { rendered: 'Getting Started with Piano: A Beginner\'s Journey' },
      excerpt: { rendered: '<p>Discover the fundamentals of piano playing and how to build a consistent practice routine that actually works.</p>' },
      content: { rendered: '<p>Full content would go here...</p>' },
      date: '2023-10-15T10:00:00',
      slug: 'getting-started-with-piano',
      _embedded: {
        'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=2070&auto=format&fit=crop' }]
      }
    },
    {
      id: 102,
      title: { rendered: 'Urban Gardening: Maximizing Small Spaces' },
      excerpt: { rendered: '<p>Learn how to turn your balcony or small patio into a thriving garden that produces fresh vegetables year-round.</p>' },
      content: { rendered: '<p>Full content would go here...</p>' },
      date: '2023-10-20T14:30:00',
      slug: 'urban-gardening-small-spaces',
      _embedded: {
        'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1416879598555-2200dc8cb5d5?q=80&w=2070&auto=format&fit=crop' }]
      }
    },
    {
      id: 103,
      title: { rendered: 'Top 5 Books for Financial Literacy' },
      excerpt: { rendered: '<p>A curated list of the most impactful books to help you understand personal finance, investing, and wealth building.</p>' },
      content: { rendered: '<p>Full content would go here...</p>' },
      date: '2023-11-05T09:15:00',
      slug: 'top-books-financial-literacy',
      _embedded: {
        'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop' }]
      }
    }
  ];

  if (categorySlug === 'learning-online') return [allPosts[0]];
  if (categorySlug === 'home-economy') return [allPosts[1]];
  if (categorySlug === 'books') return [allPosts[2]];
  
  return allPosts;
}
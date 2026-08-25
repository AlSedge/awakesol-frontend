import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

// Shared shape for article/resource document types.
const articleType = (name: string, title: string) => ({
  name,
  title,
  type: 'document' as const,
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'category', type: 'string', title: 'Category' },
    { name: 'readTime', type: 'string', title: 'Read time (e.g. "6 min")' },
    { name: 'description', type: 'text', title: 'Description / Card summary', rows: 4 },
    { name: 'body', type: 'array', title: 'Article body', of: [{ type: 'block' }] },
    { name: 'image', type: 'image', title: 'Hero image' },
    { name: 'order', type: 'number', title: 'Display order' },
    { name: 'link', type: 'url', title: 'External link (optional)' },
    { name: 'buttonText', type: 'string', title: 'Button text (optional)' },
  ],
});

export default defineConfig({
  name: 'default',
  title: 'Awakesol',
  projectId: 'hb5scemv',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      articleType('livingWellArticle', 'Living Well Article'),
      articleType('gardeningArticle', 'Gardening Article'),
      articleType('wildlifeArticle', 'Wildlife Article'),
      articleType('aiArticle', 'AI Article'),
      {
        name: 'aboutPage',
        title: 'About Page',
        type: 'document',
        fields: [
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 4 },
          { name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }] },
          { name: 'image', type: 'image', title: 'Image' },
        ],
      },
      articleType('languageArticle', 'Language Article'),
      articleType('languageResource', 'Language Resource'),
      articleType('musicArticle', 'Music Article'),
      articleType('musicResource', 'Music Resource'),
      articleType('dogArticle', 'Dog Article'),
      articleType('dogResource', 'Dog Resource'),
      articleType('brainResource', 'Brain Resource'),
      articleType('bookArticle', 'Book Article'),
      articleType('gardeningProduct', 'Gardening Product'),
    ],
  },
});

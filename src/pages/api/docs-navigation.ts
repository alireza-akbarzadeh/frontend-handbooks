import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { Doc, NavigationItem, NavigationCategory } from '@/types/docs';

export const GET: APIRoute = async () => {
    try {
        // Fetch all docs
        const allDocs = await getCollection('docs');

        // Group by category
        const categories = [...new Set(
            allDocs.map((doc: Doc) => doc.slug.split('/')[0])
        )];

        // Category metadata
        const categoryMetadata: Record<string, { title: string }> = {
            javascript: { title: 'JavaScript' },
            html: { title: 'HTML' },
            css: { title: 'CSS' },
            git: { title: 'Git & GitHub' },
            frameworks: { title: 'Frameworks' },
            tools: { title: 'Developer Tools' }
        };

        // Build navigation structure
        const navigation: NavigationCategory[] = categories.map(category => {
            // Get all docs in this category
            const categoryDocs = allDocs.filter((doc: Doc) =>
                doc.slug.startsWith(`${category}/`)
            );

            // Sort by order property if available
            const sortedDocs = categoryDocs.sort((a: Doc, b: Doc) => {
                if (a.data.order !== undefined && b.data.order !== undefined) {
                    return a.data.order - b.data.order;
                }
                return a.data.title.localeCompare(b.data.title);
            });

            // Map to navigation items
            const items: NavigationItem[] = sortedDocs.map((doc: Doc) => {
                return {
                    title: doc.data.title,
                    slug: `/docs/${doc.slug}`,
                };
            });

            return {
                title: categoryMetadata[category]?.title ||
                    category.charAt(0).toUpperCase() + category.slice(1),
                slug: `/docs/${category}`,
                items
            };
        });

        return new Response(
            JSON.stringify({ navigation }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
                }
            }
        );
    } catch (error) {
        // Always return a Response object even in error case
        console.error('Error generating navigation:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to generate navigation',
                message: error instanceof Error ? error.message : String(error)
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
};
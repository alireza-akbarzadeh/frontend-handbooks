import type { APIRoute } from 'astro';
import { getCollection } from 'astro:docs';
import type { Doc } from '@/types/docs';

export const GET: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const query = url.searchParams.get('q') || '';

        if (!query || query.length < 2) {
            return new Response(
                JSON.stringify({ results: [] }),
                {
                    status: 200,
                    headers: {
                        'docs-Type': 'application/json'
                    }
                }
            );
        }

        // Get all docs
        const allDocs = await getCollection('docs');

        // Simple search implementation
        const results = allDocs.filter((doc: Doc) => {
            const searchText = `${doc.data.title} ${doc.data.description || ''} ${doc.data.tags?.join(' ') || ''}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        }).map((doc: Doc) => {
            const [category] = doc.slug.split('/');

            return {
                title: doc.data.title,
                description: doc.data.description || '',
                slug: `/docs/${doc.slug}`,
                category,
                tags: doc.data.tags || []
            };
        });

        return new Response(
            JSON.stringify({
                results,
                query
            }),
            {
                status: 200,
                headers: {
                    'docs-Type': 'application/json',
                    // Don't cache search results for too long
                    'Cache-Control': 'public, max-age=300'
                }
            }
        );
    } catch (error) {
        console.error('Error searching docs:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to search documentation',
                message: error instanceof Error ? error.message : String(error)
            }),
            {
                status: 500,
                headers: {
                    'docs-Type': 'application/json'
                }
            }
        );
    }
};
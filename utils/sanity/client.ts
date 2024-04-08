import { type QueryParams, createClient } from '@sanity/client';

export const client = createClient({
  projectId: '7chqlkzm',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}) {
  return client.fetch<QueryResponse>(query, params, {
    cache: 'force-cache',
    next: {
      tags,
    },
  });
}

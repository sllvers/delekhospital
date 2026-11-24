// Read-only access to the Delek Hospital Sanity project at build time.
// The dataset is public, so published content needs no token. Drafts are never
// returned with the "published" perspective.
export const SANITY_PROJECT_ID = 'ep4aoi37';
export const SANITY_DATASET = 'production';
const API_VERSION = '2025-02-19';

export async function sanityQuery<T>(query: string): Promise<T> {
  const url = new URL(`https://${SANITY_PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${SANITY_DATASET}`);
  url.searchParams.set('query', query);
  url.searchParams.set('perspective', 'published');
  // Let failures stop the build rather than publish a site with missing content.
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Sanity query failed (${response.status}): ${(await response.text()).slice(0, 300)}`);
  }
  return (await response.json()).result as T;
}

// Image references look like "image-<assetId>-<width>x<height>-<format>".
export function sanityImage(ref: string, width = 1200) {
  const match = /^image-([a-f0-9]+)-(\d+)x(\d+)-(\w+)$/.exec(ref);
  if (!match) throw new Error(`Unrecognized Sanity image reference: ${ref}`);
  const [, id, w, h, format] = match;
  return {
    src: `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${w}x${h}.${format}?w=${width}&fit=max&auto=format`,
    width: Math.min(width, Number(w)),
    height: Math.round(Number(h) * Math.min(width, Number(w)) / Number(w)),
  };
}

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-18'

export const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
// assertValue(
//   process.env.SANITY_STUDIO_DATASET,
//   'Missing environment variable: SANITY_STUDIO_DATASET'
// )

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '7chqlkzm';
// assertValue(
//   process.env.SANITY_STUDIO_PROJECT_ID,
//   'Missing environment variable: SANITY_STUDIO_PROJECT_ID'
// )

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

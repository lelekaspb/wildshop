const config = {
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION!,
  useCdn: false,
  token: process.env.SANITY_MUTATIONS_TOKEN!,
};

export default config;

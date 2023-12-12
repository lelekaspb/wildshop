const config = {
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION!,
  useCdn: false,
  token: process.env.SANITY_TOKEN!,
};

export default config;

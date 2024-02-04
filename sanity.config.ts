import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Wild Shop",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "",
  apiVersion: process.env.SANITY_STUDIO_API_VERSION,
  basePath: "/admin",

  plugins: [deskTool(), visionTool()],

  schema: { types: schemas },
});

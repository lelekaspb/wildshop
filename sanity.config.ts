import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Wild Orchid Professional",

  projectId: "xudcmokc",
  dataset: "production",
  apiVersion: "2023-12-04",
  basePath: "/admin",

  plugins: [deskTool(), visionTool()],

  schema: { types: schemas },
});

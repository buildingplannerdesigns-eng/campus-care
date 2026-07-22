import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const configuredProjectId = projectId || "placeholder";

export default defineConfig({
  name: "campus-care",
  title: "Campus Care 2.0 CMS",
  projectId: configuredProjectId,
  dataset,
  basePath: "/studio",
  // Vision plugin omitted — @sanity/vision requires React APIs not available in this Next 15 build.
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});

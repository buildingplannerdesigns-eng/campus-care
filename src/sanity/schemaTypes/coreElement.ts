import { defineField, defineType } from "sanity";

export const coreElement = defineType({
  name: "coreElement",
  title: "Core Element",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      options: {
        list: [
          { title: "Water", value: "water" },
          { title: "Fire", value: "fire" },
          { title: "Earth", value: "earth" },
          { title: "Mineral", value: "mineral" },
          { title: "Nature", value: "nature" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "eyebrow" },
  },
});

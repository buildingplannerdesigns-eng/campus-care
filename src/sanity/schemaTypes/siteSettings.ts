import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "home", title: "Homepage" },
    { name: "about", title: "About / Mission" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      group: "brand",
      initialValue: "ACT Healing",
    }),
    defineField({
      name: "brandTagline",
      title: "Brand tagline",
      type: "string",
      group: "brand",
    }),
    defineField({
      name: "heroOrgName",
      title: "Homepage org name",
      type: "string",
      group: "home",
      description: "Large label on the homepage hero (e.g. ACT HEALING)",
    }),
    defineField({
      name: "heroTagline",
      title: "Homepage tagline",
      type: "text",
      rows: 3,
      group: "home",
    }),
    defineField({
      name: "videoTitle",
      title: "Homepage video title",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "missionHeading",
      title: "Mission heading",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "missionBody",
      title: "Mission body",
      type: "text",
      rows: 5,
      group: "about",
    }),
    defineField({
      name: "guidingStatement",
      title: "Guiding statement",
      type: "text",
      rows: 4,
      group: "about",
    }),
    defineField({
      name: "contactHeading",
      title: "Contact heading",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactBody",
      title: "Contact intro",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "contactName",
      title: "Point of contact name",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactRole",
      title: "Point of contact role",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactEmail",
      title: "Info email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "supportEmail",
      title: "Support email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactPhone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactLocation",
      title: "Location",
      type: "string",
      group: "contact",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});

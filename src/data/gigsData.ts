import { Gig } from "@/types";

export const gigsData: { gigs: Gig[] } = {
  gigs: [
    {
      id: "1",
      title: "BRANDED SHOPIFY WEBSITE",
      description:
        "I will design, redesign shopify store, dropshipping, arrangement of research marketing will be done for ta",
      price: 75.5,
      thumbnail_url: null,
      user_id: "user-1",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Figma designer",
      description:
        "I will design a professional figma website, mobile app, and landing page",
      price: 50.5,
      thumbnail_url: null,
      user_id: "user-2",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Professional Logo Design",
      description: "I will design a professional logo for your business",
      price: 25.5,
      thumbnail_url: null,
      user_id: "user-3",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Professional Business Card Design",
      description: "I will design a professional business card for your business",
      price: 15.5,
      thumbnail_url: null,
      user_id: "user-4",
      created_at: new Date().toISOString(),
    },
  ],
};

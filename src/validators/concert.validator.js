import z from "zod";

export const createConcertValidator = z.object({
  name: z.string().min(2).max(255),
  date: z.iso.datetime(),
  visible: z.boolean().default(false),
  price: z.number().min(0),
});

export const getAllConcertQueryValidator = z.object({
  name: z.string().optional().catch(null),
  fromPrice: z.coerce.number().optional().catch(null),
  toPrice: z.coerce.number().optional().catch(null),
  fromDate: z.iso.date().optional().catch(null),
  orderByName: z.enum(["asc", "desc"]).optional().catch(null),
  orderByDate: z.enum(["asc", "desc"]).optional().catch("asc"),
  orderByPrice: z.enum(["asc", "desc"]).optional().catch(null),
  offset: z.coerce.number().min(0).default(0).catch(0),
  limit: z.coerce.number().min(1).max(100).default(20).catch(20),
});

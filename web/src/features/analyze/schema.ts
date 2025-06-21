import { z } from "zod"

export const topicSchema = z.object({
  topic: z
    .string()
    .min(1, { message: "Topik tidak boleh kosong." })
    .refine(val => val.trim().split(/\s+/).length >= 5, {
      message: "Topik harus terdiri dari minimal 5 kata.",
    })
    .refine(val => /^[a-zA-Z0-9\s.,()\-&]+$/.test(val), {
      message: "Topik mengandung karakter tidak valid. Gunakan huruf, angka, dan tanda baca umum.",
    }),
})

export type TopicSchemaType = z.infer<typeof topicSchema>
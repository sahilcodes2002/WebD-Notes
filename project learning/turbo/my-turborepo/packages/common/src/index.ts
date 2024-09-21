import z from 'zod'

export const newschema = z.object({
    name:z.string(),
    email:z.string()
})

export const url = "postgresql://postgres:pasword@5432/postgres"
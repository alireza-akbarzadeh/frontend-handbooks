import { defineTable, column, NOW } from 'astro:db';

export const users = defineTable({
    columns: {
        id: column('integer', { primaryKey: true }),
        email: column('string', { unique: true }),
        password: column('string'),
        createdAt: column('timestamp', { default: NOW }),
    },
});

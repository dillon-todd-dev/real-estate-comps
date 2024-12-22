import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const Properties = pgTable('properties', {
  id: uuid('id').defaultRandom().primaryKey(),
  street: varchar('street', { length: 256 }).notNull().unique(),
  city: varchar('city', { length: 256 }).notNull(),
  state: varchar('state', { length: 256 }).notNull(),
  postalCode: varchar('postal_code', { length: 10 }).notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }).$onUpdateFn(() => new Date()),
});

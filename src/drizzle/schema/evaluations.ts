import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Properties } from '@/drizzle/schema/properties';

export const Evaluations = pgTable('evaluations', {
  id: uuid('id').defaultRandom().primaryKey(),
  propertyId: uuid('property_id').notNull(),
});

export const EvaluationsRelations = relations(Evaluations, ({ one }) => ({
  property: one(Properties, {
    fields: [Evaluations.propertyId],
    references: [Properties.id],
  }),
}));

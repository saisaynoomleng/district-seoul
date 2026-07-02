import * as t from 'drizzle-orm/pg-core';

export const UsersTable = t.pgTable('users', {
  id: t.uuid('id').primaryKey().defaultRandom(),
});

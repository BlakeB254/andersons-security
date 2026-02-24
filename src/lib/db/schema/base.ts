import {
  pgTable,
  varchar,
  jsonb,
  timestamp,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Site Content — key-value store for editable page content
// ---------------------------------------------------------------------------
export const siteContent = pgTable("site_content", {
  key: varchar("key", { length: 255 }).primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SiteContent = typeof siteContent.$inferSelect;
export type NewSiteContent = typeof siteContent.$inferInsert;

// ---------------------------------------------------------------------------
// Site Config — key-value store for runtime configuration
// ---------------------------------------------------------------------------
export const siteConfig = pgTable("site_config", {
  key: varchar("key", { length: 255 }).primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type SiteConfig = typeof siteConfig.$inferSelect;
export type NewSiteConfig = typeof siteConfig.$inferInsert;

// ---------------------------------------------------------------------------
// Media — uploaded files / images
// ---------------------------------------------------------------------------
export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  filename: varchar("filename", { length: 512 }).notNull(),
  mimeType: varchar("mime_type", { length: 128 }).notNull(),
  url: varchar("url", { length: 2048 }).notNull(),
  alt: varchar("alt", { length: 512 }),
  width: integer("width"),
  height: integer("height"),
  size: integer("size"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;

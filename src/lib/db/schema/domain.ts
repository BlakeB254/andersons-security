import {
  pgTable,
  varchar,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
  uuid,
  index,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Services — security service offerings
// ---------------------------------------------------------------------------
export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    icon: varchar("icon", { length: 128 }),
    tagline: varchar("tagline", { length: 512 }),
    shortDescription: varchar("short_description", { length: 1024 }),
    fullDescription: text("full_description"),
    baseRate: integer("base_rate"), // cents
    features: jsonb("features"), // string[]
    benefits: jsonb("benefits"), // string[]
    idealFor: jsonb("ideal_for"), // string[]
    imageUrl: text("image_url"),
    featured: boolean("featured").default(false).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("services_slug_idx").on(table.slug)]
);

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

// ---------------------------------------------------------------------------
// Bookings — security guard booking orders
// ---------------------------------------------------------------------------
export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bookingNumber: varchar("booking_number", { length: 32 }).notNull().unique(),
    status: varchar("status", { length: 64 }).default("pending_payment").notNull(),
    serviceType: varchar("service_type", { length: 128 }).default("standard").notNull(),
    isArmed: boolean("is_armed").default(false).notNull(),
    numberOfGuards: integer("number_of_guards").notNull(),

    // Event details
    eventCategory: varchar("event_category", { length: 128 }).notNull(),
    eventType: varchar("event_type", { length: 128 }),
    siteName: varchar("site_name", { length: 255 }),
    siteType: varchar("site_type", { length: 128 }),

    // Location
    address: varchar("address", { length: 512 }).notNull(),
    city: varchar("city", { length: 128 }).notNull(),
    state: varchar("state", { length: 64 }).notNull(),
    zipCode: varchar("zip_code", { length: 16 }).notNull(),
    coordinates: jsonb("coordinates"), // { lat: number, lng: number }

    // Schedule
    serviceDate: timestamp("service_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }),
    startTime: varchar("start_time", { length: 16 }).notNull(),
    endTime: varchar("end_time", { length: 16 }).notNull(),
    isMultiDay: boolean("is_multi_day").default(false).notNull(),
    isRushBooking: boolean("is_rush_booking").default(false).notNull(),

    // SOP
    hasExistingSOP: boolean("has_existing_sop").default(false).notNull(),
    sopAddOn: boolean("sop_add_on").default(false).notNull(),

    // Pricing
    pricing: jsonb("pricing"), // { baseRate, armedUpcharge, overnightUpcharge, rushFee, sopFee, subtotal, regularHours, overnightHours, totalHours }
    total: integer("total").notNull(), // cents

    // Customer
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    customerEmail: varchar("customer_email", { length: 255 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 32 }),
    company: varchar("company", { length: 255 }),

    // Payment
    paymentStatus: varchar("payment_status", { length: 64 }).default("pending").notNull(),
    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    paidAt: timestamp("paid_at", { withTimezone: true }),

    // Extras
    upsellClicks: jsonb("upsell_clicks"),
    internalNotes: text("internal_notes"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("bookings_booking_number_idx").on(table.bookingNumber),
    index("bookings_status_idx").on(table.status),
    index("bookings_service_date_idx").on(table.serviceDate),
  ]
);

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

// ---------------------------------------------------------------------------
// Quote Requests — inbound quote / consultation requests
// ---------------------------------------------------------------------------
export const quoteRequests = pgTable(
  "quote_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    serviceType: varchar("service_type", { length: 128 }).notNull(),
    status: varchar("status", { length: 64 }).default("new").notNull(),

    // Service details
    numberOfGuards: integer("number_of_guards"),
    hoursPerDay: integer("hours_per_day"),
    startDate: timestamp("start_date", { withTimezone: true }),
    endDate: timestamp("end_date", { withTimezone: true }),
    recurring: boolean("recurring").default(false).notNull(),

    // Site
    siteName: varchar("site_name", { length: 255 }),
    siteType: varchar("site_type", { length: 128 }),
    address: varchar("address", { length: 512 }),
    city: varchar("city", { length: 128 }),
    state: varchar("state", { length: 64 }),
    zipCode: varchar("zip_code", { length: 16 }),
    specialInstructions: text("special_instructions"),

    // Contact
    contactName: varchar("contact_name", { length: 255 }).notNull(),
    company: varchar("company", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 32 }),
    preferredContact: varchar("preferred_contact", { length: 32 }).default("email").notNull(),

    // Pricing
    estimatedTotal: integer("estimated_total"), // cents
    quotedAmount: integer("quoted_amount"), // cents

    internalNotes: text("internal_notes"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("quote_requests_status_idx").on(table.status)]
);

export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type NewQuoteRequest = typeof quoteRequests.$inferInsert;

// ---------------------------------------------------------------------------
// Categories — blog / content categories
// ---------------------------------------------------------------------------
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  parentId: uuid("parent_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

// ---------------------------------------------------------------------------
// Posts — blog / news articles
// ---------------------------------------------------------------------------
export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 512 }).notNull(),
    slug: varchar("slug", { length: 512 }).notNull().unique(),
    content: text("content").notNull(),
    excerpt: text("excerpt"),
    status: varchar("status", { length: 32 }).default("draft").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    categoryId: uuid("category_id").references(() => categories.id),
    featuredImageUrl: text("featured_image_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("posts_slug_idx").on(table.slug),
    index("posts_status_idx").on(table.status),
  ]
);

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" varchar(512) NOT NULL,
	"mime_type" varchar(128) NOT NULL,
	"url" varchar(2048) NOT NULL,
	"alt" varchar(512),
	"width" integer,
	"height" integer,
	"size" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_config" (
	"key" varchar(255) PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"key" varchar(255) PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_number" varchar(32) NOT NULL,
	"status" varchar(64) DEFAULT 'pending_payment' NOT NULL,
	"service_type" varchar(128) DEFAULT 'standard' NOT NULL,
	"is_armed" boolean DEFAULT false NOT NULL,
	"number_of_guards" integer NOT NULL,
	"event_category" varchar(128) NOT NULL,
	"event_type" varchar(128),
	"site_name" varchar(255),
	"site_type" varchar(128),
	"address" varchar(512) NOT NULL,
	"city" varchar(128) NOT NULL,
	"state" varchar(64) NOT NULL,
	"zip_code" varchar(16) NOT NULL,
	"coordinates" jsonb,
	"service_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone,
	"start_time" varchar(16) NOT NULL,
	"end_time" varchar(16) NOT NULL,
	"is_multi_day" boolean DEFAULT false NOT NULL,
	"is_rush_booking" boolean DEFAULT false NOT NULL,
	"has_existing_sop" boolean DEFAULT false NOT NULL,
	"sop_add_on" boolean DEFAULT false NOT NULL,
	"pricing" jsonb,
	"total" integer NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"customer_email" varchar(255) NOT NULL,
	"customer_phone" varchar(32),
	"company" varchar(255),
	"payment_status" varchar(64) DEFAULT 'pending' NOT NULL,
	"stripe_payment_intent_id" varchar(255),
	"stripe_customer_id" varchar(255),
	"paid_at" timestamp with time zone,
	"upsell_clicks" jsonb,
	"internal_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bookings_booking_number_unique" UNIQUE("booking_number")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"parent_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(512) NOT NULL,
	"slug" varchar(512) NOT NULL,
	"content" text NOT NULL,
	"excerpt" text,
	"status" varchar(32) DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"category_id" uuid,
	"featured_image_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "quote_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_type" varchar(128) NOT NULL,
	"status" varchar(64) DEFAULT 'new' NOT NULL,
	"number_of_guards" integer,
	"hours_per_day" integer,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"recurring" boolean DEFAULT false NOT NULL,
	"site_name" varchar(255),
	"site_type" varchar(128),
	"address" varchar(512),
	"city" varchar(128),
	"state" varchar(64),
	"zip_code" varchar(16),
	"special_instructions" text,
	"contact_name" varchar(255) NOT NULL,
	"company" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone" varchar(32),
	"preferred_contact" varchar(32) DEFAULT 'email' NOT NULL,
	"estimated_total" integer,
	"quoted_amount" integer,
	"internal_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"icon" varchar(128),
	"tagline" varchar(512),
	"short_description" varchar(1024),
	"full_description" text,
	"base_rate" integer,
	"features" jsonb,
	"benefits" jsonb,
	"ideal_for" jsonb,
	"image_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bookings_booking_number_idx" ON "bookings" USING btree ("booking_number");--> statement-breakpoint
CREATE INDEX "bookings_status_idx" ON "bookings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "bookings_service_date_idx" ON "bookings" USING btree ("service_date");--> statement-breakpoint
CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "posts_status_idx" ON "posts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "quote_requests_status_idx" ON "quote_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "services_slug_idx" ON "services" USING btree ("slug");
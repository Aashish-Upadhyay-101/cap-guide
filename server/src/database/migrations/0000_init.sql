CREATE TABLE "accounts" (
	"user_id" uuid NOT NULL,
	"provider" varchar(20) NOT NULL,
	"provider_user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "accounts_provider_provider_user_id_pk" PRIMARY KEY("provider","provider_user_id")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"refresh_token" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_id" uuid NOT NULL,
	"device_info" json,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(35) NOT NULL,
	"last_name" varchar(35) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text,
	"avatar_url" text,
	"is_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT '2025-01-07 19:38:20.977'
);
--> statement-breakpoint
CREATE TABLE "workspaces" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(35) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT '2025-01-07 19:38:20.976'
);
--> statement-breakpoint
CREATE TABLE "workspace_users" (
	"user_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "workspace_users_user_id_workspace_id_pk" PRIMARY KEY("user_id","workspace_id")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_users" ADD CONSTRAINT "workspace_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_users" ADD CONSTRAINT "workspace_users_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" USING btree ("email");
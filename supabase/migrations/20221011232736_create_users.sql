create extension if not exists "uuid-ossp" schema extensions;

create table public.users (
	"id" uuid default extensions.uuid_generate_v4() not null,
	"name" varchar not null,
	"username" varchar not null,
	"avatar_url" varchar not null,
	"twitch" varchar,
	"is_verified" boolean default false,
	"is_creator" boolean default false,
	"email" varchar not null,
	"github" varchar,
	"bio" text, -- varchar(max)
	"website" varchar,
	"youtube" varchar,
	"created_at" timestamp with time zone default now(),
  "updated_at" timestamp with time zone default now(),

	primary key (id)
)
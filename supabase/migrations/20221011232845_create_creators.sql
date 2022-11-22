create extension if not exists "uuid-ossp" schema extensions;

create table public.creators (
	"id" uuid default extensions.uuid_generate_v4() not null,
	"username" varchar not null,
	"created_at" timestamp with time zone default now(),
  "updated_at" timestamp with time zone default now(),

	primary key(id)
);
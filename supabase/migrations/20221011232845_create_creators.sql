create table public.creators (
	"id" uuid default uuid_generate_v4() not null,
	"created_at" timestamp with time zone default now(),
  "updated_at" timestamp with time zone default now(),

	primary key(id)
);
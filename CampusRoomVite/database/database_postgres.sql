CREATE TABLE "users" (
  "user_id" integer PRIMARY KEY,
  "username" varchar,
  "role_id" varchar,
  "created_at" timestamp
);

CREATE TABLE "rooms" (
  "room_id" integer PRIMARY KEY,
  "building_id" integer,
  "campus" varchar,
  "room_number" varchar,
  "capacity" integer,
  "room_type" varchar
);

CREATE TABLE "buildings" (
  "building_id" integer PRIMARY KEY,
  "building_name" varchar,
  "address" varchar
);

CREATE TABLE "bookings" (
  "booking_id" integer PRIMARY KEY,
  "user_id" integer,
  "room_id" integer,
  "start_time" timestamp DEFAULT (now()),
  "end_time" timestamp DEFAULT (now()),
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "roles" (
  "role_id" integer PRIMARY KEY,
  "role_name" varchar
);

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("role_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "rooms" ADD FOREIGN KEY ("building_id") REFERENCES "buildings" ("building_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bookings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "bookings" ADD FOREIGN KEY ("room_id") REFERENCES "rooms" ("room_id") DEFERRABLE INITIALLY IMMEDIATE;

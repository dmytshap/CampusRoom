
PRAGMA foreign_keys = ON;

CREATE TABLE roles (
    role_id INTEGER PRIMARY KEY,
    role_name TEXT NOT NULL UNIQUE
);

CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    role_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    password_hash TEXT NOT NULL  

    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE buildings (
    building_id INTEGER PRIMARY KEY,
    building_name TEXT NOT NULL,
    building_address TEXT NOT NULL,
    campus TEXT NOT NULL
);

CREATE TABLE rooms (
    room_id INTEGER PRIMARY KEY,
    building_id INTEGER NOT NULL,
    room_number TEXT NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    room_type TEXT NOT NULL,

    FOREIGN KEY (building_id) REFERENCES buildings(building_id),

    UNIQUE (building_id, room_number)
);

CREATE TABLE bookings (
    booking_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (room_id) REFERENCES rooms(room_id),

    CHECK (datetime(end_time) > datetime(start_time))
);

CREATE TRIGGER prevent_overlapping_bookings
BEFORE INSERT ON bookings
FOR EACH ROW
WHEN EXISTS (
    SELECT 1
    FROM bookings
    WHERE room_id = NEW.room_id
      AND datetime(NEW.start_time) < datetime(end_time)
      AND datetime(NEW.end_time) > datetime(start_time)
)
BEGIN
    SELECT RAISE(ABORT, 'Room is already booked during this time');
END;

CREATE TRIGGER prevent_overlapping_bookings_update
BEFORE UPDATE ON bookings
FOR EACH ROW
WHEN EXISTS (
    SELECT 1
    FROM bookings
    WHERE room_id = NEW.room_id
      AND booking_id != OLD.booking_id
      AND datetime(NEW.start_time) < datetime(end_time)
      AND datetime(NEW.end_time) > datetime(start_time)
)
BEGIN
    SELECT RAISE(ABORT, 'Room is already booked during this time');
END;


CREATE INDEX idx_bookings_room_time
ON bookings(room_id, start_time, end_time);

CREATE INDEX idx_bookings_user
ON bookings(user_id);

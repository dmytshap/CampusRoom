#!/usr/bin/env bash

DB_PATH="$(pwd)/database/room_booking.db"
echo "Starting backend"

(
	cd "backend"
	DB_PATH="$DB_PATH" node server.js
	
) & BACKEND_PID=$!


echo "Starting frontend"

(
	cd "frontend"
	npm run dev
) & FRONTEND_PID=$!


echo "backend started and frontend started"

wait
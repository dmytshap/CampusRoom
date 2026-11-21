Postgresql will be used
dbdiagram.png made via dbdiagram.io
Code for diagram is in diagram.md

Sqlite will be used.
Run next commands to install:

Linux Fedora:

# installs sqlite itself

sudo dnf install sqlite

# This installs a UI for the sqlite

sudo dnf install sqlitebrowser
sqlitebrowser will be installed to your OS and you can find it in Start Menu ("Windows key")

======================================

Linux Ubuntu:

# sqlite itself

sudo apt install sqlite3

# Browser

sudo add-apt-repository -y ppa:linuxgndu/sqlitebrowser
sudo apt-get update
sudo apt-get install sqlitebrowser

sqlitebrowser will be installed to your OS and you can find it in Start Menu ("Windows key")

======================================

For Windows:
I think you need to download files from their official website and install idk
https://www.sqlite.org/download.html

======================================

# To check that database works correctly:

You should have sqlite3 room_booking.db and schema.sql already. These come with this commit.
If you do not have these, see manual setup.

1. Run in terminal "sqlite3 room_booking.db"
2. Run ".tables"
   if you get "bookings building roles rooms users" everything works correctly

# MANUAL SETUP: IF YOU ARE DOING DATABASE SETUP FROM SCRATCH (not the case because we have .db and .sql already):

To setup the database, you need to be in database folder.
So, CampusRoom/CampusRoomVite/database
Then, run:

1. nano schema.sql // This will create a sql file
2. Copy script form database_sqlite.txt
3. Paste it in the schema.sql you have open in command line (use CTRL + SHIFT + V)
4. Save by pressing CTRL + O, press Enter and exit via CTRL + X
5. Write and run sqlite3 room_booking.db, in this step we are creating database it self
6. You will see "Sqlite version ...... . Enter ".help" for usage hints."
7. Write and run ".read schema.sql"
8. Write and run ".quit"
9. You now should have schema.sql and room_booking.db

Check by running "sqlite3 room_booking.db" and then write ".tables". You should have

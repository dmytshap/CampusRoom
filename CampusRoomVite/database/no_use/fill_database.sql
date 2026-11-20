INSERT INTRO buildings ("building_id", "building_name", "campus", "address") VALUES ("1","Canthia","Kuopio Campus", "Yliopistonrinne 3")
INSERT INTRO buildings ("building_id", "building_name", "address") VALUES ("2","Medistudia","Kuopio Campus", "Yliopistonrinne 3")
INSERT INTRO buildings ("building_id", "building_name", "address") VALUES ("3","Mediteknia","Kuopio Campus", "Yliopistonrinne 3")



INSERT INTRO buildings ("building_id", "building_name", "address") VALUES ("4","Snellmania","Kuopio Campus", "Yliopistonranta 8")
INSERT INTRO buildings ("building_id", "building_name", "address") VALUES ("5","Melania","Kuopio Campus", "Yliopistonranta 1")
INSERT INTRO buildings ("building_id", "building_name", "address") VALUES ("6","Studentia","Kuopio Campus", "Yliopistonranta 3")



INSERT INTO roles ("role_id", "role_name") VALUES ("1", "PROFESSOR");
INSERT INTO roles ("role_id", "role_name") VALUES ("2", "LECTURER");
INSERT INTO roles ("role_id", "role_name") VALUES ("3", "STUDENT");
INSERT INTO roles ("role_id", "role_name") VALUES ("4", "RESEARCHER");
INSERT INTO roles ("role_id", "role_name") VALUES ("5", "PRESIDENT")


INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("1", "1", "CA101", "300", "LECTURE_HALL");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("2", "1", "CA102", "200", "LECTURE_HALL");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("3", "1", "CA103", "100", "LECTURE_CLASSROOM");

INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("4", "1", "CA201", "100", "LECTURE_CLASSROOM");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("5", "1", "CA202", "70", "LECTURE_CLASSROOM");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("6", "1", "CA203", "60", "COMPUTER_CLASSROOM");

INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("7", "1", "CA301", "15", "WORKING_SPACE");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("7", "1", "CA302", "30", "LABORATORY");


INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("8", "2", "MDS101", "50", "LECTURE_CLASSROOM");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("9", "2", "MDS102", "40", "LABORATORY");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("10", "2", "MDS103", "30", "LABORATORY");

INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("11", "3", "MDT101", "50", "LECTURE_CLASSROOM");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("12", "3", "MDT102", "40", "LABORATORY");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("13", "3", "MDT103", "20", "LABORATORY");



INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("14", "4", "SN100", "300", "LECTURE_HALL");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("16", "4", "SN101", "100", "LECTURE_HALL");


INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("17", "4", "SN200", "10", "WORKING_SPACE");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("18", "4", "SN201", "30", "LABORATORY");


INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("19", "4", "SN300", "70", "LECTURE_CLASSROOM");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("20", "4", "SN301", "30", "LABORATORY");


INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("21", "5", "MEL100", "50", "LECTURE_CLASSROOM");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("22", "5", "MEL101", "30", "LECTURE_CLASSROOM");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("23", "5", "MEL200", "25", "LABORATORY");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("24", "5", "MEL200", "25", "WORKING_SPACE");


INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("25", "6", "STU100", "50", "LECTURE_CLASSROOM");
INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("26", "6", "STU101", "30", "WORKING_SPACE");

INSERT INTO rooms ("room_id", "building_id", "room_number", "capacity", "room_type") VALUES ("27", "6", "STU200", "30", "LABORATORY");

INSERT INTO users ("user_id", "username", "role_id", "created_at") VALUES ("1","mikkoahto", "5", "CURRENT_TIMESTAMP");
INSERT INTO users ("user_id", "username", "role_id", "created_at") VALUES ("2","helgarajala", "1", "CURRENT_TIMESTAMP");
INSERT INTO users ("user_id", "username", "role_id", "created_at") VALUES ("3","lariraivio", "1", "CURRENT_TIMESTAMP");
INSERT INTO users ("user_id", "username", "role_id", "created_at") VALUES ("4","noelhakola", "3", "CURRENT_TIMESTAMP");
INSERT INTO users ("user_id", "username", "role_id", "created_at") VALUES ("5","kaijatala", "3", "CURRENT_TIMESTAMP");
INSERT INTO users ("user_id", "username", "role_id", "created_at") VALUES ("7","ohtotammi", "2", "CURRENT_TIMESTAMP");
INSERT INTO users ("user_id", "username", "role_id", "created_at") VALUES ("8","lyydiarantajarvi", "4", "CURRENT_TIMESTAMP");
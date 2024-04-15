CREATE DATABASE m223_security;
CREATE USER m223_security IDENTIFIED BY "m223_security";
GRANT ALL ON m223_security.* TO m223_security;


--im terminal
-- docker run -d --name m223_db -p 3306:3306 -v m223_db:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=sven mysql:8.0
-- docker exec -it m223_db /bin/bash  //zum starten 
-- eingeben in das seld das auftaucht
-- CREATE DATABASE m223_security;
--CREATE USER m223_security IDENTIFIED BY "m223_security";
--GRANT ALL ON m223_security.* TO m223_security;

-- wen schon einmal erstelt 
-- docker start m223_db   //zum starten fom container
-- docker exec -it m223_db /bin/bash  
-- mysql -p  // zum verbinder zum backend
-- paswort sven eingeben 
-- mit sql befelen weitermachen
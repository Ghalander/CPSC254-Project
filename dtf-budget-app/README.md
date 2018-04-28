### DRINK SCOUTER
barID VARCHAR(4), price INTEGER, name VARCHAR(35), type VARCHAR(25), description VARCHAR(200)

### BAR LOCATION
barID VARCHAR(4), bar VARCHAR(35), lat REAL, long REAL

### BAR MEDIA
barID VARCHAR(4), photo VARCHAR(100)

### DELIVER
price INTEGER, name VARCHAR(35), type VARCHAR(25), description VARCHAR(200), bar VARCHAR(35), lat REAL, long REAL



### Debrief

Verify
`SELECT price, name, type, description, bar, lat, long FROM scouter, location WHERE scouter.barID = location.barID;`

Transfer data from both tables to new table 'deliver'
`INSERT INTO deliver (price, name, type, description, bar, lat, long) SELECT price, name, type, description, bar, lat, long FROM scouter, location WHERE scouter.barID = location.barID;`

### IDs for resturaunts
EFO - El Farolito Jr
FLO - Florintines Grill


### DATA INPUT
INSERT INTO scouter(barID, price, name, type, description) VALUES(

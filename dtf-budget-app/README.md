# Making a Drinking in DTF app with a budget

### General Main Ideas
- Set out a budget for the night
- How many drinks can we get out of the night
- Manage by drink types


### IDs for restaurants
EFO - El Farolito Jr
FLO - Florintines Grill
WRK - Wreckless
PUB - The Public House
MAT - Matador Cantina
HCF - Hidalgo Cafe
SDE - The Slidebar Rock n Roll Cafe
HOP - Hopscotch
RUT - Rutabergorz

### TABLE - SCOUTER
barID VARCHAR(4), price INTEGER, name VARCHAR(35), type VARCHAR(25), description VARCHAR(200)

To insert data:
```
INSERT INTO scouter(barID, price, name, type, description) VALUES(
```
### TABLE - LOCATION
barID VARCHAR(4), bar VARCHAR(35), address VARCHAR(250)

input as address as:
```
310+N+Harbor+Blvd+Fullerton+CA+92832 <- EFO
102+N+Harbor+Blvd+Fullerton+CA+92832 <- FLO
136+W+Commonwealth+Ave+Fullerton+CA+92832 <- WRK
138+W+Commonwealth+Ave+Fullerton+CA+92832 <- PUB
111+N+Harbor+Blvd+Fullerton+CA+92832 <- MAT
305+N+Harbor+Blvd+Fullerton+CA+92832 <- HCF
122+E+Commonwealth+Ave+Fullerton+CA+92832 <- SDE
136+E+Commonwealth+Ave+Fullerton+CA+92832 <- HOP
211+N+Pomona+Ave+Fullerton+CA+92832 <- RUT
```

### TABLE - MEDIA
barID VARCHAR(4), photo VARCHAR(100)

### TABLE - SHIPMENT
price INTEGER, name VARCHAR(35), type VARCHAR(25), description VARCHAR(200), bar VARCHAR(35), address VARCHAR(250)


### Combine the tables

Verify:
`SELECT price, name, type, description, bar, address FROM scouter, location WHERE scouter.barID = location.barID;`

Transfer data from both tables to new table 'deliver':
`INSERT INTO shipment (price, name, type, description, bar, address) SELECT price, name, type, description, bar, address FROM scouter, location WHERE scouter.barID = location.barID;`

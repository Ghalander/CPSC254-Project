# Making a Drinking in DTF app with a budget

### General Main Ideas
- Set out a budget for the night
- How many drinks can we get out of the night
- Manage by drink types

# Node Modules

Everything that is in the node modules folder are dependencies that are needed by the open source applications. So those were not touched and just used in our program.

While not everything was used, one of the headaches of web development is that if a dependency is missing, the traceback becomes a nightmare.

# Source
### App.js

This is our main intro page and is in control of the main query calls and draft screen

### Server.js

This is where the server will create a locally hosted url and allow us to call the information to our card draft

### Cart.js

After the draft screen, this will list our item over the map

### CheckForMap.js

This was just a flag that will trigger and call the rest of the map when the draft screen submit is clicked

### Map.js

This is where we check for the locations of each drink and filter out the locations to only unique locations. Then that was sent as a url call to Google's API.

# Database Fields and Info

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

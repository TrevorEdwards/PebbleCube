function game(name, room, size) {
        this.myPerson = Person(name);
        this.mySize = size;
        this.rooms = Room[size][size][size];
        generateRooms(size);
        this.currentX = 0;
        this.currentY = 0;
        this.currentZ = 0;


}

Game.prototype.generateRooms = function(size, displayNames) {
        var possibleNames[];
        getDisplaynames(possibleNames);
        for(var x = 0, x < size; x++){
        for(var y = 0; y < size; y++){
        for(var z = 0; z < size; z++){
                rooms[x][y][z] = room("dank", possibleNames[x*y*z % possibleNames.length()], x, y, z);
        }
        }
        }
}

function getDisplaynames(possibleNames) {
        possibleNames.push("This is the dankest meme Room");
        possibleNames.push("Congratulations, you win the room!");
        possibleNames.push("Wow, this room has the rarest pepe room");
        possibleNames.push("Trevor Edwards");
        possibleNames.push("Darude Sandstorm");
        possibleNames.push("duududududu");
}

Game.prototype.attemptMove = function() {
        if(this.currentRoom.currentX == 0 && this.myPerson.NSEWDirection == "WEST") {
                displayInvalid();
        } else if(this.currentRoom.currentX == this.mySize-1 && this.myPerson.NSEWDirection == "EAST") {
                displayInvalid();
        } else if(this.currentRoom.currentY == 0 &&this.myPersonNSEWDirection == "SOUTH"){
                displayInvalid()
        } else if(this.currentRoom.currentY == this.mySize-1 && this.myPerson.NSEWDirection == "NORTH") {
                displayInvalid();
        } else if(this.currentRoom.currentZ == 0 && this.myPerson.UDDirection == "DOWN") {
                displayInvalid():
        } else if(this.currentRoom.currentZ == this.mySize-1 && this.myPerson.UDDirection == UP) {
                displayInvalid();
        } else {
                this.interact();
        }

}
//Used when you have an invalid funciton and you need to prompt a message to the player that 
//are doing some screwed up shit
displayInvalid = function() {
        //do some shit
}

Game.prototype.enter = function() {
        if(this.myPerson.UDDirection != "STRAIGHT"){}
                switch(this.myPerson.UDDirection){
                        case "UP":
                                this.currentZ++;
                                //execute based on trap here

                        case "DOWN":
                                this.currentZ--;
                                //execute based on trap here
                        default:        
                                //what the FUCK
                }
        } else {
                switch(this.myPerson.NSEWDirection){
                        case "NORTH":
                                this.currentY++;
                                //execute based on trap here
                        case "SOUTH":
                                this.currentY--;
                                //execute based on trap here
                        case "EAST":
                                this.currentX++;
                                //execute based on trap here
                        case "WEST":
                                this.currentX--;
                                //execute based on trap here

                        default: 
                                //WTF
                }
        }
}

Game.prototype.interactWithRoom = function() {
        if(this.rooms[currentX][currentY][currentZ].trap == "do somethign"){
                //display based on trap
        }
}
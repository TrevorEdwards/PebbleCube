function Person (name) {
        this.name = name;
        this.NSEWDirection = "NORTH";
        this.UDDirection = "STRAIGHT";

        this.Items = [];
}

Person.prototype.turnRight = function () {
        if(this.NSEWDirection == "NORTH") {
                this.NSEWDirection = "EAST";
        } else if(this.NSEWDirection == "EAST") {
                this.NSEWDirection = "SOUTH";
        } else if(this.NSEWDirection == "SOUTH") {
                this.NSEWDirection = "WEST";
        } else if(this.NSEWDirection  == "WEST") {
                this.NSEWDirection = "NORTH";
        }
}

Person.prototype.turnLeft = function () {
        if(this.NSEWDirection == "NORTH") {
                this.NSEWDirection = "WEST";
        } else if(this.NSEWDirection == "WEST") {
                this.NSEWDirection = "SOUTH";
        } else if(this.NSEWDirection == "SOUTH") {
                this.NSEWDirection = "EAST";
        } else if(this.NSEWDirection  == "EAST") {
                this.NSEWDirection = "NORTH";
        }
}

Person.prototype.lookUP = function() {
        if(this.UDDirection == "STRAIGHT") {
                this.UDDirection = "UP";
        } else if (this.UDDirection == "DOWN") {
                this.UDDirection = "STRAIGHT";
        }
}

Person.prototype.lookDOWN = function() {
        if(this.UDDirection == "UP") {
                this.UDDirection = "STRAIGHT";
        } else if (this.UDDirection == "STRAIGHT") {
                this.UDDirection = "DOWN";
        }
}

Person.prototype.takeItem = function(item) {
        Items.push(item);
}


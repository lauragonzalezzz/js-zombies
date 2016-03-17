
function Item(name) {
  this.name = name;
}

function Weapon(name, damage) {
  this.name = name;
  this.damage = damage;
  Item.call(this, name);
}

Weapon.prototype = Object.create(Item.prototype);

function Food(name, energy) {
  this.name = name;
  this.energy = energy;
  Item.call(this, name);
}

Food.prototype = Object.create(Item.prototype);

function Player(name, health, strength, speed) {
  var _pack = [];
  var _maxHealth = health;
  this.name = name;
  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this.isAlive = true;
  this.equipped = false;
  
  this.getPack = function() {
    return _pack;
  }

  this.getMaxHealth = function() {
    return _maxHealth;
  }

  this.takeItem = function(item) {
    if (this.getPack().length < 3) {
      _pack.push(item);
      console.log(this.name + ' , ' + item.name + ' taken successfully.');
      return true;
    }
    else {
      console.log('Your pack is too full, item not taken.');
      return false;
    }
  }

  this.discardItem = function(item) {
    if (_pack.indexOf(item) === -1) {
      console.log('Item not found.');
      return false;
    }
    else {
      var index = _pack.indexOf(item);
      _pack.splice(index, 1);
      console.log(this.name + ' , ' + item.name + ' discarded successfully.');
      return true;
    }
  }

  this.checkPack = function() {
    console.log(_pack[0]);
    console.log(_pack[1]);
    console.log(_pack[2]);
  }

  this.equip = function(itemToEquip) {
    var index = _pack.indexOf(itemToEquip);
    if (index !== -1 && itemToEquip instanceof Weapon) {
      if (this.equipped === false) {
        this.equipped = itemToEquip;
        _pack.splice(index, 1);
        return true;
      }
      else if (this.equipped !== false) {
        var limbo = this.equipped;
        this.equipped = itemToEquip;
        _pack.splice(index, 1);
        _pack.push(limbo);
        return true;
      }
      else {
        return false;
      }
      return true;
    }
    else {
      return false;
    }
  }

  this.eat = function(itemToEat) {
    var index = _pack.indexOf(itemToEat);
    if (index !== -1 && itemToEat instanceof Food) {
      _pack.splice(index, 1);
      this.health += itemToEat.energy;
    }
    else {
      return false;
    }
    if (this.health > this.getMaxHealth()) {
      this.health = this.getMaxHealth();
    }
  }

  this.useItem = function(item) {
    if (item instanceof Weapon) {
      this.equip(item);
    }
    if (item instanceof Food) {
      this.eat(item);
    }
  }

  this.equippedWith = function(){
    if (this.equipped === false) {
      console.log('Nothing equipped.');
      return false;
    }
    else {
      return this.equipped.name;
    }
  }
}


function Zombie(health, strength, speed) {
  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this.isAlive = true;
  var _maxHealth = health;
}

function FastZombie(health, strength, speed) {
  Zombie.call(this, health, strength, speed);
}

FastZombie.prototype = Object.create(Zombie.prototype);

function StrongZombie(health, strength, speed) {
  Zombie.call(this, health, strength, speed);
}
StrongZombie.prototype = Object.create(Zombie.prototype);

function RangedZombie(health, strength, speed) {
  Zombie.call(this, health, strength, speed);
}
RangedZombie.prototype = Object.create(Zombie.prototype);

function ExplodingZombie(health, strength, speed) {
  Zombie.call(this, health, strength, speed);
}
ExplodingZombie.prototype = Object.create(Zombie.prototype);

function runGame() {
  var player = new Player("Joan", 500, 30, 70);
  var zombie = new Zombie(40, 50, 20);
  var charger = new FastZombie(175, 25, 60);
  var tank = new StrongZombie(250, 100, 15);
  var spitter = new RangedZombie(150, 20, 20);
  var boomer = new ExplodingZombie(50, 15, 10);

  var shovel = new Weapon("shovel", 15);
  var sandwich = new Food("sandwich", 30);
  var chainsaw = new Weapon("chainsaw", 25);

  player.takeItem(shovel);
  player.takeItem(sandwich);
  player.takeItem(chainsaw);
  player.discardItem(new Weapon("scythe", 21));
  player.discardItem(shovel);
  player.checkPack();
  player.takeItem(shovel);
  player.checkPack();

  player.equippedWith();
  player.useItem(chainsaw);
  player.equippedWith();
  player.checkPack();

  player.useItem(shovel);
  player.equippedWith();
  player.checkPack();

  player.health = 487;
  console.log("Before health: " + player.health);
  player.useItem(sandwich);
  console.log("After health: " + player.health);
  player.checkPack();
}

var Tamagotchi = function() {
	this.x_offset = 0;
	this.y_offset = 0;

	this.age = 0;
	this.health = 10000;
	this.weight = 50
	this.tiredness = 50;
	this.hunger = 50;
	this.happiness = 1000;
	this.state = "body";
	this.last_state = "body";
	this.lights = true;
	this.radio = false;
	this.sleep = false;


	this.update = function()
	{

		// TODO: Geen honger & Helemaal gezond & Vrolijk & Niet vermoeid & geen abnormaal gewicht
		// = Super_happy!
		if(
			(
				(
					(
						this.tiredness > 3000
					) &&
					!this.radio && 
					(!this.lights || this.tiredness > 50000)
				) || (
						this.sleep &&
						this.tiredness > 0
				)
			)
		)
			{
				this.sleep = true;
				this.state = "sleeping";
				if(this.sleep && this.tiredness && this.radio){
					this.sleep = false;
					this.state = "body";
					this.happiness -= this.tiredness/2;
				}
			}
		else
			{
				this.sleep = false;
				this.state = "body";

				if (this.happiness <= 0) 
				{
					this.state = "queuequeue";
				}
			}
		// TODO: Als humeur 0 is gaat dit met slapen weer omhoog.
		if (this.health < 1)
			this.state = "dead";
		else{
			this.health += (
				(-1 * (this.tiredness > 40000)) +
				(-1 * (this.weight < 0))
			)
			this.age += 1;
			this.hunger += (
				(this.hunger < 10001) * (
					1 + 
					(1*(this.happiness < 0)))
				);
			this.tiredness += (
					(!this.sleep*(
						1 +
						(1*(this.happiness < 0)) +
						(0.5*this.radio) +
						(0.5 *!this.lights)
					)) + 
					(this.sleep * -2)
				);
			this.happiness += (
				-1 +
				(3*(this.radio))
			)
			this.weight += (
				(1* (this.hunger < 0)) +
				(-1* (this.hunger > 5000))
			)
		}
		
		// TODO: Remove:
		document.getElementById('age').innerHTML = this.age;
		document.getElementById('health').innerHTML = this.health;
		document.getElementById('weight').innerHTML = this.weight;
		document.getElementById('tiredness').innerHTML = this.tiredness;
		document.getElementById('hunger').innerHTML = this.hunger;
		document.getElementById('happiness').innerHTML = this.happiness;
	};

	this.draw = function()
	{
		if (this.state != this.last_state)
		{
			document.getElementById(this.last_state).style.display = "none";
			document.getElementById(this.state).style.display = "inherit";
			this.last_state = this.state;
		}
	};

	this.healthUp = function()
	{
		this.health += 25;
	};

	this.healthDown = function()
	{
		this.health -= 25;
	};

	this.hungerUp = function()
	{
		this.hunger += 25;
	};

	this.hungerDown = function()
	{
		this.hunger -= 25;
	};

	this.tirednessUp = function()
	{
		this.tiredness += 25;
	};

	this.tirednessDown = function()
	{
		this.tiredness -= 25;
	};

	this.happinessUp = function()
	{
		this.happiness += 25;
	};

	this.happinessDown = function()
	{
		this.happiness -= 25;
	};

	this.weightUp = function()
	{
		this.weight += 25;
	};

	this.weightDown = function()
	{
		this.weight -= 25;
	};

	this.switchLights = function()
	{
		this.lights = !this.lights;
		if (!this.lights)
		{
			document.documentElement.style.backgroundColor = "rgb(127,67,127)";
			document.documentElement.style.color = "white";
			document.getElementById("lightSwitch").innerHTML = "Lights On!";
			if (this.radio)
				document.documentElement.style.backgroundImage = "url('./gfx/notes2.png')";
		}
		else
		{
			document.documentElement.style.backgroundColor = "rgb(255,196,255)";
			document.documentElement.style.color = "black";
			document.getElementById("lightSwitch").innerHTML = "Lights Off!";
			if (this.radio)
				document.documentElement.style.backgroundImage = "url('./gfx/notes.png')";
		}
	};

	this.switchRadio = function()
	{
		this.radio = !this.radio;
		if (this.radio)
		{
			if (this.lights)
				document.documentElement.style.backgroundImage = "url('./gfx/notes.png')";
			else
				document.documentElement.style.backgroundImage = "url('./gfx/notes2.png')";
			document.getElementById("radioSwitch").innerHTML = "Radio Off!";
		}
		else
		{
			document.documentElement.style.backgroundImage = "inherit";
			document.getElementById("radioSwitch").innerHTML = "Radio On!";
		}
	};

	this.giveFood = function()
	{
		if(!this.sleep){
		this.hunger -= 2000;
		this.happiness += (1000 * (this.hunger > 0));
		this.health += (500 * (this.health < 10000));
		}
	}
};

function create_tamagotchi()
{
	var t = new Tamagotchi();
	interval_id = setInterval(function() {
		t.update();
		t.draw();
	}, 10);
	return t;
}

function end_tamagotchi(tamagotchi)
{
	clearInterval(tamagotchi.interval_id);
}
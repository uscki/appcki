<!DOCTYPE html>
<html>
<head>
	<title>
		Wilson
	</title>

	<link rel="stylesheet" type="text/css" href="./css/wilson.css">
	<script type="text/javascript" src="./js/wilson.js"></script>

	<meta name="viewport" content="width=device-width">
</head>
<body>

	<div id="container">
		<div><strong>Age</strong>: <span id="age">0</span></div>
		<div class="centered">
			<img id="body" class="nut" src="./gfx/body.png" />
			<img id="dead" class="nut" src="./gfx/dead.png" />
			<img id="sleeping" class="nut" src="./gfx/sleeping.png" />
			<img id="ziek" class="nut" src="./gfx/ziek.png" />
			<img id="MHMMM_Ninja" class="nut" src="./gfx/MHMMM_Ninja.png" />
			<img id="queuequeue" class="nut" src="./gfx/queuequeue.png" />
			<div class="haat">
				<h2>
					HOU JE MOBIEL RECHT, LUL! <br>
					<em>-pim hopmans</em>
				</h2>
			</div>
		</div>

		<script type="text/javascript">
			var t = create_tamagotchi();
		</script>

		<div>
			health:
			<button onclick="t.healthUp();">healthUp</button>
			<button onclick="t.healthDown();">healthDown</button>
			<span id="health">0</span>
		</div>
		<div>
			hunger:
			<button onclick="t.hungerUp();">hungerUp</button>
			<button onclick="t.hungerDown();">hungerDown</button>
			<span id="hunger">0</span>
		</div>
		<div>
			tiredness:
			<button onclick="t.tirednessUp();">tirednessUp</button>
			<button onclick="t.tirednessDown();">tirednessDown</button>
			<span id="tiredness">0</span>
		</div>
		<div>
			happiness:
			<button onclick="t.happinessUp();">happinessUp</button>
			<button onclick="t.happinessDown();">happinessDown</button>
			<span id="happiness">0</span>
		</div>
		<div>
			weight:
			<button onclick="t.weightUp();">weightUp</button>
			<button onclick="t.weightDown();">weightDown</button>
			<span id="weight">0</span>
		</div>
		<button id="lightSwitch" onclick="t.switchLights()">Lights Off!</button>
		<button id="radioSwitch" onclick="t.switchRadio()">Radio On!</button>
		<button id="foodSwitch" onclick="t.giveFood()">Give food!</button>
	</div>

</body>
</html>
$(() => {
	/*$(".item").click(() => {
		$("#sidebar").animate({
			width: "toggle"
		});
	});*/

	$(".item").click(function (ev) {
		let $this = $(this);
		if ($this.is("[data-external]"))
			return;

		ev.preventDefault();
		let href = $this.attr("href");
		$.get("api/" + href, (result) => {
			console.log(result);
			window.history.pushState("object or string", "Title", href);
			$("#dynamic-text").html(result);
		});
	});

	$(window).resize((event) => {
		sim.resize();
	});

	let settings = new ecollision.ECollisionSettings();
	settings.simulation.simulationCanvas = "background";

	let sim = new ecollision.ECollision(settings);

	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

	let c = $("#background");

	let w = c.width();
	let h = c.height();

	let minSpeed = -1;
	let maxSpeed = 1;
	let diff = maxSpeed - minSpeed;

	for (let i = 0; i < 50; i++) {
		let r = Math.random();
		let p = sim.simulationUI.addParticle(Math.random() * w, Math.random() * h, 5 + (r * 20), 1 + (r * 3), getRandomColor());

		p.cOR = 1.0;
		p.xVel = minSpeed + (Math.random() * diff);
		p.yVel = minSpeed + (Math.random() * diff);
	}

	sim.start();
});

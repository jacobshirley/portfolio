var PARTICLES = 30;

$(function()  {
	/*$(".item").click(() => {
		$("#sidebar").animate({
			width: "toggle"
		});
	});*/

	$(".item, #nav>a").click(function (ev) {
		var $this = $(this);
		if ($this.is("[data-external]"))
			return;

		ev.preventDefault();
		var href = $this.attr("href");
		$.get("api/" + href, function (result) {
			console.log("HELLO");
			window.history.pushState("object or string", "Title", href);
			var $dT = $("#dynamic-text");
			$dT.html(result);

			if (window.innerWidth <= 1000) {
				$('html, body').animate({
			        scrollTop: $dT.offset().top
			    }, 500);
			}
		});
	});

	$(window).resize(function (event) {
		sim.resize();
	});

	window.addEventListener("orientationchange", function() {
		sim.resize();
	}, false);

	var settings = new ecollision.ECollisionSettings();
	settings.simulation.simulationCanvas = "background";

	settings.graph = null;
	settings.overlay = null;

	var sim = new ecollision.ECollision(settings);

	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

	window.simulation = sim;

	var c = $("#background");

	var w = c.width();
	var h = c.height();

	var minSpeed = -1;
	var maxSpeed = 1;
	var diff = maxSpeed - minSpeed;

	for (var i = 0; i < PARTICLES; i++) {
		var r = Math.random();
		var p = sim.simulationUI.addParticle(Math.random() * w, Math.random() * h, 5 + (r * 20), 1 + (r * 3), getRandomColor());

		p.cOR = 1.0;
		p.xVel = minSpeed + (Math.random() * diff);
		p.yVel = minSpeed + (Math.random() * diff);
	}

	sim.start();
});

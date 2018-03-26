var PARTICLES = 30;
var SWITCH_INTERVAL = 5000;

$(function()  {
	var $items = $("div[title]");
	var current = 0;
	var paused = false;

	function select(item) {
		var $item = $($items.get(item));
		var $a = $item.find("a");
		var $desc = $item.find("div[desc]");

		$a.addClass("selected");
		$desc.addClass("selected");
	}

	function deselect(item) {
		var $item = $($items.get(item));
		var $a = $item.find("a");
		var $desc = $item.find("div[desc]");

		$a.removeClass("selected");
		$desc.removeClass("selected");
	}

	$("div[title]").hover(function() {
		deselect(current);
		current = $(this).index();
		paused = true;
	}, function() {
		paused = false;
	});

	select(current);
	setInterval(function() {
		if (paused) {
			current = 0;
			return;
		}

		deselect(current);

		current++;
		current %= $items.length;

		select(current);
	}, SWITCH_INTERVAL);

	$("#contact").click(function(ev) {
		var $this = $(this);

		$this.addClass("dark");
		$this.addClass("white-text");
		$("#contact").text("jakeshirley2@gmail.com");
		$("#contact").attr("href", "mailto:jakeshirley2@gmail.com");
		//$("#email").width(0);
		//$("#email").toggleClass("hidden");
	});

	/*$(".item, #nav>a").click(function (ev) {
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
	});*/

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

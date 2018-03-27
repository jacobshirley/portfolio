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
		$this.text("jakeshirley2@gmail.com");
		$this.attr("href", "mailto:jakeshirley2@gmail.com");
		$this.addClass("email");
	});
});

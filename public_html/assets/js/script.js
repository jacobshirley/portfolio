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

		if (!$this.hasClass("email"))
			ev.preventDefault();

		$this.addClass("dark");
		$this.addClass("white-text");
		$this.text("jakeshirley2@gmail.com");
		$this.attr("href", "mailto:jakeshirley2@gmail.com");
		$this.addClass("email");
	});

	let $scrollbar = $(".scrollbar");
	let $container = $(".container");
	
	function start() {
		let dWidth = $(document).width();
		let width = $container.outerWidth();
		if (dWidth < width) {
			$scrollbar.addClass("scrollbar-mode");
			$scrollbar.addClass("shadow");
		} else {
			$scrollbar.removeClass("scrollbar-mode");
			$scrollbar.removeClass("shadow");
		}
	}

	$(window).resize(start);
	start();

	$(".container").hover(function () {
		$scrollbar.css({height: "10000px"});
	}, function () {
		$scrollbar.css({height: "auto"});
	});

	function MobileMenu($menu, $scrollRef, offset, minPageWidth) {
		this.$menu = $menu;
		this.$scrollRef = $scrollRef;
		this.offset = offset;
		this.minPageWidth = minPageWidth;

		this.init();
	}

	MobileMenu.prototype.init = function() {
		var scrollVel = 0;
	    var lastScrollY = $(document).scrollTop();

	    var height = this.$menu.outerHeight();
	    var startPos = parseInt(this.$menu.css("top"));
	    var startPos2 = startPos;

	    var pos = 0;

	    var _this = this;

	    this.interval = setInterval(function() {
			if (typeof _this.minPageWidth !== 'undefined' && _this.minPageWidth < $(window).width()) {
				_this.$menu.css({top: "0px"});
				return;
			}

	    	var sc = _this.$scrollRef.scrollTop();
	    	scrollVel = sc - lastScrollY;

	    	pos = parseInt(_this.$menu.css("top"));

	    	if (pos >= startPos - height && pos <= startPos) {
	    		if (_this.offset && _this.offset !== 0)
		    		if (sc > _this.offset) {
			        	startPos = 0;
			        } else
			        	startPos = startPos2;

	    		if (pos - scrollVel < startPos - height) {
	    			scrollVel = pos - startPos + height;
	    		} else if (pos - scrollVel > startPos) {
	    			scrollVel = pos - startPos;
	    		}

	    		_this.$menu.css({top: "-=" + scrollVel});
	        } else if (pos < startPos - height) {
				_this.$menu.css({top: (startPos - height) + "px"});
			} else if (pos > startPos) {
				_this.$menu.css({top: startPos + "px"});
			}

	        lastScrollY = sc;
	    }, 5);
	}

	MobileMenu.prototype.refresh = function() {
		this.stop();
		this.init();
	}

	MobileMenu.prototype.setOffset = function(offset) {
		this.offset = offset;
	}

	MobileMenu.prototype.stop = function() {
		if (this.interval !== -1) {
		    clearInterval(this.interval);
		    this.interval = -1;
		    this.$menu.css({top: "initial"});
		}
	}

	var mobileMenu = new MobileMenu($(".nav-strip").first(), $(document), 0, 500);
});

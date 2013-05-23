/**
 * jQuery Kaskus Embed Plugin
 * By Martabakangus Copyright 2013
 *
 **/

(function ( $ ) {
	$.fn.kaskusEmbed = function(options) {
		var settings = $.extend({
            // These are the defaults.
            styleDark: 0,
            serverAssets: "/frame/frame.min.html",
            serverOrigin: window.location.origin
        }, options );

		$(this).each(function(a,e){
			if(!$(this).hasClass("kaskus-embed")){
				return;
			}
			//
			var luar = $(this);
			$(this).attr({
						id:'Kembed_'+a,
						src: settings.serverOrigin+settings.serverAssets,
						scrolling: "no"
					})
					.css({
						width: '100%',
						border: '0'
					});
			setTimeout(function(){
				luar[0].contentWindow.postMessage({
					element: luar.attr('id'),
					thread: luar.attr('data-thread'),
					domain: window.location.origin
				},settings.serverOrigin);
			},800)

		});
		
		$(window).on("message", function(e) {
			var data = e.originalEvent.data;
			$("#"+data.element).css('height',data.tinggi);
		});
	}
}(jQuery));
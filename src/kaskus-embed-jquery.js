		(function ( $ ) {
			$.fn.kaskusEmbed = function(options) {
				var settings = $.extend({
		            // These are the defaults.
		            serverUrl: "/assets/",
		            styleDark: 0
		        }, options );

				return this.each(function(a,e){
					//Set Element
					var luar = $(this);

					if(!luar.attr('data-embed') == "kaskus"){
						return;
					}

					if(!$('head .style-kaskus-badge')[0])
					{
						$('head').append('<link rel="stylesheet" class="style-kaskus-badge" href="'+settings.serverUrl+'card-styling.css"/>');
					}
					luar.after('<div id="badge-kaskus_'+a+'" class="badge-kaskus-very-outer"/>');
					luar.next().html("<h1>Loading...</h1>");
					if(!luar.attr('src').split('http://www.kaskus.co.id/show_post/')[1]){
						return;
					}

					luar.css({'width':'0','border':'0','height':'0'})
						.attr({'data-id':'frame_'+a})
						.load(function(){
							luar.next().html('<div class="kaskus-card-outer"> <header> <h1> <a href="#"><img src="'+settings.serverUrl+'home-logo.png"/></a> </h1> <a href="#" id="quote-src" target="_blank"><i class="icon-quote-left"></i> Quote</a> </header> <div class="stripline"> <p id="post_title"><a href="#">%title%</a></p> <time id="post_time">%date%</time> </div> <div class="vcard"> <figure> <img id="avatar_src" src="#"> </figure> <div class="detail"> <p id="username"><a href="#">%username%</a></p> <p id="slug">%role%</p> <div class="static"> </div> </div> <div class="cendol"> <ul title="% akan menjadi terkenal" class=""> </ul> </div> </div> <div class="content"> </div> </div>');
							//After added Style
							var id_nya = luar.attr('src').split('/show_post/')[1];
							var yql = encodeURIComponent('http://www.kaskus.co.id/show_post/'+id_nya);

							//By Using YQL
							$.ajax({
							  url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22"+yql+"%22%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22main%22%5D%2Fdiv%5B%40class%3D%22row%22%5D'&diagnostics=false",
							  cache: true,
							  dataType: "html"
							}).done(function( data ) {
							  		var url = "http://kaskus.co.id"
									var hasil = {}

									//Header Of Content
									var header 				= $(data).find('.row .breadcrumbs a');
									//Main of Content
									var main 				= $(data).find('.row:eq(1) .col .row .col .row .col');
									//author container
									var author 				= $(main).find('.vcard');

									//post detail
									hasil.judul 			= header.html();
									hasil.link 				= url + header.attr('href');
									hasil.date_post			= $(main).find('>p').html();
									hasil.post_id 			= $(main).find('.entry-head .permalink a strong').html();

									//user detail
									hasil.img_url 			= $(author).find('img.photo').attr('src');
									hasil.username			= $(author).find('.user-details >a').html();
									hasil.username_href		= url + $(author).find('.user-details >a').attr('href');
									hasil.role				= $(author).find('.title p').html();
									hasil.user_id			= $(author).find('.meta div:eq(0) p').html();
									hasil.join_date			= $(author).find('.meta div:eq(1) p').html();
									hasil.total_post		= $(author).find('.meta div:eq(2) p').html();
									//cendol
									hasil.cendol			= $(author).find('.cendol img').length;
									hasil.cendol_desc		= $(author).find('.cendol').attr('title');
									if($(author).find('.cendol img').attr('src') == "http://kkcdn-static.kaskus.co.id/themes_2.0/img/icon/reputation_pos.gif")
									{
										hasil.cendol_type = 1;
									}
									else
									{
										hasil.cendol_type = 0;
									}

									//Online Status
									if($(author).find('.control ul li:eq(0) a img').attr('src') == "http://kkcdn-static.kaskus.co.id/themes_2.0/img/icon/status_online.png")
									{
										hasil.online = 1;
									}
									else
									{
										hasil.online = 0;
									}

									//content
									hasil.content = $(main).find('.entry');
									//quote url (For reply)
									hasil.quote	= url + $(main).find('.user-tools a').attr('href');
									//==================================================================

									if(!hasil.username || !hasil.content)
									{
										luar.next().html("<h1>Post Not found Or Overposting</h1>");
										return;
									}

									$(luar).next().find("#quote-src").attr('href',hasil.quote);
									$(luar).next().find("#post_title a").html(hasil.judul).attr('href',hasil.link);
									$(luar).next().find("#post_time").html(hasil.date_post);
									$(luar).next().find("#avatar_src").attr('src', hasil.img_url);
									$(luar).next().find("#username a").attr('href', hasil.username_href).html(hasil.username);
									$(luar).next().find("#slug").html(hasil.role);

									$(luar).next().find(".static").html('<p><span>Post</span>'+hasil.total_post+'</p>');
									$(luar).next().find(".static").append('<p><span>Join</span>'+hasil.join_date+'</p>');
									$(luar).next().find(".static").append('<p><span>UserID</span>'+hasil.user_id+'</p>');

									if(hasil.cendol_type = 1)
									{
										var cendolnya = "cendol-gan";
									}
									else
									{
										var cendolnya = "bata";
									}
									$(luar).next().find('.cendol ul').addClass(cendolnya).attr('title', hasil.cendol_desc);

									for (var i=0;i<hasil.cendol;i++)
									{
										$(luar).next().find('.cendol ul').append('<li></li>');
									}

									$(hasil.content).find('input[type="button"]').removeAttr('onclick');
									$(hasil.content).find('.post-quote > span a.jump').attr('',function(){
										var dulu = $(this).attr('href');
										$(this).attr({'href':'http://www.kaskus.co.id'+dulu,'target':'_blank'});
									});
									$(luar).next().find(".content")
														.html(hasil.content)
														.find('input[type="button"]').click(function(){
															if($(this).val() =="Show"){
																$(".content_"+$(this).attr("class")).slideDown(0);
																$(this).html("").val("Hide");
															}else{
																$(".content_"+$(this).attr("class")).slideUp(0);
																$(this).html("").val("Show");
															}
														});
									$(luar).next().find(".kaskus-card-outer").fadeIn();
									$(luar).next().find("header h1 a img").attr('src', settings.serverUrl+'home-logo.png');
							}).fail(function(){
								luar.next().html("<h1>Post Not found Or Overposting</h1>");
								return;
							});
					});
				});

			}
		}(jQuery));
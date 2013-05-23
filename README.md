kaskus-embed-jquery
===================

Kaskus Single Post Embed jQuery Plugin

##disklemer

Karena ini merupakan Versi Betty beberapa Bug masih ditemukan silahkan report issue jika terjadi BUG atau kendala.

##bagaimana cara pakainya?

gampang sisipkan jquery library dan plugins nya
	
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/kaskus-embed-jquery.js"></script>

Lalu cari link single post dari kaskus dan sisipkan seperti berikut

	<iframe class="kaskus-embed" data-thread="5198471d0a75b47606000003/4377/"></iframe>

id `5198471d0a75b47606000003/4377/` diambil dari `http://www.kaskus.co.id/show_post/[id_nya]`
kemudian untuk plugin gunakan script seperti berikut.

	<script type="text/javascript">
		$('iframe').kaskusEmbed();
	</script>

##options

	serverOrigin : letak server origin frame anda untuk melakukan request iframe
	serverAssets : letak assets frame anda untuk membaca thread tsb

contoh
	
	<script type="text/javascript">
		$('iframe').kaskusEmbed({serverOrigin: 'http://pedox.github.io'});
	</script>

##beberapa kondisi dan keadaan

Untuk menggunakan Plugin ini setidaknya browser melakukan Cache ke server kaskus dengan iframe.
Karena kaskus tidak mengizinkan Hotlink Image server mereka. Setelah iframe selesai di load secara sukses, maka badge akan
memproses untuk dirender dengan image cache yang ada dari iframe tsb.

ga ngerti ya? kasian.

##kontribusi 

boleh tapi jangan galak galak yah...

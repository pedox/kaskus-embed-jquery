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
	
	<iframe src="http://www.kaskus.co.id/show_post/519ad89c532acfbb7b00000b/1/bocoran-kostum-baru-mu-musim-depan" data-embed="kaskus"></iframe>

kemudian untuk plugin gunakan script seperti berikut.

	<script type="text/javascript">
		$('iframe').kaskusEmbed();
	</script>

##options

	serverUrl : letak assets anda seperti style css dsb //

contoh
	
	<script type="text/javascript">
		$('iframe').kaskusEmbed({serverUrl: 'http://pedox.github.io/kaskus-embed-jquery/assets/'});
	</script>

##beberapa kondisi dan keadaan

Untuk menggunakan Plugin ini setidaknya browser melakukan Cache ke server kaskus dengan iframe.
Karena kaskus tidak mengizinkan Hotlink Image server mereka. Setelah iframe selesai di load secara sukses, maka badge akan
memproses untuk dirender dengan image cache yang ada dari iframe tsb.

ga ngerti ya? kasian.

Contohnya ? [Contoh kaskus embed](http://jsbin.com/oqosex/1)

##kontribusi 

boleh tapi jangan galak galak yah...

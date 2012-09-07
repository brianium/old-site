(function(){
	function erbToLiquid() {
		var codes = document.getElementsByTagName('code'),
			erbInterpolate = /&lt;%=(.+)%&gt;/g,
			erbExec = /&lt;%(.+)%&gt;/g,
			html;
		for(var i = 0; i < codes.length; i++) {
			if(codes[i].className == 'rhtml') {
				html = codes[i].innerHTML;
				html = html.replace(erbInterpolate,'{{$1}}');	
				html = html.replace(erbExec,'{%$1%}');
				codes[i].innerHTML = html;
			}
		}
	};

	erbToLiquid();
})();
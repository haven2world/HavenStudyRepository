(function(){
	function emitToken(token){
		token.constructor.current = null;

		console.log(token)
	}

	window.emitToken = emitToken;
})()
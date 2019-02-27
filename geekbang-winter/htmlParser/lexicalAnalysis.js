(function(){

	function dataState(c){
		if(c==='<'){
			return tagOpenState;
		}else{
			emitToken(c);
			return dataState;
		}
	}

	function tagOpenState(c){
		if(c==='/'){
			return endTagOpenState;
		}else if(c.match(/[A-Z]/)){
			let token = new StartTagToken();
			token.name = c.toLowerCase();
			return tagNameState;
		}else if(c.match(/[a-z]/)){
			let token = new StartTagToken();
			token.name = c;
			return tagNameState;
		}else if(c==='!'){
			let token = new MarkupDeclarationToken();
			return markupDeclarationOpenState;
		}else{
			return dataState;
		}
	}

	function endTagOpenState(c){
		if(c.match(/[A-Z]/)){
			let token = new EndTagToken();
			token.name = c.toLowerCase();
			return tagNameState;
		}else if(c.match(/[a-z]/)){
			let token = new EndTagToken();
			token.name = c;
			return tagNameState;
		}else{
			return dataState;
		}
	}

	function tagNameState(c){
		if(c.match(/[A-Z]/)){
			let token = TagToken.getCurrentTagToken();
			token.name += c.toLowerCase();
			return tagNameState;
		}else if(c.match(/[a-z]/)){			
			let token = TagToken.getCurrentTagToken();
			token.name += c;
			return tagNameState;
		}else if(c==='>'){
			emitToken(TagToken.getCurrentTagToken());
			return dataState;
		}else if(c==='/'){
			return selfClosingStartTagState;
		}else if(c===' '){
			return beforeAttributeNameState;
		}
	}

	function markupDeclarationOpenState(c){
		if(c==='>'){
			emitToken(MarkupDeclarationToken.current);
			return dataState;
		}else{
			MarkupDeclarationToken.current.content += c;
			return markupDeclarationOpenState;
		}
	}

	function selfClosingStartTagState(c){
		if(c==='>'){
			emitToken(TagToken.getCurrentTagToken());
			return dataState;
		}else{
			return dataState;
		}
	}

	function beforeAttributeNameState(c){
		if(c==='/'){
			return selfClosingStartTagState;
		}else if(c==='>'){
			emitToken(TagToken.getCurrentTagToken());
			return dataState;
		}else if(c.match(/[a-z|A-Z]/)){
			let token = new AttributeNameToken();
			token.name = c;
			return attributeNameState;
		}else{
			return dataState;
		}
	}

	function attributeNameState(c){
		if(c.match(/[a-z|A-Z|-]/)){
			AttributeNameToken.current.name += c;
			return attributeNameState;
		}else if(c==='='){
			emitToken(AttributeNameToken.current);
			return beforeAttributeValueState;
		}else if(c===' '){
			emitToken(AttributeNameToken.current);
			return beforeAttributeNameState;
		}else{
			return beforeAttributeNameState;
		}
	}

	function beforeAttributeValueState(c){
		if(c.match(/['|"]/)){
			let token = new AttributeValueToken();
			token.value = c;
			return attributeValueState;
		}else{
			return beforeAttributeNameState;
		}
	}

	function attributeValueState(c){
		if(c===' '||c==='/'){
			emitToken(AttributeValueToken.current);
			return beforeAttributeNameState
		}else{
			AttributeValueToken.current.value += c;
			return attributeValueState
		}
	}


	window.dataState = dataState;
})()
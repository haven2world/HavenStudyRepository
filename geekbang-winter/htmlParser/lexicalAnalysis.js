(function(){

	class HTMLLexicalParser{
		constructor(emitToken){
			this.emitToken = emitToken;
			this.state = this.dataState;
		}

		receiver(c){
			this.state = this.state(c);
		}

		dataState(c){
			if(c==='<'){
				return this.tagOpenState;
			}else{
				this.emitToken(c);
				return this.dataState;
			}
		}

		tagOpenState(c){
			if(c==='/'){
				return this.endTagOpenState;
			}else if(c.match(/[A-Z]/)){
				let token = new StartTagToken();
				token.name = c.toLowerCase();
				return this.tagNameState;
			}else if(c.match(/[a-z]/)){
				let token = new StartTagToken();
				token.name = c;
				return this.tagNameState;
			}else if(c==='!'){
				let token = new MarkupDeclarationToken();
				return this.markupDeclarationOpenState;
			}else{
				return this.dataState;
			}
		}

		endTagOpenState(c){
			if(c.match(/[A-Z]/)){
				let token = new EndTagToken();
				token.name = c.toLowerCase();
				return this.tagNameState;
			}else if(c.match(/[a-z]/)){
				let token = new EndTagToken();
				token.name = c;
				return this.tagNameState;
			}else{
				return this.dataState;
			}
		}

		tagNameState(c){
			if(c.match(/[A-Z]/)){
				let token = TagToken.getCurrentTagToken();
				token.name += c.toLowerCase();
				return this.tagNameState;
			}else if(c.match(/[a-z]/)){			
				let token = TagToken.getCurrentTagToken();
				token.name += c;
				return this.tagNameState;
			}else if(c==='>'){
				this.emitToken(TagToken.getCurrentTagToken());
				return this.dataState;
			}else if(c==='/'){
				this.emitToken(TagToken.getCurrentTagToken());
				return this.selfClosingStartTagState;
			}else if(c===' '){
				this.emitToken(TagToken.getCurrentTagToken());
				return this.beforeAttributeNameState;
			}
		}

		markupDeclarationOpenState(c){
			if(c==='>'){
				this.emitToken(MarkupDeclarationToken.current);
				return this.dataState;
			}else{
				MarkupDeclarationToken.current.content += c;
				return this.markupDeclarationOpenState;
			}
		}

		selfClosingStartTagState(c){
			if(c==='>'){
				this.emitToken(new SelfClosingTagToken());
				return this.dataState;
			}else{
				return this.dataState;
			}
		}

		beforeAttributeNameState(c){
			if(c==='/'){
				return this.selfClosingStartTagState;
			}else if(c==='>'){
				return this.dataState;
			}else if(c.match(/[a-z|A-Z]/)){
				let token = new AttributeNameToken();
				token.name = c;
				return this.attributeNameState;
			}else{
				return this.dataState;
			}
		}

		attributeNameState(c){
			if(c.match(/[a-z|A-Z|-]/)){
				AttributeNameToken.current.name += c;
				return this.attributeNameState;
			}else if(c==='='){
				this.emitToken(AttributeNameToken.current);
				return this.beforeAttributeValueState;
			}else if(c===' '){
				this.emitToken(AttributeNameToken.current);
				return this.beforeAttributeNameState;
			}else{
				return this.beforeAttributeNameState;
			}
		}

		beforeAttributeValueState(c){
			if(c.match(/['|"]/)){
				let token = new AttributeValueToken();
				token.value = c;
				return this.attributeValueState;
			}else{
				return this.beforeAttributeNameState;
			}
		}

		attributeValueState(c){
			if(c===' '){
				this.emitToken(AttributeValueToken.current);
				return this.beforeAttributeNameState
			}else if(c==='/'){
				this.emitToken(AttributeValueToken.current);
				return this.selfClosingStartTagState;
			}else{
				AttributeValueToken.current.value += c;
				return this.attributeValueState
			}
		}


	}

	window.HTMLLexicalParser = HTMLLexicalParser;
})()
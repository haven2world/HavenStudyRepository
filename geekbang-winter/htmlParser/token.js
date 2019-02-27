(function(){
	class Token{
		constructor(){
			this.constructor.current = this;
		}

		static current = null;

	}

	class TagToken extends Token{
		constructor(){
			super();
			this.name = '';
		}
		static getCurrentTagToken(){
			if(StartTagToken.current){
				return StartTagToken.current;
			}else{
				return EndTagToken.current;
			}
		}
	}

	class StartTagToken extends TagToken{
		constructor(){
			super();
		}
	}

	class EndTagToken extends TagToken{
		constructor(){
			super();
		}
	}

	class MarkupDeclarationToken extends Token{
		constructor(){
			super();
			this.content = '';
		}
	}

	class AttributeNameToken extends Token{
		constructor(){
			super();
			this.name = '';
		}
	}

	class AttributeValueToken extends Token{
		constructor(){
			super();
			this.value = '';
		}
	}




	window.TagToken = TagToken;
	window.StartTagToken = StartTagToken;
	window.EndTagToken = EndTagToken;
	window.MarkupDeclarationToken = MarkupDeclarationToken;
	window.AttributeNameToken = AttributeNameToken;
	window.AttributeValueToken = AttributeValueToken;
})()

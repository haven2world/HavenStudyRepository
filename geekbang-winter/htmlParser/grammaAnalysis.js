(function(){

	class HTMLGrammaParser{
		constructor(){
			this.stack = [new MyDocument()];
			this.lastAttribute = null;
		}

		receiver(token){
			let topItem = ()=>this.stack[this.stack.length-1];
			switch(token.constructor.name){
				case 'StartTagToken':{
					if(!(topItem() instanceof MyElement)){
						let text = this.stack.pop();
						topItem().addChild(text);
					}
					let element = new MyElement(token);
					this.stack.push(element);
					break;
				}
				case 'EndTagToken':{
					if(topItem() instanceof MyText){
						let text = this.stack.pop();
						topItem().addChild(text);
					}
					if(topItem().type !== token.name){
						console.log('开始标签与结束标签不匹配',topItem(),token);
					}else{
						let element = this.stack.pop();
						topItem().addChild(element);
					}
					break;
				}
				case 'SelfClosingTagToken':{
					let element = this.stack.pop();
					topItem().addChild(element);
					break;
				}
				case 'MarkupDeclarationToken':{
					console.log('MarkupDeclaration:'+token.content);
					this.stack[0].markupDeclaration.push(token.content);
					break;
				}
				case 'AttributeNameToken':{
					topItem().attribute[token.name] = true;
					this.lastAttribute = token.name;
					break;
				}
				case 'AttributeValueToken':{
					topItem().attribute[this.lastAttribute] = token.value;
					break;
				}
				default:{
					if(topItem() instanceof MyText){
						topItem().add(token);
					}else{
						this.stack.push(new MyText(token));
					}
				}
			}
		}

		output(){
			return this.stack[0];
		}
	}



	window.HTMLGrammaParser = HTMLGrammaParser;
})()
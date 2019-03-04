class MyNode{
	constructor(){

	}
}

class MyElement extends MyNode{
	constructor(tagToken){
		super();
		this.type = '';
		this.attribute = {};
		this.childNodes = [];

		if(tagToken){
			this.type = tagToken.name;
		}
	}

	addChild(child){
		this.childNodes.push(child);
	}
}

class MyText extends MyNode{
	constructor(value){
		super();
		this.value = value||'';
	}

	add(str){
		this.value += str.toString();
	}

}

class MyDocument extends MyElement{
	constructor(){
		super();
		this.markupDeclaration = [];
	}
}
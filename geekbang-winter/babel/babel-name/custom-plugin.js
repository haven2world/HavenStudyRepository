
module.exports = function(babel){
	const {types:t} = babel;
	let count = 0;

	return {
		visitor:{
			ExportDeclaration(path){
				if(path.node.type === 'ExportDefaultDeclaration'){
					console.log('default');
				}else{
					let declarationNode = path.node.declaration;
					switch(declarationNode.type){
						case 'FunctionDeclaration':{
							console.log('func:' + declarationNode.id.name);
							break;
						}
						case 'VariableDeclaration':{
							declarationNode.declarations.forEach(node => console.log(declarationNode.kind + ':' +node.id.name))
							break;
						}
						default:
							console.log(declarationNode)
					}
				}
			}
		}
	}
}
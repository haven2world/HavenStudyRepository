(function(){
	function genArr(){
		let len = Math.floor(Math.random()*100)+1;
		let arr = [];
		for(let i=0;i<len;++i){
			arr.push(((Math.random()>0.5)?1:-1)*Math.random()*10000);
		}
		return arr;
	}
	function testOne(arr,sortFun){
		let result = JSON.parse(JSON.stringify(arr));
		result = sortFun(result);
		if(result.length>1){
			for(let i=1;i<result.length;++i){
				if(result[i]<result[i-1]){
					console.log(arr,result,i);
					return false
				}
			}
			return true
		}else{
			return true
		}
	}
	function test(sortFun){
		let errCount = 0;
		for(let i=0;i<1000;++i){
			let arr = genArr();
			if(!testOne(arr,sortFun)){
				++errCount;
			}
		}
		console.log(`total test 1000 records,err: ${errCount}`);
	}
	window.test = test;
})()
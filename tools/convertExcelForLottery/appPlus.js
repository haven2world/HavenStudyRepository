var xlsx = require('node-xlsx');
var fs = require('fs');

var sample = JSON.stringify({"sn":"8627","name":"你好","loc":"成都","laId":"","gaId":"","laIdCopy":"","forLa":"false","forGa":"false","done":"",rtx:"test"});

var result = [];
var resultMap = {};

//需要根据表格设置
var sheets = xlsx.parse('./temp/yigeexcel.xls');//获取到所有sheets
var keyMap = {
	0:'sn',
	1:'name',
	2:'rtx',
	3:'loc'
};
var RTXIndex = 2;
// 配置完毕

sheets.forEach(function(sheet){
    console.log('start in ' + sheet['name']);
    if(sheet.name === '小西山居'){
	    for(var rowId in sheet['data']){
	        var row=sheet['data'][rowId];
	        if(rowId == 0){
	        	continue;
	        }
	        addOne(row, 'forLa');
	    }
    }else if(sheet.name === '大西山居'){
    	for(var rowId in sheet['data']){
	        var row=sheet['data'][rowId];
	        if(rowId == 0){
	        	continue;
	    	}
	    	if(resultMap[row[RTXIndex]]){
	    		resultMap[row[RTXIndex]].forGa = "true";
	    	}else{
	    		addOne(row, 'forGa');
	    	}
	    }
    }

});

function addOne(row, type='forLa'){
    let temp = JSON.parse(sample);
    row.forEach((item, index)=>{
    	let key = keyMap[index];

    	if(key){
    		temp[key] = item.toString();
    	}

    })
    temp[type] = "true";
	result.push(temp);
	resultMap[temp.rtx] = result[result.length-1];
}

function genText(){
	let temp = "[\n";
	result.forEach((item, index)=>{
		temp += JSON.stringify(item);
		if(index !== result.length-1){
			temp += ','
		}
		temp += '\n';
	})
	temp += ']';
	return temp
}

let test = JSON.parse(genText())
console.log(test)

fs.writeFile('./temp/result.txt',genText() ,{},(err, data)=>{
	if(err){
		console.log(err)
	}
})

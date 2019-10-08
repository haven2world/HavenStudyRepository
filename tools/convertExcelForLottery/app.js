var xlsx = require('node-xlsx');
var fs = require('fs');

var sheets = xlsx.parse('./temp/工作簿 9月26日10时14分54秒.xlsx');//获取到所有sheets

var sample = JSON.stringify({"sn":"-","name":"秦爽","loc":"成都","laId":"","gaId":"","forLa":"true","forGa":"true","done":"",rtx:"qinshuang"});

var result = [];

//需要根据表格设置
var keyMap = {
	0:'sn',
	1:'name',
	2:'rtx',
	3:'loc'
};

sheets.forEach(function(sheet){
    console.log('start in ' + sheet['name']);
    for(var rowId in sheet['data']){
        var row=sheet['data'][rowId];
        if(rowId == 0){
        	continue;
        }
        let temp = JSON.parse(sample);
        row.forEach((item, index)=>{
        	let key = keyMap[index];

        	if(key){
        		temp[key] = item;
        	}

        })
        result.push(temp);
    }
});

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

let result = [];

const convert = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八',];

let config = [
{
	config:{
    'class': '新春福袋',
    'status': '未开始',
    'scope': '小西山居'
  },
  oneRound:25,
  total:200
},
{
	config:{
    'class': '新春奖',
    'status': '未开始',
    'scope': '小西山居'
  },
  oneRound:30,
  total:380
},
{
	config:{
    'class': '三等奖',
    'status': '未开始',
    'scope': '小西山居'
  },
  oneRound:30,
  total:240
},
{
	config:{
    'class': '二等奖',
    'status': '未开始',
    'scope': '小西山居'
  },
  oneRound:25,
  total:150
},
{
	config:{
    'class': '一等奖',
    'status': '未开始',
    'scope': '小西山居'
  },
  oneRound:20,
  total:80
},
{
	config:{
    'class': '一等奖',
    'status': '未开始',
    'scope': '小西山居'
  },
  oneRound:28,
  total:28
},
{
	config:{
    'class': '特等奖',
    'status': '未开始',
    'scope': '小西山居'
  },
  oneRound:30,
  total:90
},
{
	config:{
    'class': '神秘大奖',
    'status': '未开始',
    'scope': '大西山居'
  },
  oneRound:3,
  total:3
},
{
	config:{
    'class': '魔术环节',
    'status': '未开始',
    'scope': '小西山居'
  },
  oneRound:1,
  total:1
},
{
	config:{
    'class': '老板游戏',
    'status': '未开始',
    'scope': '小西山居'
  },
  oneRound:1,
  total:1
},
];


config.forEach((award, index)=>{
	let roundCount = Math.ceil(award.total/award.oneRound);
	let lastRound = award.total%award.oneRound;

	award.config.classSeq = index + 1;

	for(let i=0;i<roundCount;++i){
		let temp = JSON.parse(JSON.stringify(award.config));
		temp.roundSeq = i + 1;
		temp.round = '第' + convert[i] + '轮';

		if(i === roundCount-1 && lastRound){
			temp.ppl = lastRound;
		}else{
			temp.ppl = award.oneRound;
		}

		result.push(temp);
	}
})

console.log(JSON.stringify(result,null,2));
import React, { Component, useState, useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import hotkeys from 'hotkeys-js'


function App(){
  const [stage, setStage] = useState(0);
  const [input, setInput] = useState('');
  const container = useRef(null);
  const timer = useRef(null);

  const strList = {
    1:'因为你偶然间犯下的错误，导致了十分严重的时空错乱，你将永远失去一件十分重要的东西，除非你在这个梦境中重新找到它，并把它带回它本应出现的地方。\n\n在梦境中所有有生命的都会忘记你。\n\n去寻找这个梦境中异常的痕迹吧,找到它，告诉我',
    2:'他的手机好像落在卧室里了？有两个社交app里好像有什么变化',
    3:'找不到的话，小爱可以帮忙哦',
    4:'小爱同学好像想跟你说点什么',
    5:'你猜猜你找到的是什么',
    6:'去解开梦境吧！'
  }
  let showArr = [];
  for(let i in strList){
    if(i<=stage){
      showArr.push(strList[i]);
    }
  }


  function scroll(){
    timer.current =setTimeout(()=>{
            window.scrollTo(0,container.current.clientHeight);
            scroll();
    },1000)
  }

  hotkeys('alt+r',(e,h)=>{
    setStage(5)
  })

  if(container.current && !timer.current){
    scroll();
  }

  function changeInput(e){
    setInput(e.nativeEvent.target.value)
  }
  function handleInput(){
    let tarMap = {
      1:'你的未来与我有关',
      5:'钥匙'
    }

    let target = tarMap[stage];
    if(input === target){
      if(stage===1){
        setTimeout(()=>{
          setStage(3);
        },10000)
         setTimeout(()=>{
          setStage(4);
        },60000)
      }
      setStage(stage+1);
      setInput('')
    }else{
      alert('不对哦')
    }
  }

  return (
    <div className="App" ref={container} style={{padding:'200px 0'}}>
      <div className="jumbotron" style={{backgroundColor:'#fff'}}>
        <h1>混乱游戏</h1>
        <p>...</p>
        {RenderIf(stage===0)(
        <p><a className="btn btn-ghost btn-lg" href="#" role="button" onClick={()=>setStage(1)}>开始吧</a></p>)}
      </div>
      {showArr.map((str,index)=>{
        return <div style={{padding:'100px 200px'}}  key={index} ><Typer str={str}/></div>
      })}
      {RenderIf(stage === 1||stage===5)(<div className="input-group" style={{width:'50%',marginLeft:'25%'}}>
            <input type="text" className="form-control" placeholder="告诉我点什么" defaultValue={input} onChange={changeInput} />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={handleInput}>确定</button>
            </span>
          </div>)}
      {RenderIf(stage===6)(
        <img src={require('./box.png')} style={{width:'30%',marginLeft:'15%'}}/>)}
    </div>
  );
  
}

export default App;

function Typer({str}){
  const [word, setWord] = useState('_');
  const [len, setLen] = useState(0);
  const timer = useRef(null);

  function addWord(){
    let cur = word.split('_')[0];
    if(len !== str.length){
      cur += str[len];
      setLen(len+1);
      if(cur===str){
        setWord(cur);
      }else{
        timer.current=null;
        setWord(cur+'_');
      }
    }
  }

  if(timer.current===null){
   timer.current = setTimeout(addWord, 150);
  }

  return <div style={{whiteSpace:'pre-line'}}>{word}</div>
}



function RenderIf(flag) {
  return function (viewContent) {
    return flag ? viewContent : null;
  };
}
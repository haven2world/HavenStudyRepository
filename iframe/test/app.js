
var express=require('express');
var ejs=require('ejs');
const proxy = require('http-proxy-middleware');
 
app=express();
//设置渲染文件的目录
app.set('views','./views');
//设置html模板渲染引擎
app.engine('html',ejs.__express);
//设置渲染引擎为html
app.set('view engine','html');
 
//调用路由，进行页面渲染
app.get('/a',function(request,response){
    //调用渲染模板
    response.render('test.ejs',{
        //传参
        title:'首页', content:'Render template'
    });
 
});
app.use(proxy('/test', { target: 'http://doc.xgsdk.com:14444/', pathRewrite:{'^/test':''} , logLevel:'debug'}));
app.listen(8005)
console.log('listen at 8005')

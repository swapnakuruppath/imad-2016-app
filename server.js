var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));
var articles={
 'article-one':{
    title:'article-one',
    heading:'article-one',
    date:'date',
    content:'content'
},
 'article-two':{
     title:'article-two',
    heading:'article-two',
    date:'date',
    content:'content'
},
'article-three':{
    title:'article-three',
    heading:'article-three',
    date:'date',
    content:'content'
    
}
};
function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
var htmlTemplate=`
<html>
    <head>
    <title>
    ${title}
    </title>
    <meta name="viewport" content="width-device-width,initial-scale-1"/>
         <link href="/ui/style.css" rel="stylesheet" />        
       </head>
    <body>
        <div class="container">
             <div>
            <a href="/">home</a>
            </div>
            <hr/>
            <h3>${heading}</h3>
                <div>
                    ${date}
                    </div>
                    <div>
                        <p>
                       ${content}
                        </p>
                    </div>
                    </div>
    </body>
</html>
`;
return htmlTemplate;
}
var counter=0;
app.get('/counter',function(req,res)
{
    counter=counter+1;
    res.send(counter.tostring());
    
});
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/:articlename',function(req,res)
{
    var articlename=req.params.articlename;
res.send(createTemplate(articles[articlename]));

});
app.get('/article-two',function(req,res)
{
   res.send(createTemplate(articletwo));


});
app.get('/article-three',function(req,res)
{
   res.send(createTemplate(articlethree));


});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

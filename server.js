var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
var Pool = require('pg').Pool;
var config={
    user:'swapnakuruppath',
    database:'swapnakuruppath',
    host:'db.imad.hasuro-app.io',
    port:'5432',
    Password:process.env.DB_PASSWORD
};

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
    res.send(counter.toString());
    
});
var pool = new Pool(config);

app.get('/test-db',function(req,res)
{
    pool.query('SELECT * FROM test',function(err,result)
    {
       if (err)
       {
           res.status(500),send(err.tostring());
         
       }
       else
       {
           res.send(JSON.stringify(result.rows));
       }
        
    });
    
});
 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var names=[];
app.get('/submit-name',function(req,res)
{
    var name=req.query.name;
    names.push(name);
   res.send(JSON.stringify(names));


});



app.get('/articles/:articleName',function(req,res)
{
    pool.query("SELECT * FROM article WHERE title="+req.params.articleName,function(err,result)
    {
        if(err)
        {
            res.status(500),send(err.tostring());
                    }
        else if(result.rows.length===0)
        {
            res.status(400),send('Article not found');
        }
        else
        {
            var articleData=result.rows[0];
            res.send(createTemplate(articleData));
        }
        
    });
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


var button=document.getElementById('counter');

button.onclick=function()
{
    var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.Done)
        {
            if(request.status===200)
            
            {
                var counter=request.responseText;
                 var span=document.getElementById('count');
    span.InnerHTML=counter.toString();
            }
        }
    };
    request.open('GET','http://swapnakuruppath.imad.hasura-app.io/counter',true);
    request.send(null);
    
    };
   
console.log('Loaded!');
var element=document.getElementbyid('main-text');
element.innerHtml='new value';
var img=document.getElementbyid('img');
img.onclick=function()
{
    img.style.marginleft='100px';
};
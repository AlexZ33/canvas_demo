> DOM是Web前端领域非常重要的组成部分，不仅在处理HTML元素时会用到DOM，图形编程也同样会用到。比如SVG绘图，各种图形都是以DOM节点的形式插入到页面中，这就意味着可以使用DOM方法对图形进行操作。比如著名的 d3.js就是强大的类似框架。
对此感兴趣的朋友可以查看我的  [d3练习库](https://github.com/JXtreehouse/D3_lessions)

回到canvas，我们在操作svg，html等DOM结构时候常常可以给元素绑定事件：

```
$('#p1').click(function(){…})

```
 完成交互操作，但是这种dom操作在HTML5的canvas里不再适用，Canvas使用的是另外一套机制，无论在Canvas上绘制多少图形，Canvas都是一个整体，图形本身实际都是Canvas的一部分，不可单独获取，所以也就无法直接给某个图形增加JavaScript事件。

在Canvas里，所有图形都绘制在帧上，绘制方法不会将绘制好的图形元素作为一个返回值输出，js也无法获取到已经绘制好的图形元素。比如：

```
 canvas = document.getElementById('mycanvas');
 ctx = canvas.getContext('2d');
theRect = ctx.rect(10,10,100,100);
ctx.stroke();
console.log(theRect);// undefined 
```


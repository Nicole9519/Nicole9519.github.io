var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width =  (document.getElementById('circle-graphic').clientWidth)  - margin.left - margin.right,
    height = document.getElementById('circle-graphic').clientHeight - margin.top - margin.bottom;

var svg = d3.select("#circle-graphic").append("svg")
    .attr('transform','translate(0,0)')
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom);
var circleR = 3;

var legend = ["Not more than $100","$101 to $200","$201 to $300", "More than $300"];

var eb_json = [{"lessthan100":1185,"100to200":1192,"200to300":978,"morethan300":299}]; //41,000- 400 circles
var amazon_json = [{"lessthan100":761,"100to200":896,"200to300":562,"morethan300":574}]; //50,000 500 circles


var data = createCircleData();
var data2 = createCircleDatabyNeigh(); 

console.log(data2);
var simulation = d3.forceSimulation(data);
var simulation2 = d3.forceSimulation(data2);

var axisData = ['lessthan100', '100to200', '200to300', 'morethan300'];


var controller = new ScrollMagic.Controller();
var triggerEls =["#trigger-0", "#trigger-1", "#trigger-2","#trigger-3","#trigger-4","#trigger-5"];
var graphicPlot = d3.select('#circle-graphic');

var Investor = [
   {names:"Non-investor unit", xaxis: 2.8 , yaxis: 6},
   {names :"Investor unit", xaxis:6.3 , yaxis :6 }
   ];

var distances = [
   {names:"Allston", xaxis: 1.5, yaxis: 2.2, count: 379  },
   {names :"Back Bay", xaxis:3,  yaxis: 2.2, count: 460},
   {names:"Bay Village", xaxis: 4.7,  yaxis: 2.2, count: 28},
   {names:"Beacon Hill", xaxis: 6.4,  yaxis: 2.2, count: 251},
   {names:"Brighton", xaxis: 8.2,  yaxis: 2.2, count: 338},

    {names:"Charlestown", xaxis: 1.5, yaxis: 3.7 , count:171},
   {names :"Chinatown", xaxis:3,  yaxis: 3.7, count: 151},
   {names:"Dorchester", xaxis: 4.7,  yaxis: 3.7, count: 521},
   {names:"Downtown", xaxis: 6.4,  yaxis: 3.7, count: 366},
   {names:"East Boston", xaxis: 8.2,  yaxis: 3.7, count: 282},

    {names:"Fenway", xaxis: 1.5, yaxis: 5.2 , count: 474},
   {names :"Hyde Park", xaxis:3,  yaxis: 5.2, count:66},
   {names:"Jamaica Plain", xaxis: 4.7,  yaxis: 5.2, count:494},
   {names:"Leather District", xaxis: 6.4,  yaxis: 5.2, count: 8 },
   {names:"Longwood Medical Area", xaxis: 8.2,  yaxis: 5.2, count: 12},

    {names:"Mattapan", xaxis: 1.5, yaxis: 6.5 , count:47},
   {names :"Mission Hill", xaxis:3,  yaxis: 6.5, count:233},
   {names:"North End", xaxis: 4.7,  yaxis: 6.5, count:246},
   {names:"Roslindale", xaxis: 6.4,  yaxis: 6.5, count:120},
   {names:"Roxbury", xaxis: 8.2,  yaxis: 6.5, count:310},

    {names:"South Boston", xaxis: 1.5, yaxis: 8 , count:331},
   {names :"South Boston Waterfront", xaxis:2.7,  yaxis: 8, count:47},
   {names:"South End", xaxis: 5,  yaxis: 8, count:428},
   {names:"West End", xaxis: 6.4,  yaxis: 8, count:133},
   {names:"West Roxbury", xaxis: 8.2,  yaxis: 8, count:61}
   ];

var textempty = [];


var scenes = triggerEls.map(function(el) {
    var step = +el.split('-')[1];

    var scene = new ScrollMagic.Scene({
        triggerElement: el,
        triggerHook: 'onCenter',
    })

    scene
        .on('enter', function(event) {
            d3.selectAll('.trigger').style('color', '#a4a4a4')
            d3.select(el).style('color', '#000');
            graphicUpdate(step)
        })
        .on('leave', function(event) {
            var nextStep = Math.max(0, step - 1);
            console.log(nextStep);
            d3.selectAll('.trigger').style('color', '#a4a4a4')
            d3.select("#trigger-"+nextStep).style('color', '#000');
            graphicUpdate(nextStep)
            if(step==0){
                graphicPlot.classed('fixed', false);
                graphicPlot.classed('relativeTop', true);
            }
        })

    scene.addTo(controller);
});

var graphicScene = new ScrollMagic.Scene({
    triggerElement: '#circle-graphic',
    triggerHook: '1',
}).on('enter', function () {
    graphicPlot.classed('fixed', true);
});
graphicScene.addTo(controller);



function graphicUpdate(step) {
    if(step == 0){

        var forceX = d3.forceX().x(function (d) {
            graphicPlot.classed('relativeTop', false);
            graphicPlot.classed('fixed', true);
            if(d.attr=='Boston'){
                return width/3
            } else{
                return width/2
            }
        }).strength(1);

        var forceY = d3.forceY().y(function (d) {
            return height/3;
        }).strength(1);
        forceLayout(data, forceX, forceY);
        drawtext(textempty);
       
    } else if(step==1){
        var forceX = d3.forceX().x(function (d) {
            graphicPlot.classed('relativeTop', false);
            graphicPlot.classed('fixed', true);
            if(d.attr=='East Boston'){
                return width/3
            } else{
                return 2*width/3
            }
        }).strength(1);

        var forceY = d3.forceY().y(function (d) {
            return height/2
        }).strength(1);
        forceLayout(data, forceX, forceY);
        drawtext(Investor);
       
 drawlegend(legend);
    } else if(step ==2){

        var forceX = d3.forceX().x(function (d) {
            return barByPriceX(d);
        }).strength(2.5);

        var forceY = d3.forceY().y(function (d) {
            return barByPriceY(d)
        }).strength(2.5);
        forceLayout(data, forceX, forceY);
        drawtext(Investor);
  
    }  else if(step == 3){

        var forceX = d3.forceX().x(function (d) {
      
            if(d.xaxis ==1 ){
                return width/6
            } else if (d.xaxis == 2) {
                return width *2 /6
            } else if (d.xaxis == 3){
                return 3 * width/6
            }else if (d.xaxis == 4){
                return 4 * width/6
            }else if (d.xaxis == 5){
                return 5 * width/6 
            }
        }).strength(1);

        var forceY = d3.forceY().y(function (d) {
            if(d.yaxis ==1 ){
                return height/7
            } else if (d.yaxis == 2) {
                return width *2 /7
            } else if (d.yaxis == 3){
                return 3 * width/7
            } else if (d.yaxis == 4){
                return 4 * width/7
            } else if (d.yaxis == 5){
                return  5* width/7
            }
        }).strength(1);
        forceLayout2(data2, forceX, forceY);
        drawtext(distances);
       
    }  
}
/*
var drawlegend = function(data){
    var color = d3.scaleOrdinal()
                  .range(["#ffcccc", "#ff6666", "#cc0000", "#4d0000"]);

    var legend = svg.selectAll(".legend")
              .data(data)
                .enter().append("g")
              .attr("class", "legend")
              .attr("font-family", "Optima")
              .attr("font-size", 12)
              .attr("transform", function(d, i) { return "translate(80," + i * 20 + ")"; });

          legend.append("rect")
              .attr("x", width - 100)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", color);

          legend.append("text")
              .attr("x", width - 120)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) { return d; });

}
*/

 var drawtext = function(data){
        
    
          var text = svg.selectAll("text")
        .data(data);

    //enter circles
 

      text
        .enter()
        .append("text")
        .attr("class","enter")
        .attr("x", function(d,i){ return d.xaxis * width/10 ;})
        .attr("y", function(d,i){ return d.yaxis * width/10; })
        .text(function(d){ return d.names ;})
        .style("font-size","13")
        .style("font-weight","1000");

     
    //update 

    text
        .transition()
        .duration(1000)
        .attr("x",function(d){ return d.xaxis *width/10 ;})
        .attr("y", function(d,i){ return d.yaxis * width/10;})
        .text( function(d){return d.names ;}) 
        .style("font-size","13")
        .style("font-weight","1000");
    //exit
    

        text.exit().remove();
  
      }     

function barByPriceY(d) {
    return   3 * height/5- Math.floor(d.count/4)*8
}

function barByPriceX(d) {
    var scaleX1 = d3.scaleBand()
        .domain(axisData)
        .range([width/4, width * 2 /4]);

    var scaleX2 = d3.scaleBand()
        .domain(axisData)
        .range([width /4+230, 2* width /4+230]);

    var baseX;
    if(d.attr=='East Boston'){
        baseX = scaleX1(d.Price);
    } else{
        baseX = scaleX2(d.Price)
    }

    if(d.count%4==0){
        return baseX-2 * circleR-2
    } else if(d.count%4==1){
        return baseX
    } else if(d.count%4==2){
        return baseX+2*circleR+2
    }else if(d.count%4==3){
        return baseX+4*circleR+4
    }
}


function forceLayout(data, forceX, forceY) {
    drawCircles(data);
    
    simulation
        .force("collide",d3.forceCollide(circleR).radius(circleR).strength(1) )
        .force("charge", d3.forceManyBody().strength(0.5))
        .restart()
        .alpha(0.06)
        .force('y', forceY)
        .force('x', forceX)
        .on('tick', ticked);
    
    function ticked() {
        d3.selectAll('.circleNode')
            .attr('cx',function(d){
                return d.x
                })
            .attr('cy',function(d){
                return d.y
            })
            .attr('fill', function (d) {
                return colorByPrice(d.Price)
            });
    }
    function colorByPrice(d) {
        if(d=='lessthan100'){
            return '#ffcccc'
        } else if(d=='100to200'){
            return '#ff6666'
        } else if(d=='200to300'){
            return '#cc0000'
        } else if(d=='morethan300'){
            return '#4d0000'
        } 
    }
}

function forceLayout2(data, forceX, forceY) {
    drawCircles(data2);

    simulation2
        .force("collide",d3.forceCollide(circleR).radius(circleR).strength(1) )
        .force("charge", d3.forceManyBody().strength(0.5))
        .restart()
        .alpha(0.06)
        .force('y', forceY)
        .force('x', forceX)
        .on('tick', ticked);
    
    function ticked() {
        d3.selectAll('.circleNode')
            .attr('cx',function(d){
                return d.x
                })
            .attr('cy',function(d){
                return d.y
            })
            .attr('fill', function (d) {
                return colorByPrice(d.Price)
            });
    }
    function colorByPrice(d) {
        if(d=='lessthan100'){
            return '#ffcccc'
        } else if(d=='100to200'){
            return '#ff6666'
        } else if(d=='200to300'){
            return '#cc0000'
        } else if(d=='morethan300'){
            return '#4d0000'
        } 
    }
}

function forceLayout3(data, forceX, forceY) {
    drawCircles(data3);

    simulation3
        .force("collide",d3.forceCollide(circleR).radius(circleR).strength(1) )
        .force("charge", d3.forceManyBody().strength(0.5))
        .restart()
        .alpha(0.06)
        .force('y', forceY)
        .force('x', forceX)
        .on('tick', ticked);
    
    function ticked() {
        d3.selectAll('.circleNode')
            .attr('cx',function(d){
                return d.x
                })
            .attr('cy',function(d){
                return d.y
            })
            .attr('fill', function (d) {
                return colorByPrice(d.Price)
            });
    }
    function colorByPrice(d) {
        if(d =='non'){
            return 'red'
        } else if(d=='inv'){
            return 'blue'
        } 
    }
}

function drawCircles(data) {
    var node = svg.selectAll('.node')
        .data([1]);

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform','translate('+margin.left +',' + margin.top+')');

    var circles = nodeEnter.merge(node).selectAll('.circleNode')
        .data(data)
        .enter();

    var circlesUpdate = circles
        .append('circle')
        .attr('class','circleNode');

    d3.selectAll('.circleNode')
        .attr('r', circleR);

    circles.exit().remove();
}


function createCircleData() {
    var data=[];
    for(var i = 0; i<595; i++){
        if(i< 316){
            var datum = {
                id: i,
                attr: 'East Boston',
                Price: 'other',
            };

            if (i< 118){
                datum.Price = 'lessthan100';
                datum.count = i;
                datum.count2 = i;
            } else if(i< 237){
                datum.Price = '100to200';
                datum.count = i-118;
                datum.count2 = i-118; 
            } else if(i< 286){
                datum.Price = '200to300';
                datum.count = i-237;
                datum.count2 = i-237;
            } else {
                datum.Price = 'morethan300';
                datum.count = i-286;
                datum.count2 = i-286;
            } 
        } else{
            var datum = {
                id: i,
                attr: 'Amazon'
            };
            if(i< 392){
                datum.Price = 'lessthan100';
                datum.count = i-316;
                datum.count2 = i-316+118; 
            } else if(i< 482){
                datum.Price = '100to200';
                datum.count = i-392;
                datum.count2 = i-392+119; 
            } else if(i< 538){
                datum.Price = '200to300';
                datum.count = i-482;
                datum.count2 = i-482+49;
            } else {
                datum.Price = 'morethan300';
                datum.count = i-538;
                datum.count2 = i-538+30;
            } 
        }
        data.push(datum);
    }
    return data;
}




function createCircleDatabyNeigh(Price = 'morethan300';
                datum.count = i-595;
            } 
        }



        data.push(datum);
    }
    return data;
}


function createCircleDatabyNeigh2(Pricetum);
    }
    return data;
}




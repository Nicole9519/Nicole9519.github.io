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
   {names:"Allston", xaxis: 1.5, yaxis: 1.7, count: 379  },
   {names :"Back Bay", xaxis:3,  yaxis: 1.7, count: 460},
   {names:"Bay Village", xaxis: 4.7,  yaxis: 1.7, count: 28},
   {names:"Beacon Hill", xaxis: 6.4,  yaxis: 1.7, count: 251},
   {names:"Brighton", xaxis: 8.2,  yaxis: 1.7, count: 338},

    {names:"Charlestown", xaxis: 1.5, yaxis: 3.0 , count:171},
   {names :"Chinatown", xaxis:3,  yaxis: 3.0, count: 151},
   {names:"Dorchester", xaxis: 4.7,  yaxis: 3.0, count: 521},
   {names:"Downtown", xaxis: 6.4,  yaxis: 3.0, count: 366},
   {names:"East Boston", xaxis: 8.2,  yaxis: 3.0, count: 282},

    {names:"Fenway", xaxis: 1.5, yaxis: 4.2 , count: 474},
   {names :"Hyde Park", xaxis:3,  yaxis: 4.2, count:66},
   {names:"Jamaica Plain", xaxis: 4.7,  yaxis: 4.2, count:494},
   {names:"Leather District", xaxis: 6.4,  yaxis: 4.2, count: 8 },
   {names:"Longwood Medical Area", xaxis: 8.2,  yaxis: 4.2, count: 12},

    {names:"Mattapan", xaxis: 1.5, yaxis: 5.1 , count:47},
   {names :"Mission Hill", xaxis:3,  yaxis:5.1, count:233},
   {names:"North End", xaxis: 4.7,  yaxis: 5.1, count:246},
   {names:"Roslindale", xaxis: 6.4,  yaxis: 5.1, count:120},
   {names:"Roxbury", xaxis: 8.2,  yaxis: 5.1, count:310},

    {names:"South Boston", xaxis: 1.5, yaxis: 6.3 , count:331},
   {names :"South Boston Waterfront", xaxis:2.7,  yaxis:  6.3, count:47},
   {names:"South End", xaxis: 5,  yaxis:  6.3, count:428},
   {names:"West End", xaxis: 6.4,  yaxis:  6.3, count:133},
   {names:"West Roxbury", xaxis: 8.2,  yaxis:  6.3, count:61}
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
       

    } else if(step ==2){

        var forceX = d3.forceX().x(function (d) {
            return barBypriceX(d);
        }).strength(2.5);

        var forceY = d3.forceY().y(function (d) {
            return barBypriceY(d)
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
                return height/9
            } else if (d.yaxis == 2) {
                return width *2 /9
            } else if (d.yaxis == 3){
                return 3 * width/9
            } else if (d.yaxis == 4){
                return 4 * width/9
            } else if (d.yaxis == 5){
                return  5* width/9
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

function barBypriceY(d) {
    return   3 * height/5- Math.floor(d.count/4)*8
}

function barBypriceX(d) {
    var scaleX1 = d3.scaleBand()
        .domain(axisData)
        .range([width/4, width * 2 /4]);

    var scaleX2 = d3.scaleBand()
        .domain(axisData)
        .range([width /4+230, 2* width /4+230]);

    var baseX;
    if(d.attr=='East Boston'){
        baseX = scaleX1(d.price);
    } else{
        baseX = scaleX2(d.price)
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

function forceLayoutempty(data, forceX, forceY) {
    drawCircles(data2);
    
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
            .attr('fill',"white")
            .attr("opacity","0");
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
                return colorByprice(d.price)
            });
    }
    function colorByprice(d) {
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
                return colorByprice(d.price)
            });
    }
    function colorByprice(d) {
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
                return colorByprice(d.price)
            });
    }
    function colorByprice(d) {
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
                price: 'other',
            };

            if (i< 118){
                datum.price = 'lessthan100';
                datum.count = i;
                datum.count2 = i;
            } else if(i< 237){
                datum.price = '100to200';
                datum.count = i-118;
                datum.count2 = i-118; 
            } else if(i< 286){
                datum.price = '200to300';
                datum.count = i-237;
                datum.count2 = i-237;
            } else {
                datum.price = 'morethan300';
                datum.count = i-286;
                datum.count2 = i-286;
            } 
        } else{
            var datum = {
                id: i,
                attr: 'Amazon'
            };
            if(i< 392){
                datum.price = 'lessthan100';
                datum.count = i-316;
                datum.count2 = i-316+118; 
            } else if(i< 482){
                datum.price = '100to200';
                datum.count = i-392;
                datum.count2 = i-392+119; 
            } else if(i< 538){
                datum.price = '200to300';
                datum.count = i-482;
                datum.count2 = i-482+49;
            } else {
                datum.price = 'morethan300';
                datum.count = i-538;
                datum.count2 = i-538+30;
            } 
        }
        data.push(datum);
    }
    return data;
}




function createCircleDatabyNeigh() {
    var data =[];

    for(var i = 0; i<595; i++){
        if(i< 38){
            var datum = {
                id: i,
                attr: 'Allston',
                yaxis:1,
                xaxis:1
            };

            if (i< 23){
                datum.price = 'lessthan100';
                datum.count = i;

            } else if(i< 31){
                datum.price = '100to200';
                datum.count = i-23;
          
            } else if(i< 34){
                datum.price = '200to300';
                datum.count = i-31;
               
            } else {
                datum.price = 'morethan300';
                datum.count = i-34;
            
            }
        } else if (i<84) {
            var datum = {
                id: i,
                attr: 'Back Bay',
                yaxis:1,
                xaxis:2
            };
            if(i< 42){
                datum.price = 'lessthan100';
                datum.count = i-38;
            } else if(i< 60){
                datum.price = '100to200';
                datum.count = i-42;
            } else if(i< 72){
                datum.price = '200to300';
                datum.count = i-60;
            } else {
                datum.price = 'morethan300';
                datum.count = i-72;
            }  
        } else if (i < 88) {
            var datum = {
                id: i,
                attr: 'Bay Village',
                 yaxis:1,
                 xaxis:3
            };
            if(i< 84){
                datum.price = 'lessthan100';
                datum.count = i-84;
            } else if(i< 86){
                datum.price = '100to200';
                datum.count = i-84;

            } else if(i< 87){
                datum.price = '200to300';
                datum.count = i-86;
            } else {
                datum.price = 'morethan300';
                datum.count = i-87;
            }
        } else if (i<113) {
            var datum = {
                id: i,
                attr: 'Beacon Hill',
                 yaxis:1,
                 xaxis:4
            };
            if(i< 92){
                datum.price = 'lessthan100';
                datum.count = i-88;
            } else if(i< 107){
                datum.price = '100to200';
                datum.count = i-92;
            } else if(i< 111){
                datum.price = '200to300';
                datum.count = i-107;
            } else {
                datum.price = 'morethan300';
                datum.count = i-111;
            }
        } else if (i<148) {
            var datum = {
                id: i,
                attr: 'Brighton',
                 yaxis:1,
                 xaxis:5
            };
            if(i< 134){
                datum.price = 'lessthan100';
                datum.count = i-113;
            } else if(i< 143){
                datum.price = '100to200';
                datum.count = i-134;
            } else if(i< 146){
                datum.price = '200to300';
                datum.count = i-143;
            } else {
                datum.price = 'morethan300';
                datum.count = i-146;
            } 

        } else if (i<165) {
            var datum = {
                id: i,
                attr: 'Charlestown',
                yaxis:2,
                xaxis:1
            };
            if(i< 152){
                datum.price = 'lessthan100';
                datum.count = i-148;
            } else if(i< 159){
                datum.price = '100to200';
                datum.count = i-152;
            } else if(i< 162){
                datum.price = '200to300';
                datum.count = i-159;
            } else {
                datum.price = 'morethan300';
                datum.count = i-162;
            } 

        } else if (i<181) {
            var datum = {
                id: i,
                attr: 'Chinatown',
                yaxis:2,
                xaxis:2
            };
            if(i< 167){
                datum.price = 'lessthan100';
                datum.count = i-165;
            } else if(i< 172){
                datum.price = '100to200';
                datum.count = i-167;
            } else if(i< 177){
                datum.price = '200to300';
                datum.count = i-172;
            } else {
                datum.price = 'morethan300';
                datum.count = i-177;
            } 

        } else if (i<233) {
            var datum = {
                id: i,
                attr: 'Dorchester',
                yaxis:2,
                xaxis:3
            };
            if(i< 218){
                datum.price = 'lessthan100';
                datum.count = i-181;
            } else if(i< 230){
                datum.price = '100to200';
                datum.count = i-218;
            } else if(i< 233){
                datum.price = '200to300';
                datum.count = i-230;
            } else {
                datum.price = 'morethan300';
                datum.count = i-230;
            } 

        } else if (i<269) {
            var datum = {
                id: i,
                attr: 'Downtown',
                yaxis:2,
                xaxis:4
            };
            if(i< 235){
                datum.price = 'lessthan100';
                datum.count = i-233;
            } else if(i< 245){
                datum.price = '100to200';
                datum.count = i-235;
            } else if(i< 256){
                datum.price = '200to300';
                datum.count = i-245;
            } else {
                datum.price = 'morethan300';
                datum.count = i-256;
            } 

        } else if (i<297) {
            var datum = {
                id: i,
                attr: 'East Boston',
                yaxis:2,
                xaxis:5
            };
            if(i< 285){
                datum.price = 'lessthan100';
                datum.count = i-269;
            } else if(i< 294){
                datum.price = '100to200';
                datum.count = i-285;
            } else if(i< 297){
                datum.price = '200to300';
                datum.count = i-294;
            } else {
                datum.price = 'morethan300';
                datum.count = i-297;
            } 

        } else if (i<345) {
            var datum = {
                id: i,
                attr: 'Fenway',
                yaxis:3,
                xaxis:1
            };
            if(i< 305){
                datum.price = 'lessthan100';
                datum.count = i-297;
            } else if(i< 322){
                datum.price = '100to200';
                datum.count = i-305;
            } else if(i< 335){
                datum.price = '200to300';
                datum.count = i-322;
            } else {
                datum.price = 'morethan300';
                datum.count = i-335;
            } 

        } else if (i<352) {
            var datum = {
                id: i,
                attr: 'Hyde Park',
                yaxis:3,
                xaxis:2
            };
            if(i< 351){
                datum.price = 'lessthan100';
                datum.count = i-345;
            } else if(i< 352){
                datum.price = '100to200';
                datum.count = i-351;
            } else if(i< 352){
                datum.price = '200to300';
                datum.count = i-352;
            } else {
                datum.price = 'morethan300';
                datum.count = i-352;
            } 

        } else if (i<401) {
            var datum = {
                id: i,
                attr: 'Jamaica Plain',
                yaxis:3,
                xaxis:3
            };
            if(i< 374){
                datum.price = 'lessthan100';
                datum.count = i-352;
            } else if(i< 392){
                datum.price = '100to200';
                datum.count = i-374;
            } else if(i< 398){
                datum.price = '200to300';
                datum.count = i-392;
            } else {
                datum.price = 'morethan300';
                datum.count = i-398;
            } 

        } else if (i<402) {
            var datum = {
                id: i,
                attr: 'Leather District',
                yaxis:3,
                xaxis:4
            };
            if(i< 401){
                datum.price = 'lessthan100';
                datum.count = i-401;
            } else if(i< 402){
                datum.price = '100to200';
                datum.count = i-401;
            } else if(i< 402){
                datum.price = '200to300';
                datum.count = i-402;
            } else {
                datum.price = 'morethan300';
                datum.count = i-402;
            } 

        } else if (i<403) {
            var datum = {
                id: i,
                attr: 'Longwood Medical Area',
                yaxis:3,
                xaxis:5
            };
            if(i< 403){
                datum.price = 'lessthan100';
                datum.count = i-402;
            } else if(i< 402){
                datum.price = '100to200';
                datum.count = i-402;
            } else if(i< 402){
                datum.price = '200to300';
                datum.count = i-402;
            } else {
                datum.price = 'morethan300';
                datum.count = i-402;
            } 

        } else if (i<407) {
            var datum = {
                id: i,
                attr: 'Mattapan',
                yaxis:4,
                xaxis:1
            };
            if(i< 407){
                datum.price = 'lessthan100';
                datum.count = i-403;
            } else if(i< 407){
                datum.price = '100to200';
                datum.count = i-407;
            } else if(i< 407){
                datum.price = '200to300';
                datum.count = i-407;
            } else {
                datum.price = 'morethan300';
                datum.count = i-407;
            } //1

        } else if (i<430) {
            var datum = {
                id: i,
                attr: 'Mission Hill',
                yaxis:4,
                xaxis:2
            };
            if(i< 415){
                datum.price = 'lessthan100';
                datum.count = i-407;
            } else if(i< 421){
                datum.price = '100to200';
                datum.count = i-415;
            } else if(i< 426){
                datum.price = '200to300';
                datum.count = i-421;
            } else {
                datum.price = 'morethan300';
                datum.count = i-426;
            } //2

        } else if (i<455) {
            var datum = {
                id: i,
                attr: 'North End',
                yaxis:4,
                xaxis:3
            };
            if(i< 434){
                datum.price = 'lessthan100';
                datum.count = i-430;
            } else if(i< 449){
                datum.price = '100to200';
                datum.count = i-434;
            } else if(i< 453){
                datum.price = '200to300';
                datum.count = i-449;
            } else {
                datum.price = 'morethan300';
                datum.count = i-453;
            } //2
 
        } else if (i<467) {
            var datum = {
                id: i,
                attr: 'Roslindale',
                yaxis:4,
                xaxis:4
            };
            if(i< 464){
                datum.price = 'lessthan100';
                datum.count = i-455;
            } else if(i< 467){
                datum.price = '100to200';
                datum.count = i-464;
            } else if(i< 467){
                datum.price = '200to300';
                datum.count = i-467;
            } else {
                datum.price = 'morethan300';
                datum.count = i-467;
            }//2
        } else if (i<497) {
            var datum = {
                id: i,
                attr: 'Roxbury',
                yaxis:4,
                xaxis:4
            };
            if(i< 485){
                datum.price = 'lessthan100';
                datum.count = i-466;
            } else if(i< 493){
                datum.price = '100to200';
                datum.count = i-485;
            } else if(i< 495){
                datum.price = '200to300';
                datum.count = i-493;
            } else {
                datum.price = 'morethan300';
                datum.count = i-495;
            }//3
        } else if (i<529) {
            var datum = {
                id: i,
                attr: 'South Boston',
                yaxis:5,
                xaxis:1
            };
            if(i< 502){
                datum.price = 'lessthan100';
                datum.count = i-496;
            } else if(i< 518){
                datum.price = '100to200';
                datum.count = i-502;
            } else if(i< 523){
                datum.price = '200to300';
                datum.count = i-518;
            } else {
                datum.price = 'morethan300';
                datum.count = i-523;
            } //4
 
        } else if (i<532) {
            var datum = {
                id: i,
                attr: 'South Boston Waterfront',
                yaxis:5,
                xaxis:2
            };
            if(i< 528){
                datum.price = 'lessthan100';
                datum.count = i-528;
            } else if(i< 530){
                datum.price = '100to200';
                datum.count = i-528;
            } else if(i< 531){
                datum.price = '200to300';
                datum.count = i-530;
            } else {
                datum.price = 'morethan300';
                datum.count = i-531;
            } //6
 
        } else if (i<575) {
            var datum = {
                id: i,
                attr: 'South End',
                yaxis:5,
                xaxis:3
            };
            if(i< 538){
                datum.price = 'lessthan100';
                datum.count = i-532;
            } else if(i< 561){
                datum.price = '100to200';
                datum.count = i-538;
            } else if(i< 568){
                datum.price = '200to300';
                datum.count = i-561;
            } else {
                datum.price = 'morethan300';
                datum.count = i-568;
            } 
 
        } else if (i<589) {
            var datum = {
                id: i,
                attr: 'West End',
                yaxis:5,
                xaxis:4
            };
            if(i< 577){
                datum.price = 'lessthan100';
                datum.count = i-575;
            } else if(i< 582){
                datum.price = '100to200';
                datum.count = i-577;
            } else if(i< 587){
                datum.price = '200to300';
                datum.count = i-582;
            } else {
                datum.price = 'morethan300';
                datum.count = i-587;
            } 
        } else if (i<595) {
            var datum = {
                id: i,
                attr: 'West Roxbury',
                yaxis:5,
                xaxis:5
            };
            if(i< 593){
                datum.price = 'lessthan100';
                datum.count = i-589;
            } else if(i< 594){
                datum.price = '100to200';
                datum.count = i-593;
            } else if(i< 595){
                datum.price = '200to300';
                datum.count = i-594;
            } else {
                datum.price = 'morethan300';
                datum.count = i-595;
            } 
        }



        data.push(datum);
    }
    return data;
}


function createCircleDatabyNeigh2() {
    var data =[];

    for(var i = 0; i<595; i++){
        if(i< 38){
            var datum = {
                id: i,
                attr: 'Allston',
                yaxis:1,
                xaxis:1
            };

            if (i< 20){
                datum.price = 'non';
                datum.count = i;

            } else{
                datum.price = 'inv';
                datum.count = i-20;
          
            } 
        } else if (i<84) {
            var datum = {
                id: i,
                attr: 'Back Bay',
                yaxis:1,
                xaxis:2
            };
            if(i< 58){
                datum.price = 'non';
                datum.count = i-38;
            } else {
                datum.price = 'inv';
                datum.count = i-58;
            } 
        } else if (i < 88) {
            var datum = {
                id: i,
                attr: 'Bay Village',
                 yaxis:1,
                 xaxis:3
            };
            if(i< 86){
                datum.price = 'non';
                datum.count = i-84;
            } else {
                datum.price = 'inv';
                datum.count = i-86;

            } 
        } else if (i<113) {
            var datum = {
                id: i,
                attr: 'Beacon Hill',
                 yaxis:1,
                 xaxis:4
            };
            if(i< 103){
                datum.price = 'non';
                datum.count = i-88;
            } else {
                datum.price = 'inv';
                datum.count = i-103;
            } 
        } else if (i<148) {
            var datum = {
                id: i,
                attr: 'Brighton',
                 yaxis:1,
                 xaxis:5
            };
            if(i< 136){
                datum.price = 'non';
                datum.count = i-113;
            } else {
                datum.price = 'inv';
                datum.count = i-136;
            } 

        } else if (i<165) {
            var datum = {
                id: i,
                attr: 'Charlestown',
                yaxis:2,
                xaxis:1
            };
            if(i< 160){
                datum.price = 'non';
                datum.count = i-148;
            } else {
                datum.price = 'inv';
                datum.count = i-160;
            } 
        } else if (i<181) {
            var datum = {
                id: i,
                attr: 'Chinatown',
                yaxis:2,
                xaxis:2
            };
            if(i< 168){
                datum.price = 'non';
                datum.count = i-165;
            } else{
                datum.price = 'inv';
                datum.count = i-168;
            } 
        } else if (i<233) {
            var datum = {
                id: i,
                attr: 'Dorchester',
                yaxis:2,
                xaxis:3
            };
            if(i< 206){
                datum.price = 'non';
                datum.count = i-181;
            } else{
                datum.price = 'inv';
                datum.count = i-206;
            } 

        } else if (i<269) {
            var datum = {
                id: i,
                attr: 'Downtown',
                yaxis:2,
                xaxis:4
            };
            if(i< 246){
                datum.price = 'non';
                datum.count = i-233;
            } else {
                datum.price = 'inv';
                datum.count = i-246;
            }
        } else if (i<297) {
            var datum = {
                id: i,
                attr: 'East Boston',
                yaxis:2,
                xaxis:5
            };
            if(i< 287){
                datum.price = 'non';
                datum.count = i-269;
            } else {
                datum.price = 'inv';
                datum.count = i-287;
            } 
        } else if (i<345) {
            var datum = {
                id: i,
                attr: 'Fenway',
                yaxis:3,
                xaxis:1
            };
            if(i< 315){
                datum.price = 'non';
                datum.count = i-297;
            } else {
                datum.price = 'inv';
                datum.count = i-315;
            }

        } else if (i<352) {
            var datum = {
                id: i,
                attr: 'Hyde Park',
                yaxis:3,
                xaxis:2
            };
            if(i< 350){
                datum.price = 'non';
                datum.count = i-345;
            } else {
                datum.price = 'inv';
                datum.count = i-350;
            } 

        } else if (i<401) {
            var datum = {
                id: i,
                attr: 'Jamaica Plain',
                yaxis:3,
                xaxis:3
            };
            if(i< 389){
                datum.price = 'non';
                datum.count = i-352;
            } else {
                datum.price = 'inv';
                datum.count = i-389;
            } 

        } else if (i<402) {
            var datum = {
                id: i,
                attr: 'Leather District',
                yaxis:3,
                xaxis:4
            };
            if(i< 402){
                datum.price = 'non';
                datum.count = i-401;
            } else {
                datum.price = 'inv';
                datum.count = i-402;
            } 

        } else if (i<403) {
            var datum = {
                id: i,
                attr: 'Longwood Medical Area',
                yaxis:3,
                xaxis:5
            };
            if(i< 403){
                datum.price = 'non';
                datum.count = i-402;
            } else {
                datum.price = 'inv';
                datum.count = i-403;
            } 

        } else if (i<407) {
            var datum = {
                id: i,
                attr: 'Mattapan',
                yaxis:4,
                xaxis:1
            };
            if(i< 406){
                datum.price = 'non';
                datum.count = i-403;
            } else {
                datum.price = 'inv';
                datum.count = i-406;
            }  

        } else if (i<430) {
            var datum = {
                id: i,
                attr: 'Mission Hill',
                yaxis:4,
                xaxis:2
            };
            if(i< 416){
                datum.price = 'non';
                datum.count = i-407;
            } else {
                datum.price = 'inv';
                datum.count = i-416;
            }

        } else if (i<455) {
            var datum = {
                id: i,
                attr: 'North End',
                yaxis:4,
                xaxis:3
            };
            if(i< 442){
                datum.price = 'non';
                datum.count = i-430;
            } else {
                datum.price = 'inv';
                datum.count = i-442;
            } 
 
        } else if (i<467) {
            var datum = {
                id: i,
                attr: 'Roslindale',
                yaxis:4,
                xaxis:4
            };
            if(i< 463){
                datum.price = 'non';
                datum.count = i-455;
            } else {
                datum.price = 'inv';
                datum.count = i-463;
            } 

        } else if (i<497) {
            var datum = {
                id: i,
                attr: 'Roxbury',
                yaxis:4,
                xaxis:4
            };
            if(i< 482){
                datum.price = 'non';
                datum.count = i-466;
            } else {
                datum.price = 'inv';
                datum.count = i-482;
            } 

        } else if (i<529) {
            var datum = {
                id: i,
                attr: 'South Boston',
                yaxis:5,
                xaxis:1
            };
            if(i< 516){
                datum.price = 'non';
                datum.count = i-496;
            } else {
                datum.price = 'inv';
                datum.count = i-516;
            } 
 
        } else if (i<532) {
            var datum = {
                id: i,
                attr: 'South Boston Waterfront',
                yaxis:5,
                xaxis:2
            };
            if(i< 531){
                datum.price = 'non';
                datum.count = i-528;
            } else {
                datum.price = 'inv';
                datum.count = i-531;
            } 
 
        } else if (i<575) {
            var datum = {
                id: i,
                attr: 'South End',
                yaxis:5,
                xaxis:3
            };
            if(i< 556){
                datum.price = 'non';
                datum.count = i-532;
            } else {
                datum.price = 'inv';
                datum.count = i-556;
            } 
 
        } else if (i<589) {
            var datum = {
                id: i,
                attr: 'West End',
                yaxis:5,
                xaxis:4
            };
            if(i< 577){
                datum.price = 'non';
                datum.count = i-575;
            } else {
                datum.price = 'inv';
                datum.count = i-577;
            } 
        } else if (i<595) {
            var datum = {
                id: i,
                attr: 'West Roxbury',
                yaxis:5,
                xaxis:5
            };
            if(i< 594){
                datum.price = 'non';
                datum.count = i-589;
            } else {
                datum.price = 'inv';
                datum.count = i-594;
            } 
        }



        data.push(datum);
    }
    return data;
}



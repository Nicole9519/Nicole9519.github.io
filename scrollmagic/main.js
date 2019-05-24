

var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width =  (document.getElementById('circle-graphic').clientWidth)  - margin.left - margin.right,
    height = document.getElementById('circle-graphic').clientHeight - margin.top - margin.bottom;

var svg = d3.select("#circle-graphic").append("svg")
    .attr('transform','translate(0,0)')
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom);
var circleR = 3;

var radiusScale = d3.scaleSqrt().domain([0, 1]).range([0, 1])




var eb_json = [{"hispanic":55,"white":34,"black":5,"asian":3,"other":3}]; //41,000- 400 circles
var amazon_json = [{"hispanic":13,"white":48,"black":21,"asian":13,"other":5}]; //50,000 500 circles



var axisData = ['hispanic', 'white', 'black', 'asian', 'other'];


var controller = new ScrollMagic.Controller();
var triggerEls =["#trigger-0", "#trigger-1", "#trigger-2","#trigger-3","#trigger-4","#trigger-5"];
var graphicPlot = d3.select('#circle-graphic');

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


    if(step==0){
      var forceX = d3.forceX(function(d){
    if(d.neighbourhood ==="Allston") {
      return (width * .10) 
    } else if(d.neighbourhood === "Back Bay"){
      return (width * .30) 
    } else if(d.neighbourhood ==="Bay Village"){
      return (width * .50)
    } else if (d.neighbourhood ==="Beacon Hill"){
      return (width * .70)
    } else if (d.neighbourhood ==="Brighton"){
      return (width * .90)
    } else if (d.neighbourhood ==="Charlestown"){
      return (width * .10)
    } else if (d.neighbourhood ==="Chinatown"){
      return (width * .30)
    } else if (d.neighbourhood ==="Dorchester"){
      return (width * .50)
    } else if (d.neighbourhood ==="Downtown"){
      return (width * .70)
    } else if (d.neighbourhood ==="East Boston"){
      return (width * .90)
    } else if (d.neighbourhood ==="Fenway"){
      return (width * .10)
    } else if (d.neighbourhood ==="Hyde Park"){
      return (width * .30)
    } else if (d.neighbourhood ==="Jamaica Plain"){
      return (width * .50)
    } else if (d.neighbourhood ==="Leather District"){
      return (width * .70)
    } else if (d.neighbourhood ==="Longwood Medical Area"){
      return (width * .90)
    } else if (d.neighbourhood ==="Mattapan"){
      return (width * .10)
    } else if (d.neighbourhood ==="Mission Hill"){
      return (width * .30)
    } else if (d.neighbourhood ==="North End"){
      return (width * .50)
    } else if (d.neighbourhood ==="Roslindale"){
      return (width * .70)
    } else if (d.neighbourhood ==="Roxbury"){
      return (width * .90)
    } else if (d.neighbourhood ==="South Boston"){
      return (width * .10)
    } else if (d.neighbourhood ==="South Boston Waterfront"){
      return (width * .30)
    } else if (d.neighbourhood ==="South End"){
      return (width * .50)
    } else if (d.neighbourhood ==="West End"){
      return (width * .70)
    } else if (d.neighbourhood ==="West Roxbury"){
      return (width * .90)
    } 
  }).strength(0.15);

      var forceY = d3.forceY(function(d){
    if(d.neighbourhood ==="Allston") {
      return (height * .10) 
    } else if(d.neighbourhood === "Back Bay"){
      return (height * .10) 
    } else if(d.neighbourhood ==="Bay Village"){
      return (height * .10)
    } else if (d.neighbourhood ==="Beacon Hill"){
      return (height * .10)
    } else if (d.neighbourhood ==="Brighton"){
      return (height * .10)
    } else if (d.neighbourhood ==="Charlestown"){
      return (height * .30)
    } else if (d.neighbourhood ==="Chinatown"){
      return (height * .30)
    } else if (d.neighbourhood ==="Dorchester"){
      return (height * .30)
    } else if (d.neighbourhood ==="Downtown"){
      return (height * .30)
    } else if (d.neighbourhood ==="East Boston"){
      return (height * .30)
    } else if (d.neighbourhood ==="Fenway"){
      return (height * .50)
    } else if (d.neighbourhood ==="Hyde Park"){
      return (height * .50)
    } else if (d.neighbourhood ==="Jamaica Plain"){
      return (height * .50)
    } else if (d.neighbourhood ==="Leather District"){
      return (height * .50)
    } else if (d.neighbourhood ==="Longwood Medical Area"){
      return (height * .50)
    } else if (d.neighbourhood ==="Mattapan"){
      return (height * .70)
    } else if (d.neighbourhood ==="Mission Hill"){
      return (height * .70)
    } else if (d.neighbourhood ==="North End"){
      return (height * .70)
    } else if (d.neighbourhood ==="Roslindale"){
      return (height * .70)
    } else if (d.neighbourhood ==="Roxbury"){
      return (height * .70)
    }  else if (d.neighbourhood ==="South Boston"){
      return (height * .90)
    } else if (d.neighbourhood ==="South Boston Waterfront"){
      return (height * .90)
    } else if (d.neighbourhood ==="South End"){
      return (height * .90)
    } else if (d.neighbourhood ==="West End"){
      return (height * .90)
    } else if (d.neighbourhood ==="West Roxbury"){
      return (height * .90)
  }
}).strength(0.15); 
        forceLayout(data, forceX, forceY);

    } else if(step ==1){

        var forceX = d3.forceX().x(function (d) {
            return barByRaceX(d);
        }).strength(2.5);

        var forceY = d3.forceY().y(function (d) {
            return barByRaceY(d)
        }).strength(2.5);
        forceLayout(data, forceX, forceY);
    } else if(step ==2){

        var forceX = d3.forceX().x(function (d) {
            return barByRaceX2(d);
        }).strength(2.5);

        var forceY = d3.forceY().y(function (d) {
            return barByRaceY2(d)
        }).strength(2.5);

        forceLayout(data, forceX, forceY);
    }

  }

/*

function barByRaceY(d) {
    return 4*height/5-Math.floor(d.count/4)*8
}
function barByRaceY2(d) {
    return 8*height/9-Math.floor(d.count2/5)*8
}

function barByRaceX(d) {
    var scaleX1 = d3.scaleBand()
        .domain(axisData)
        .range([0, width/3]);

    var scaleX2 = d3.scaleBand()
        .domain(axisData)
        .range([width/3+60, 2*width/3+60]);

    var baseX;
    if(d.attr=='East Boston'){
        baseX = scaleX1(d.race);
    } else{
        baseX = scaleX2(d.race)
    }

    if(d.count%4==0){
        return baseX-2*circleR-2
    } else if(d.count%4==1){
        return baseX
    } else if(d.count%4==2){
        return baseX+2*circleR+2
    }else if(d.count%4==3){
        return baseX+4*circleR+4
    }
}
function barByRaceX2(d) {
    var scaleX = d3.scaleBand()
        .domain(axisData)
        .range([width/4, 3*width/4]);

    var baseX = scaleX(d.race);

    if(d.count2%5==0){
        return baseX-4*circleR-4
    } else if(d.count2%5==1){
        return baseX-2*circleR-2
    } else if(d.count2%5==2){
        return baseX
    } else if(d.count2%5==3){
        return baseX+2*circleR+2
    }else if(d.count2%5==4){
        return baseX+4*circleR+4
    }
}
*/

function forceLayout(data, forceXSplit, forceYSplit) {

  display(data);
  console.log(data);

    var simulation = d3.forceSimulation()
     .force("x", forceXSplit)
     .force("y", forceYSplit)
    .force("collide", forceCollide) 

     function ticked() {
    circles
      .attr("cx", function(d) {
        return d.x
      })
      .attr("cy", function(d) {
        return d.y
      })
  }


    simulation.nodes(data)
    .on('tick', ticked)


    function colorByRace(d) {
        if(d=='hispanic'){
            return '#4281A4'
        } else if(d=='white'){
            return '#FE938C'
        } else if(d=='black'){
            return '#9CAFB7'
        } else if(d=='asian'){
            return '#E6B89C'
        } else {
            return '#EAD2AC'
        }
    }
}

/*function drawCircles(data) {
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
    for(var i = 0; i<900; i++){
        if(i< 400){
            var datum = {
                id: i,
                attr: 'East Boston',
                race: 'other',
            };

            if (i< 220){
                datum.race = 'hispanic';
                datum.count = i;
                datum.count2 = i;
            } else if(i< 356){
                datum.race = 'white';
                datum.count = i-220;
                datum.count2 = i-220; //136
            } else if(i< 376){
                datum.race = 'black';
                datum.count = i-356;
                datum.count2 = i-356;
            } else if(i< 388){
                datum.race = 'asian';
                datum.count = i-376;
                datum.count2 = i-376;
            } else {
                datum.race = 'other';
                datum.count = i-388;
                datum.count2 = i-388;
            }
        } else{
            var datum = {
                id: i,
                attr: 'Amazon'
            };
            if(i< 465){
                datum.race = 'hispanic';
                datum.count = i-400;
                datum.count2 = i-400+220; //65
            } else if(i< 705){
                datum.race = 'white';
                datum.count = i-465;
                datum.count2 = i-465+136; //65
            } else if(i< 810){
                datum.race = 'black';
                datum.count = i-705;
                datum.count2 = i-705+20;
            } else if(i< 875){
                datum.race = 'asian';
                datum.count = i-810;
                datum.count2 = i-810+12;
            } else{
                datum.race = 'other';
                datum.count = i-875;
                datum.count2 = i-875+12;
            }
        }
        data.push(datum);
    }
    return data;
}*/


function display(data) {
  // create a new plot and
  // display it

  var data;

  var circles = svg.selectAll(".Character")
  .data(data)
  .enter().append("circle")
  .attr("class", "Character")
  .attr("r", function(d){
    return radiusScale(d.coli)
  })
  .style("fill", function(d) { 
    var returnColor;
    var simulation = d3.forceSimulation(data);
    if(d.price  <= 100) {
      returnColor = "#355C7D";
    } else if(d.price <= 200){
      returnColor = "yellow";
    } else if(d.price <=300){
      returnColor = "red";
    } else if (d.price > 300){
      returnColor = "black";
    };
    return returnColor;
  })
  .on("mouseover", function(d) {
              tooltip.html("<strong>" +d.name + "</strong><br>Host name: " + d.host_name + "<br> Location: " + d.neighbourhood + "<br>Room type: " + d.room_type +"<br>Average price: $" + d.price);
              tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {
          return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      })
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


var simulation = d3.forceSimulation(data);




//var forceXCombine = d3.forceX((width)/2).strength(0.1);
//var forceYCombine = d3.forceY((width)/2).strength(0.1);


var forceCollide = d3.forceCollide(function(d){
    return radiusScale(d.coli) + 0.5;
  })





  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("color", "black")
    .style("padding", "8px")
    .style("background-color", "rgba(255, 255, 255, 0.9)")
    .style("border-radius", "6px")
    .style("font", "10px sans-serif")
    .style("box-shadow", " 0 1px 5px rgba(0, 0, 0, 0.4)")
    .text("");  

    d3.select('.container main-container')
    .datum(data);
}

// load data and display
d3.csv('air18.csv', display);


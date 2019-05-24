


 let spacing = 40;
    let rows = 10;
    let column = 10;
    let randnum = (min,max) => Math.round( Math.random() * (max-min) + min );

var width = 500,
    height = 500;

var svg = d3.select("#viz")
  .append("svg")
  .attr("height", height)
  .attr("width", width)
  .append("g")
  .attr("transform", "translate(0,0)")


var myData = [12,24,13,14,23];
  var newData = [14,22,40,30,13,45];
  var newData2 = [13, 45, 0 ,23];

var Investor = [
   {names:"Non-investor", xaxis: 1.3 , yaxis: 3.5},
   {names :"Investor", xaxis:4.3 , yaxis :3.5 }
   ];

 var distances = [
   {names:"Allston", xaxis: 1, yaxis: 1, count: 379  },
   {names :"Back Bay", xaxis:2,  yaxis: 1, count: 460},
   {names:"Bay Village", xaxis: 3,  yaxis: 1, count: 28},
   {names:"Beacon Hill", xaxis: 4,  yaxis: 1, count: 251},
   {names:"Brighton", xaxis: 5,  yaxis: 1, count: 338},

    {names:"Charlestown", xaxis: 1, yaxis: 2 , count:171},
   {names :"Chinatown", xaxis:2,  yaxis: 2, count: 151},
   {names:"Dorchester", xaxis: 3,  yaxis: 2, count: 521},
   {names:"Downtown", xaxis: 4,  yaxis: 2, count: 366},
   {names:"East Boston", xaxis: 5,  yaxis: 2, count: 282},

    {names:"Fenway", xaxis: 1, yaxis: 3 , count: 474},
   {names :"Hyde Park", xaxis:2,  yaxis: 3, count:66},
   {names:"Jamaica Plain", xaxis: 3,  yaxis: 3, count:494},
   {names:"Leather District", xaxis: 4,  yaxis: 3, count: 8 },
   {names:"Longwood Medical Area", xaxis: 5,  yaxis: 3, count: 12},

    {names:"Mattapan", xaxis: 1, yaxis: 4 , count:47},
   {names :"Mission Hill", xaxis:2,  yaxis: 4, count:233},
   {names:"North End", xaxis: 3,  yaxis: 4, count:246},
   {names:"Roslindale", xaxis: 4,  yaxis: 4, count:120},
   {names:"Roxbury", xaxis: 5,  yaxis: 4, count:310},

    {names:"South Boston", xaxis: 1, yaxis: 5 , count:331},
   {names :"South Boston Waterfront", xaxis:2,  yaxis: 5, count:47},
   {names:"South End", xaxis: 3,  yaxis: 5, count:428},
   {names:"West End", xaxis: 4,  yaxis: 5, count:133},
   {names:"West Roxbury", xaxis: 5,  yaxis: 5, count:61}
   ];

   var textempty = [];

  var drawCircles = function(data){
        
        var svg = d3.select("#viz");

          var text = svg.selectAll("text")
        .data(data);

    //enter circles
 

      text
        .enter()
        .append("text")
        .attr("class","enter")
        .attr("x", function(d,i){ return d.xaxis * 100 - 90 ;})
        .attr("y", function(d,i){ return d.yaxis * 95; })
        .text(function(d){ return d.names ;})
        .style("font-size","13")
        .style("font-weight","1000");

     
    //update 

    text
        .transition()
        .duration(1000)
        .attr("x",function(d){ return d.xaxis * 70 ;})
        .attr("y", function(d,i){ return d.yaxis * 90;})
        .text( function(d){return d.names +d. count ;}) 
        .style("font-size","13")
        .style("font-weight","1000");
    //exit
    

        text.exit().remove();
  
      }        

  function byNei() {

    //padding = 1.5, // separation between same-color nodes
    //clusterPadding = 6, // separation between different-color nodes
    //maxRadius = 15;

//var n = 67, // total number of nodes
   // m = 3; // number of distinct clusters


var radiusScale = d3.scaleSqrt().domain([0, 1]).range([0, 1])



// the simulation is a collection of forces
// about where we want our circles to go
// and how we want them to interact
// STEP ONE: get them to the middle
// STEP TWO: don't have them collide!

var forceXSplit = d3.forceX(function(d){
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

var forceYSplit = d3.forceY(function(d){
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



//var forceXCombine = d3.forceX((width)/2).strength(0.1);
//var forceYCombine = d3.forceY((width)/2).strength(0.1);


var forceCollide = d3.forceCollide(function(d){
    return radiusScale(d.coli) + 0;
  })


var simulation = d3.forceSimulation()
  .force("x", forceXSplit)
  .force("y", forceYSplit)
  .force("collide", forceCollide) 



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



 

  d3.queue()
  .defer(d3.csv, "air18.csv")
  .await(ready)


function ready (error, data) {
 
  var circles = svg.selectAll(".Character")
  .data(data)
  .enter().append("circle")
  .attr("class", "Character")
  .attr("r", function(d){
    return radiusScale(d.coli)
  })
  .style("fill", function(d) { 
    var returnColor;
    
    if(d.price  <= 100) {
      returnColor = "#ffcccc";
    } else if(d.price <= 200){
      returnColor = "#ff6666";
    } else if(d.price <=300){
      returnColor = "#cc0000";
    } else if (d.price > 300){
      returnColor = "#4d0000";
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

/// Adding Toggle Switches  

  

  simulation.nodes(data)
    .on('tick', ticked)

drawCircles(distances);

 function ticked() {
    circles
      .attr("cx", function(d) {
        return d.x
      })
      .attr("cy", function(d) {
        return d.y
      })
  } 

   /* nodes.append("text")
         .attr("class","system")
         .attr("text-anchor", "middle")
         .text(function(d) {
           return d.neighbourhood;
          })
         .attr("fill","black"); */
}   


};


function byIn() {


var radiusScale = d3.scaleSqrt().domain([0, 1]).range([0, 1])



// the simulation is a collection of forces
// about where we want our circles to go
// and how we want them to interact
// STEP ONE: get them to the middle
// STEP TWO: don't have them collide!

var forceXSplit = d3.forceX(function(d){
    if(d.own == 1) {
      return (width * .30)
    } else {
      return (width * .70)
    }
  }).strength(0.15)
  



var forceCollide = d3.forceCollide(function(d){
    return radiusScale(d.coli) + 0.1
  })


var simulation = d3.forceSimulation()
  .force("x", forceXSplit)
  .force("y", d3.forceY(height / 2).strength(0.15))
  .force("collide", forceCollide) 




//var forceXCombine = d3.forceX((width)/2).strength(0.1);
//var forceYCombine = d3.forceY((width)/2).strength(0.1);




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


d3.queue()
  .defer(d3.csv, "air18.csv")
  .await(ready)


 


function ready (error, data) {

  var circles = svg.selectAll(".Character")
  .data(data)
  .enter().append("circle")
  .attr("class", "Character")
  .attr("r", function(d){
    return radiusScale(d.coli)
  })
  .style("fill", function(d) { 
    var returnColor;
    
    if(d.price  <= 100) {
      returnColor = "#ffcccc";
    } else if(d.price <= 200){
      returnColor = "#ff6666";
    } else if(d.price <=300){
      returnColor = "#cc0000";
    } else if (d.price > 300){
      returnColor = "#4d0000";
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


  
/// Adding Toggle Switches  
  drawCircles(Investor);

  simulation.nodes(data)
    .on('tick', ticked)


  function ticked() {
    circles
      .attr("cx", function(d) {
        return d.x
      })
      .attr("cy", function(d) {
        return d.y
      })
  } 
}   
}

  
function byNei2() {

d3.queue()
  .defer(d3.json,"boston.json")
  .defer(d3.csv,"air18.csv")
  .awaitAll(function(error,dataArray){
    var air = dataArray[0];
    var data = dataArray[1];
    
    data.forEach(function(d){
      d.longitude = +d.longitude;
      d.latitude = +d.latitude;
    });
    //padding = 1.5, // separation between same-color nodes
    //clusterPadding = 6, // separation between different-color nodes
    //maxRadius = 15;
var geoJSON = topojson.feature(air,air.objects.boston);
    console.log(geoJSON);

  var proj = d3.geoAlbersUsa().fitSize([500,500],geoJSON);

//var n = 67, // total number of nodes
   // m = 3; // number of distinct clusters


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


  var circles= svg.selectAll(".Character")
  .data(data)
  .enter().append("circle")
  .attr("class", "Character")
  .attr("r", function(d){
    return radiusScale(d.coli)
  })
    .attr("transform",function(point){
      return "translate("+ proj([point.longitude, point.latitude])+")"
    })
    .attr("fill",function(d){
      if(d.own ==1 ){
        return "red";
      }else{
        return "grey";
      }
    })
        .attr("opacity","0.50")
    .on("mouseover", function(d) {
              tooltip.html("<strong>" +d.name + "</strong><br>Host name: " + d.host_name + "<br> Location: " + d.neighbourhood + "<br>Room type: " + d.room_type +"<br>Average price: $" + d.price);
              tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {
          return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      })
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

/// Adding Toggle Switches  

  


   /* nodes.append("text")
         .attr("class","system")
         .attr("text-anchor", "middle")
         .text(function(d) {
           return d.neighbourhood;
          })
         .attr("fill","black"); */
 
});

drawCircles(textempty);

};


byNei();





 function scroll(n, offset, func1, func2){
      return new Waypoint({
        element: document.getElementById(n),
        handler: function(direction) {
           direction == 'down' ? func1() : func2();
        },
        //start 75% from the top of the div
        offset: offset
      });
    };

new scroll('div2', '75%', byIn,byNei);
new scroll('div3', '75%', byNei2,byIn);

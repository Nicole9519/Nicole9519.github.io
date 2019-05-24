var margin = {top: 30, right: 20, bottom: 70, left: 50},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


var parseDate = d3.timeParse("%Y");

// x y axis
var x = d3.scaleTime().range([0, width]);  
var y = d3.scaleLinear().range([height, 0]);

// Define the line
var snowline = d3.line() 
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.snow); });
    

var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("majan2.csv", function(error, data) {

    if(error){
      console.log("error")
    } else {

    data.forEach(function(d) {
    d.year = parseDate(d.year);
    d.snow = +d.snow;
    });

    // x y domain
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.snow; })]);

    // Nest the entries by county
    var dataNest = d3.nest()
        .key(function(d) {return d.county;})
        .key(function(d){ return d.falls;})
        .entries(data);

        console.log(dataNest);

    // set the colour scale
    var color = d3.scaleOrdinal(d3.schemeCategory20);


  // Add xAxis
  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(3));


  // Add yAxis
  svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));
  
//draw path
   dataNest.forEach(function(d,i) { 

     svg.append("path")
        .attr("class", "line")
        .style("stroke", function() { // Add the colours dynamically
             return d.color = color(d.key); })
        .attr("d", snowline(d.values))
        .attr("fill","none")
        .attr("stroke-width", 2);
         });


   var dots = svg.selectAll(".dot")
              .data(data)

//tooltip
   var tooltip = d3.select("body")
              .append("div")
              .attr("class","tooltip")
              .style("opacity",0.0);
    
   //draw dots
    dots.enter()
        .append("circle")
        .attr("class","dot")
        .attr("cx",function(d,i){
          return x(d.year);
        })
        .attr("cy",function(d){ 
          return y(d.snow); })
        .attr("r", "2")
        .attr("fill", function(d){
          return color(d.county)
        })
      .on("mouseover",function(d){ 
      tooltip.html(d.county)
          .style("left", "800px")
          .style("top", "500px")
          .style("opacity",1.0);
      })
      .on("mousemove",function(d){
      
        tooltip.style("left", "800px")
            .style("top", "500px");
      })
      .on("mouseout",function(d){
       
        tooltip.style("opacity",0.0);
      });
      
 
}});
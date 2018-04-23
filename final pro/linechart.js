
 
var margin = {top: 30, right: 50, bottom: 70, left: 50},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


var parseDate = d3.timeParse("%Y");

// x y axis
var x = d3.scaleTime().range([0, width]);  
var y = d3.scaleLinear().range([height, 0]);

// Define the line
var snowline = d3.line() 
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(+d.falls); });
    

var svg = d3.select("#graph")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");

 var tooltip = d3.select("#graph")
              .append("div")
              .attr("class","tooltip")
              .style("opacity",0.0);

// Get the data
d3.csv("majan2.csv", function(error, data) {

      if (error) throw error;

    data.forEach(function(d) {
    d.year = parseDate(d.year);
    d.falls = +d.falls;
    });

    // x y domain
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, d3.max(data, function(d) { return d.falls; })]);

    // Nest the entries by county
    var dataNest = d3.nest()
        .key(function(d) {return d.county;})
        .key(function(d) {return d.kind; })
        .entries(data);

        console.log(dataNest);

    // set the colour scale
//    var color = d3.scaleOrdinal(d3.schemeCategory20);
var colorscale = ["red", "blue"];

//color function pulls from array of colors stored in color.js
var color = d3.scaleThreshold()
              .domain(["snow","rain"])
              .range(colorscale);


  // Add xAxis
     svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5));


  // Add yAxis
    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));
  
//text

 // Create a dropdown
    var Menu = d3.select("#Dropdown")

    Menu
    .append("select")
    .selectAll("option")
        .data(dataNest)
        .enter()
        .append("option")
        .attr("value", function(d){
            return d.key;
        })
        .text(function(d){
            return d.key;
        });


 
  // Function to create the initial graph
var initialGraph = function(county){

    // Filter the data to include only county of interest
    var selectCounty = dataNest.filter(function(d){

                return d.key == county;
              })



      var selectCountyGroup = svg.selectAll(".countyGoups")
        .data(selectCounty,function(d){ return d? d.key : this.key;})
        .enter()
        .append("g")
        .attr("class", "countyGoups")

      var initialPath = selectCountyGroup.selectAll(".line")
        .data(function(d) { return d.values; })
        .enter()
        .append("path")
        .attr("d", function(d){
                return snowline(d.values);
              })
        .attr("stroke", function(d) { 
                    if (d.key == "snow") {
                      return "red"; 
                    } else{
                      return "blue";
                    }  
                })
        .attr("class", "line")

    var initialDots = selectCountyGroup.selectAll(".dot")
        .data(function(d) { return d.values; })
        .enter()
        .append("circle")
        .attr("class","dot")
        .attr("cx",function(d){
            return x(d.values[4].year);
        })
        .attr("cy",function(d,i){ 
          return y(d.values[4].falls); 
      })
        .attr("r", "4")
        .attr("fill", function(d,i) { 
                    if (d.values[4].kind == "snow") {
                      return "red"; 
                    } else{
                      return "blue";
                    }  
                })
      .on("mouseover",function(d){ 
        d3.select(this).transition().duration(100)
              .style("fill", "black")
              .style("opacity",1)
              .attr("r", 12);
      })
      .on("mousemove",function(d){
      
        tooltip.style("left", "800px")
            .style("top", "500px");
      })
      .on("mouseout",function(d){
       
        d3.select(this).style("fill", function(d,i) { 
                    if (d.values[4].kind == "snow") {
                      return "red"; 
                    } else{
                      return "blue";
                    }  
                })
        .attr("r",4);
      });
      
 


       var initialText = selectCountyGroup.selectAll(".lable")
        .data(function(d) { return d.values; })
        .enter()
        .append("text")
        .text(function(d){ return "<br><br>" + d.key})
        .attr("x", width)
        .attr("y", function(d){ 
            var falls = d.values[d.values.length - 1].falls;
            return y(falls);
           

         })
        .attr("class", "lable")


  };     


  // Create initial graph
  initialGraph("Barnstable");


  // Update the data
  var updateGraph = function(county){
    

    // Filter the data to include only county of interest
    var selectCounty = dataNest.filter(function(d){
                return d.key == county;
              })

    // Select all of the grouped elements and update the data
      var selectCountyGroup = svg.selectAll(".countyGoups")
                                  .data(selectCounty)

        // Select all the lines and transition to new positions
            selectCountyGroup.selectAll(".line")
                .data(function(d){
                  return (d.values);
                })
                .transition()
                .duration(1000)
                .attr("stroke", function(d) { 
                    if (d.key == "snow") {
                      return "red"; 
                    } else{
                      return "blue";
                    }  
                })
                .attr("d", function(d){
                  return snowline(d.values)
                });

         
      var initialText = selectCountyGroup.selectAll(".lable")
        .data(function(d) { return d.values; })
        .transition()
        .duration(1000)
        .text(function(d){ return d.key})
        .attr("x", width)
        .attr("y", function(d){ 
            var falls = d.values[d.values.length - 1].falls;
            return y(falls);
           

         })
        .attr("class", "lable")



 selectCountyGroup.selectAll(".dot")
        .data(function(d){
                  return (d.values);
                })
                .transition()
                .duration(1000)
        .attr("cx",function(d,i){
          return x(d.values[4].year);
        })
        .attr("cy",function(d,i){ 
          return y(d.values[4].falls); 
        })
        .attr("r", "4")
        .attr("fill", function(d) { 
                    if (d.values[4].kind == "snow") {
                      return "red"; 
                    } else{
                      return "blue";
                    }  
                })
        .on("mouseover",function(d){ 
        d3.select(this).transition().duration(100)
              .style("fill", "black")
              .style("opacity",1)
              .attr("r", 12);
      })
      .on("mousemove",function(d){
      
        tooltip.style("left", "800px")
            .style("top", "500px");
      })
      .on("mouseout",function(d){
       
        d3.select(this).style("fill",function(d) { 
                    if (d.key == "snow") {
                      return "red"; 
                    } else{
                      return "blue";
                    }  
                })
        .attr("r",4);
      });
     
 
};






  // Run update function when dropdown selection changes
  Menu.on('change', function(){

    // Find which county was selected from the dropdown
    var selectCounty = d3.select(this)
            .select("select")
            .property("value")
    
        // Run update function with the selected county
        updateGraph(selectCounty);
 
    });

});

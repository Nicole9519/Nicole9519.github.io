const fertilityPromise = d3.csv("fertility.csv",parsedata);

const jsonPromise = d3.json("world-countries.json");

Promise.all([fertilityPromise, jsonPromise])
	.then(([fertility,json]) => {
	console.log(fertility);
	var geoJSON = topojson.feature(json, json.objects.countries1);
        geoJSON.features = geoJSON.features.filter(function(feature) {
          return feature.id != "AQ";
        });

	var proj = d3.geoMercator()
	.fitSize([1000,700], geoJSON);

    var path = d3.geoPath()
          .projection(proj);      
	var countries = d3.select("#map").selectAll("path")
          .data(geoJSON.features);

    var dataExtent = d3.extent(fertility, function(d){ return d.year16 ;})
    console.log(dataExtent);

    var colorScale = d3.scaleLinear()
						.domain([0,0.5,1.0,1.5,2,3,4,5])
						.range(["#ffffff","#feedb2","#ffd5aa","#ffb89f","#ff9079","#ff695f","#ff424e","#ff5549"]);


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


     countries.enter().append("path")
          .attr("fill", function(feature) {
            var fertilityData = fertility.filter(function(d){
            	return d.code == feature.id
            })
            	if(fertilityData.length == 0){
            		return "grey";
            	}else{
            		return colorScale(fertilityData[0].year16);
            	}


          })
          .attr("stroke", "#d9d9d9")
          .attr("stroke-width", 0.5)
          .attr("d", function(feature) {
            return path(feature);
          })
          .on("mouseover", function(feature) {
            var fertilityData = fertility.filter(function(d){
              return d.code == feature.id
            })

              tooltip.html( fertilityData[0].country + " 生育率： " + fertilityData[0].year16 );
              tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {
          return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      })
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

      countries
      .enter().append('circle')
        .each(function(d) {
          if (d.id !== 'CHN') {
            return;
          }
          d3.select(this)
            .attr("r", 4)
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 2);
        })
        .filter(function(d) {
        return d.id !== 'CHN';
        }).remove();  // Delete empty circle elements

      countries
      .enter().append('text')
        .each(function(d) {
          if (d.id !== 'CHN') {
            return;
          }
          d3.select(this)
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("dx", "11em")
            .attr("dy", "2em")
            .attr("fill", "black")
            .style("text-anchor", "end")
            .text("中国生育率 -- 1.624");
        })
        .filter(function(d) {
          return d.id !== 'CHN';
        }).remove();

    var line = d3.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; });

var svg = d3.select("map").append("svg")
    .attr("width", 1000)
    .attr("height", 700);

    svg.selectAll(".parish-line")
        .data(geoJSON.features)
        .enter().append('path')
        .attr("class", "parish-line")
        .attr("d", function(d) {
          var centroid = path.centroid(d);

          if (d.id === 'CHN') {
            var lineData = [
              {"x": centroid[0] - 4, "y": centroid[1] + 4},
              {"x": centroid[0] - 145, "y": centroid[1] + 145}
            ];
          } else {
            return;
          }
          return line(lineData);
        })
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("opacity", 0.8)
        .attr("fill", "#000")
        .filter(function(d) {
          return d.id == "CHN";
        }).remove();



});

	function parsedata(d){
		return {
			country: d["Country Name"],
			code : d["Country Code"],
			year16: d["2016"]
		}

	}

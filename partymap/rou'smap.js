d3.queue()
			.defer(d3.json, "usa.json")
			.defer(d3.csv, "Mass-shooting.csv")
			.defer(d3.csv, "gunownership.csv")
			.defer(d3.csv, "lawenforcement.csv")
			.awaitAll(function(error,dataArray){
				var data = dataArray[0];
				var shooting = dataArray[1]
				//.sort(function(a, b) {
					//return b.Fatalities - a.Fatalities;
				//})
				;
				var ownership = dataArray [2];
				var gunrate = dataArray [3];
				ownership.forEach(function(state){
					state.gunownership = parseFloat(state.gunownership);
					});
				gunrate.forEach(function(rate){
					rate.Law = parseFloat(rate.Law)
				});

				console.log(dataArray);

			var dataExtent = d3.extent(ownership, function(d){
						return d.gunownership;
					})
			console.log(dataExtent);

			var colorScale = d3.scaleLinear()
				.domain(dataExtent)
				.range(["#f9f9f9","#922B21"]);
			var colorScale1 = d3.scaleLinear()
				.domain(dataExtent)
				.range(["#707B7C","#17202A"]);

//printing the map 
			var geoJSON = topojson.feature(data,data.objects.states);
			
			var proj = d3.geoAlbersUsa()
				.fitSize([1000,700],geoJSON); 

			var path = d3.geoPath()
			.projection(proj); 

			var states = d3.select("#map").selectAll("path")
				.data(geoJSON.features);

			var div = d3.select("#tooltip");

//passing the path to svg and setting up the "d" value to draw a path 
			states.enter().append("path") 
				.attr("fill", function(feature){

					var stateData = ownership.filter(function(d){
						return d.id == feature.id
					})
					if (stateData.length == 0) {
						return "grey";
					}
					var number = stateData[0].gunownership;
					return colorScale(number);
				})
				.attr("stroke","white")
				.attr("stroke-width",1)
				.on("mouseenter", function(d){
					d3.select(this)
			     	.classed("mouseenter", true)
					.attr("stroke-width",2.5)
					.attr("stroke","white")
					.html(d.ownership)
				})
				.on("mouseout",function(d){
					d3.select(this)
					.classed("mouseout",true)
					.attr("stroke-width",1)
					.attr("stroke","white")
				})
				.attr("d",function(feature){
					return path(feature);
				});

				states
				.transition()

				.duration(1000)
				.attr("fill",function(feature){
					var stateRank = data.filter(function(d){
						return d.id == feature.id
					})
					if (stateRank.length == 0){
						return "grey";
					}
					if (stateRank[0].Law) {
					  	return colorScale(stateRank[0].Law);
					}
					if (stateRank[0].gunownership) {
					  	return colorScale(stateRank[0].gunownership);
					}
				})
				.attr("stroke","white")
				.attr("stroke-width",1.5)
				.attr("d",function(feature){
					return path(feature);
				});

//load my data into the file, make sure you create a new data array and variable accordingly
			
			var dots = d3.select("#map").selectAll("circle")
			.data(shooting);


			dots.enter().append("circle")
				.attr("transform",function(point){
					return "translate(" + proj([point.longitude,point.latitude]) + ")"
				})
				.attr("fill",d=>colorScale1(d.Total)) //if you want to use data in csv, make sure have point.before the column name 
				.attr("stroke-width",.3)
				.attr("r",4.5)
				
				//.attr("r", function(point){
					//return point.Fatalities/1.2;
				//..})
				.attr("opacity",0.75)

					//mouseover event and tooltips 
				.on("mouseenter", function(d) {
				    d3.select(this)
				      .classed("mouseenter", true)
				      .attr("r", function(point){
				      	return point.Total/3.5;
				      })
				      .attr("class", "hoveredpoints")
				      .attr("fill","black");

				    d3.select("#tooltip")
						.transition()
						.style("opacity",1);

				    d3.select("#cases").text(d.Case);
				    d3.select("#year").text("Year: " + d.Year)
				    d3.select("#place").text("Place: " + d.Place);
				    d3.select("#fatalities").text("Fatalities: " + d.Fatalities);
				    d3.select("#victim").text("Total victims: " + d.Total);
				    d3.select("#summary").text(d.Summary);
				    d3.select("#story-link").attr("href", d.Sources).html("Click here to view story.");
				    
				})
				
			 	.on("mouseleave", function(d) {
			    d3.select(this)
				      .attr("r", 4.5)
				      .attr("fill", d=>colorScale1(d.Fatalities))
				      .attr("class", "points")
				      .attr("opacity",0.75);
				//d3.select("#tooltip")
						//.transition()
						//.duration(200)
						//.style("opacity",0);
			  	});
			 	
			});
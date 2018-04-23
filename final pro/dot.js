
var parseDate = d3.timeParse("%m/%d/%Y");

var margin = {top:20, bottom:20, left:20, right:20},
 	width = 600 - margin.left - margin.right,
 	height = 400 - margin.top - margin.bottom;

var svg = d3.select("body")
			.append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("transform", "translate(100, 100)");

d3.csv("1day.csv", function(error,data){

	if(error) {
		console.log(error);
	} else {
				data.forEach(function (d) {
  						d.date = d.date;
  						d.year = +d.year;
  						d.county = d.county;
  						d.max = +d.max;
  					console.log(d.county);

					});
			
 	var xScale = d3.scaleLinear()
 				.domain([1959,2018])
 				.range([0,width]);


	 svg.append("g")
	 	.attr("class","axis")
	 	.attr("transform", "translate(0,400)")
	 	.call(d3.axisBottom(xScale).ticks(8));

	 var yScale = d3.scaleLinear()
	 			    .domain(d3.extent(data, function(d){ return d.max; }))
	 			    .range([ 400, 0]);

	 svg.append("g")
	 	.attr("class","axis")
	 	.call(d3.axisRight(yScale).ticks(6));


	 svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height/2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("(inches)");

		var div = d3.select("body")
							.append("div")
							.attr("class","tooltip")
							.style("opacity",0.0);
		


var circle = svg.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d){ return xScale(d.year) ; })
				.attr("cy", function(d){ return yScale(d.max) ;} )
				.attr("r", 8)
				.attr("fill","#c2c2d6")
				.on("mouseover",function(d){
				/*
				鼠标移入时，
				（1）通过 selection.html() 来更改提示框的文字
				（2）通过更改样式 left 和 top 来设定提示框的位置
				（3）设定提示框的透明度为1.0（完全不透明）
				*/
				
			div.html(d.county +" receives " + d.max +" inches snowfall in " + d.date)
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY + 20) + "px")
					.style("opacity",1.0);
			})
			.on("mousemove",function(d){
				/* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
				
				div.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY + 20) + "px");
			})
			.on("mouseout",function(d){
				/* 鼠标移出时，将透明度设定为0.0（完全透明）*/
				
				div.style("opacity",0.0);
			});

}});


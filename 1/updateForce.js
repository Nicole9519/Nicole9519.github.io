const M={t:20,r:20,b:20,l:20};
const width=$(".canvas").width() - M.l - M.r,
      height=$(".canvas").height() - M.t - M.b;
  let graph;

const xScale=d3.scaleOrdinal().domain(["user","website"]).range([0*width,0.2*width]);
const rScale=d3.scaleOrdinal().domain(["user","website"]).range([5,15]);
const r=(d)=>{return rScale(d.news_type)};
const xForce=0;
//const xForce=(d)=>{return xScale(d.news_type)};


const svg=d3.select(".canvas").append("svg")
                               .attr('width', width + M.l + M.r)
                               .attr('height', height + M.t + M.b)
                               .append('g').attr("class","simulation")
                               .attr('transform', `translate(${M.l}, ${M.t})`);

const simulation = d3.forceSimulation();


d3.queue()
  .defer(d3.json,"network.json")
  .await(ready);


function ready(err,network){

        const node=[],link=[],website=[];
        for (let value of network){
            node.push({
                node:JSON.stringify(value.user_id),
                news_type:"user"
            })
        }
       
        const user=Array.from(new Set(node.map(JSON.stringify))).map(JSON.parse);
        
        for (let value of network){
            website.push({          
                node:value.website.replace(/.com/gi,""),
                //define the nodes relationship
                news_type:"website",         
            })
        }
    
    
        let web=Array.from(new Set(website.map(JSON.stringify))).map(JSON.parse);
        for (let value of web){user.push(value);}

       
        //construct links
        for (let value of network){
            link.push({
                source:value.website.replace(/.com/gi,""),
                target:JSON.stringify(value.user_id),
                values:value.link_share
            })
        }
        
        const _graph={nodes:user,links:link};
        graph=_graph;

        
        initializeDisplay();
        initializeSimulation();

        const controller = new ScrollMagic.Controller();

        const scrollFromForceXToLinkForce = new ScrollMagic.Scene({
                                    triggerElement:".forceLink"
        
                                  })
                                  .on("enter",(e)=>{
                                      
                                  forceProperties.forceX.enabled=false;
                                  forceProperties.forceY.enabled=false;
                                  forceProperties.link.enabled=true;
                                  forceProperties.charge.strength=-50;
                                  updateAll();

                                  })
                                  .addIndicators({name:"forceLink"})
                                  .addTo(controller);
    
    
      
        const scrollFromAllDotsToForceX = new ScrollMagic.Scene({
                                    triggerElement:".forceX"
        
                                  })
                                  .on("enter",(e)=>{
                                      
                                  forceProperties.forceX.enabled=true;
                                  forceProperties.forceY.enabled=true;
                                  forceProperties.link.enabled=false;
                                  forceProperties.charge.strength=-20;            
                                  updateAll();
   

                                  })
                                  .addIndicators({name:"forceX"})
                                  .addTo(controller);
    
        
}






        function initializeSimulation() {
        
              simulation.nodes(graph.nodes);
              initializeForces();
              simulation.on("tick", ticked);
            
        }
        



        forceProperties = {
            center: {
                enabled:true,
                x: 0.5,
                y: 0.5
            },
            charge: {
                enabled: true,
                strength: -1,
                distanceMin: 2,
                distanceMax: 500
            },
            collide: {
                enabled: true,
                strength: .2,
                iterations: 1,
                radius: 0
            },
            forceX: {
                enabled: false,
                strength: .1,
                x: 0
            },
            forceY: {
                enabled: false,
                strength: .1,
                y: 0
            },
            link: {
                enabled: false,
                distance: 30,
                iterations: 1
            }
          
         }


      


        
        
        //initialize Force
        function initializeForces(){
            
            
            
            simulation
            .force("links", d3.forceLink())
            .force("charge", d3.forceManyBody())
            .force("collide", d3.forceCollide())
            .force("center", d3.forceCenter())
            .force("forceX", d3.forceX())
            .force("forceY", d3.forceY());
            
            // apply properties to each of the forces
            updateForces();
    
        }
 

        function updateForces() {

            // get each force by name and update the properties
            simulation.force("center")
                .x(width * forceProperties.center.x*forceProperties.center.enabled)
                .y(height * forceProperties.center.y*forceProperties.center.enabled);
            
            simulation.force("charge")
                .strength(forceProperties.charge.strength * forceProperties.charge.enabled)
                .distanceMin(forceProperties.charge.distanceMin)
                .distanceMax(forceProperties.charge.distanceMax);
            
            simulation.force("collide")
                .strength(forceProperties.collide.strength * forceProperties.collide.enabled)
//                .radius(forceProperties.collide.radius)
                .iterations(forceProperties.collide.iterations)
                .radius((d)=>{return rScale(d.news_type)});
                
            
            simulation.force("forceX")
                .strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
                .x((d)=>{return xScale(d.news_type)});       
//              .x(width * forceProperties.forceX.x); 

            
            simulation.force("forceY")
                .strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
                .y(height * forceProperties.forceY.y);
            
           
            
            simulation.force("links")
                .id(function(d) {return d.node;})
                .distance(forceProperties.link.distance)
                .iterations(forceProperties.link.iterations)
                .links(forceProperties.link.enabled ? graph.links : []);

            // updates ignored until this is run
            // restarts the simulation (important if simulation has already slowed down)
            simulation.alpha(0.8).alphaTarget(0).restart();
        }

        

        function initializeDisplay() {
            
              // set the data and properties of link lines
              links = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(graph.links)
                .enter().append("line");

              // set the data and properties of node circles
              nodes = svg.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(graph.nodes)
                .enter().append("circle")
            
            
              // visualize the graph
              updateDisplay();
          }

         


          function updateDisplay() {
              
                nodes
                    .attr("r", (d)=>{return rScale(d.news_type)})
                    .on("click",handleClick)
                    
                  

                links
                    .attr("stroke-width", forceProperties.link.enabled ? 1 : .5)
                    .attr("opacity", forceProperties.link.enabled ? 1 : 0);
          }



          function handleClick(d,i){
              console.log(d)
              console.log(this)
//              .select(this).attr("fill","orange");
          }



          function ticked() {
                links
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                nodes
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
         }




        function updateAll() {
            updateForces();
            updateDisplay();
        }

















        
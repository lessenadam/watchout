// start slingin' some d3 here.
var data = [{x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 80 + 10},
{x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 80 + 10},
{x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 80 + 10},
{x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 80 + 10},
{x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 80 + 10}];

var heroData = [{x: Math.random() * 800, y: Math.random() * 800, r: 25}];

var svg = d3.select('.board').append("svg").attr("width", 800).attr("height", 800);



var dragmove = function (d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y)
}

var drag = d3.behavior.drag()
        // .on('dragstart', function (d) {
        //   d3.select(this).classed("dragging", true);
        // })
        .on('drag', dragmove)
        // .on('dragended', function (d) {
        //   d3.select(this).classed("dragging", false);
        // })

var asteroids = svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle");

asteroids
  .attr("r", d => d.r)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("class", "enemy");


              

var player = svg
  .selectAll(".hero")
  .data(heroData)
  .enter()
  .append("circle")
  .call(drag);

player
  .attr("r", d => d.r)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .style('fill', "yellow")
  .attr('class', 'hero')
  // .attr('class', 'dragging');


// click dragging 




// collision detection 
var collisions = 0;
var collisionDetect = false;
var newCollision = true;

function collision () {
  var currentDetection = false;
  d3.selectAll('.enemy')
  .each(node => {
    var heroR = +d3.select('.hero').attr('r');
    var heroY = +d3.select('.hero').attr('cy');
    var heroX = +d3.select('.hero').attr('cx');
    var nodeR = node.r;
    var nodeX = node.x;
    var nodeY = node.y;
    var distance = Math.pow(Math.pow(nodeX - heroX, 2) + Math.pow(nodeY - heroY, 2), .5);
    
    if (distance < heroR + nodeR) {
      currentDetection = true;
      collisionDetect = true;
      if (newCollision) {
        collisions++;

        newCollision = false;
      }
    }
    // } else {
    //   collisionDetect = false;
    //   newCollision = true;
    // }
  });
  if (!currentDetection) {
    collisionDetect = false;
    newCollision = true;
  }

}


setInterval(collision, 10);
setInterval(function(){
  if (collisionDetect) {
    console.log("COLLISION");
    console.log("there have been " + collisions + " so far")
  }
}, 10);


// asteroid movement 
var updateEnemies = function() {
  d3.selectAll('.enemy')
  .each(function(node) {
    node.x = Math.random() * 800;
    node.y = Math.random() * 800;
  })
  .data([])
  .exit()
  .transition().duration(500)
  .attr('cx', d => d.x) 
  .attr('cy', d => d.y);

};

setInterval(updateEnemies, 1000);
// set interval to 1000 ms
  // select all asteroids 
  // give them a new random x and y 
  // select all transition the x and y with 500 ms



// scoring function 
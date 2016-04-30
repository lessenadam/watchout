// start slingin' some d3 here.
var data = [{x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 80 + 10}];

var heroData = [{x: Math.random() * 800, y: Math.random() * 800, r: 25}];

var svg = d3.select('.board').append("svg").attr("width", 800).attr("height", 800);

var drag = d3.behavior.drag()
        .origin(function(d) { return {x:d.x, y:d.y}; })
        .on('dragstart', function (d) {

        })
        .on('drag', function (d) {
            var xCoord = d.x;
            // console.log("dx was," + xCoord);
            d.x += d3.event.dx;
           

            d.y += d3.event.dy;
            d3.select(this)
                .attr('transform', 'translate(' + d.x + ',' + d.y + ')');
            // console.log("dx is now," + d.x);
        })
        .on('dragend', function (d) {

        });

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
  .attr('class', 'hero');


// click dragging 




// collision detection 
var collisions = 0;

function collision () {
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
      collisions++;
    }
  });
}


setInterval(collision, 100);
setInterval(function(){
  if (collisions > 0) {
    console.log("COLLISION");
  }
}, 1000);


// asteroid movement 



// scoring function 
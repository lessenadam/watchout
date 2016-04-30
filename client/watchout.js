// start slingin' some d3 here.
var data = [{x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 40 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
// {x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 20 + 20},
{x: Math.random() * 800, y: Math.random() * 800, r: Math.random() * 40 + 20}]
;

var heroData = [{x: Math.random() * 800, y: Math.random() * 800, r: 10}];

var svg = d3.select('.board').append("svg").attr("width", 800).attr("height", 800);



var dragmove = function (d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
};

var drag = d3.behavior.drag()
        // .on('dragstart', function (d) {
        //   d3.select(this).classed("dragging", true);
        // })
        .on('drag', dragmove);
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
  .attr('class', 'hero');
  // .attr('class', 'dragging');


// click dragging 




// collision detection 
var collisions = 0;
// var collisionDetect = false;
var newCollision = true;

function collision () {
  // var currentDetection = false;
  node = d3.select(this);
    var heroR = +d3.select('.hero').attr('r');
    var heroY = +d3.select('.hero').attr('cy');
    var heroX = +d3.select('.hero').attr('cx');
    var nodeR = +node.attr('r');
    var nodeX = +node.attr('cx');
    var nodeY = +node.attr('cy');
    var distance = Math.pow(Math.pow(nodeX - heroX, 2) + Math.pow(nodeY - heroY, 2), .5);
    
    if (distance < heroR + nodeR) {
      // currentDetection = true;
      // collisionDetect = true;
      if (newCollision) {
        collisions++;
        $('.collisions span').text(collisions);
        // newCollision = false;

      }
    }
    // } else {
    //   collisionDetect = false;
    //   newCollision = true;
    // }

}


// setInterval(collision, 10);
// setInterval(function(){
//   if (collisionDetect) {
//     console.log("COLLISION");
//     console.log("there have been " + collisions + " so far");
//   }
// }, 10);



// asteroid movement 
var updateEnemies = function() {
  clearInterval(aa);
  d3.selectAll('.enemy')
  .each(function(node) {
    node.x = Math.random() * 800;
    node.y = Math.random() * 800;
  })
  .data([])
  .exit()
  .transition().duration(4000)
  .attr('cx', d => d.x) 
  .attr('cy', d => d.y)
  .tween('collision?', function() {
    return function(t) {
      collision.apply(this);
    };
  });
  var aa = setInterval(function() {
    d3.selectAll('.enemy').each(function(d, i) {
      // console.log(d3.select(this).attr('r'));
      collision.apply(this);

      // console.log('this is ', this);
      // console.log('d is ', d);
      // console.log('i is ', i);
    });

  }, 100);

};

setInterval(updateEnemies, 5000);
// set interval to 1000 ms
  // select all asteroids 
  // give them a new random x and y 
  // select all transition the x and y with 500 ms

  // d3.select('body')   .selectAll('div')   .transition()   .style('top', '20px')   .tween(function(time){     
  //   var current_Y_Position = d3.select('body').selectAll('div').style('top');    
  //    collisionDetectionFunction(yPosition); });



// scoring function 
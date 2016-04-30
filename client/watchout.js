// start slingin' some d3 here.

var width = 1600;
var height = 800;
var data = [{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
{x: Math.random() * width, y: Math.random() * height, r: Math.random() * 40 + 20},
];

var heroData = [{x: Math.random() * width, y: Math.random() * height, r: 10}];

var svg = d3.select('.board').append("svg").attr("width", width).attr("height", height);
var allScores = [0];
var currentScore = 0;
var highScore = 0;

var timer = setInterval(() => { 
  currentScore++; 
  $('.current span').text(currentScore);
}, 50);

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
        clearInterval(timer);
        d3.select('.board').classed('hit', true);
        setTimeout(() => {d3.select('.board').classed('hit', false);}, 400);
        allScores.push(currentScore);
        highScore = Math.max(...allScores);
        $('.highscore span').text(highScore);
        currentScore = 0;
        timer = setInterval(() => { 
          currentScore++; 
          $('.current span').text(currentScore);
        }, 50);
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

var aa = setInterval(function() {
  d3.selectAll('.enemy').each(function(d, i) {
    // console.log(d3.select(this).attr('r'));
    // console.log('hello');
    collision.apply(this);

    // console.log('this is ', this);
    // console.log('d is ', d);
    // console.log('i is ', i);
  });

}, 1);


// asteroid movement 
var updateEnemies = function() {
  d3.selectAll('.enemy')
  .each(function(node) {
    node.x = Math.random() * width;
    node.y = Math.random() * height;
  })
  .data([])
  .exit()
  .transition().duration(2000)
  .attr('cx', d => d.x) 
  .attr('cy', d => d.y)
  .tween('collision?', function() {
    return function(t) {
      collision.apply(this);
    };
  });
  

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
// start slingin' some d3 here.
var data = [10, 20, 30, 40, 50, 60];

var svg = d3.select('.board').append("svg").attr("width", 800).attr("height", 800);

var asteroids = svg
.selectAll("circle")
.data(data)
.enter()
.append("circle");

asteroids
.attr("r", d => d)
.attr("cx", d => Math.random() * 800)
.attr("cy", d => Math.random() * 800);

var player = svg
.selectAll(".hero")
.data([25])
.enter()
.append("circle");

player
.attr("r", d => d)
.attr("cx", Math.random() * 800)
.attr("cy", Math.random() * 800)
.style('fill', "yellow");

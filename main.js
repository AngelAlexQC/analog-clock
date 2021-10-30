/**
 * This script is used to create a analog clock in the browser window.
 * The clock is drawn using the p5.js library.
 */

function setup() {
  // Create a canvas that fills the browser window.
  createCanvas(windowWidth, windowHeight - 4);
  // Set the background to white
  background(220);
}

function draw() {
  background(220);
  // Get window width and height and calculate the center of the window
  let w = windowWidth;
  let h = windowHeight;
  let centerX = w / 2;
  let centerY = h / 2;
  // Calculate the radius of the clock
  let radius = min(w, h) / 2 - 10;
  // Draw the clock and rotate the canvas to the current time
  drawClock(centerX, centerY, radius);
  // Draw Digital Clock bottom of center
  drawDigitalClock(centerX, centerY, radius);
  // Draw Date
  drawDate(centerX, centerY, radius);
  // Add Author in the top left corner
  addAuthor(centerX, centerY, radius);
}

function drawClock(centerX, centerY, radius) {
  // Draw the clock face
  drawFace(centerX, centerY, radius);
  // Draw the clock hands
  drawHands(centerX, centerY, radius);
  // Draw the clock hours numbers
  drawHoursNumbers(centerX, centerY, radius);
  // Draw the clock minutes numbers
  drawMinutesNumbers(centerX, centerY, radius);
}

function drawFace(centerX, centerY, radius) {
  // Draw the clock face
  strokeWeight(2);
  stroke(0);
  fill(255, 255, 255);
  ellipse(centerX, centerY, radius * 2, radius * 2);
  // Draw the clock center
  fill(0);
  noStroke();
  ellipse(centerX, centerY, 8, 8);
}

function drawHands(centerX, centerY, radius) {
  // Calculate the hour hand angle in radians -90º and add minutes approx.
  let hourAngle = map(hour(), 0, 12, -90, 270) + map(minute(), 0, 60, 0, 30);
  // Calculate the minute hand angle in radians -90º and add seconds approx.
  let minuteAngle = map(minute(), 0, 60, -90, 270) + map(second(), 0, 60, 0, 6);
  // Calculate the second hand angle in radians -90º.
  let secondAngle = map(second(), 0, 60, -90, 270);
  // Draw the hour hand
  drawHand(centerX, centerY, radius, hourAngle, radius * 0.7, color(0, 0, 0));
  // Draw the minute hand
  drawHand(centerX, centerY, radius, minuteAngle, radius * 0.8, color(0, 0, 0));
  // Draw the second hand
  drawHand(
    centerX,
    centerY,
    radius,
    secondAngle,
    radius * 0.9,
    color(255, 0, 0)
  );
}

function drawHand(centerX, centerY, radius, angle, length, color) {
  // Calculate the hand end point
  let x2 = centerX + cos(radians(angle)) * length;
  let y2 = centerY + sin(radians(angle)) * length;
  // Draw the hand
  stroke(color);
  strokeWeight(2);
  line(centerX, centerY, x2, y2);
}

function drawHoursNumbers(centerX, centerY, radius) {
  // Set the text properties, font size is based on the radius
  textSize(radius / 10);
  textAlign(CENTER, CENTER);
  textFont("Helvetica");
  // Draw the numbers
  for (let i = 1; i < 13; i++) {
    let angle = map(i, 0, 12, -90, 270);
    let x = centerX + cos(radians(angle)) * (radius * 0.9);
    let y = centerY + sin(radians(angle)) * (radius * 0.9);
    fill(0);
    noStroke();
    text(i, x, y);
  }
}

function drawMinutesNumbers(centerX, centerY, radius) {
  // Set the text properties, font size is based on the radius
  textSize(radius / 30);
  textAlign(CENTER, CENTER);
  textFont("Helvetica");
  // Draw the numbers
  for (let i = 1; i < 61; i++) {
    let angle = map(i, 0, 60, -90, 270);
    let x = centerX + cos(radians(angle)) * (radius * 0.97);
    let y = centerY + sin(radians(angle)) * (radius * 0.97);
    fill(0);
    noStroke();
    text(i, x, y);
  }
}

function drawDigitalClock(centerX, centerY, radius) {
  // Set the text properties, font size is based on the radius
  textSize(radius / 10);
  textAlign(CENTER, CENTER);
  textFont("Helvetica");
  // Draw the digital clock
  fill(0);
  noStroke();
  text(
    nf(hour(), 2, 0) + ":" + nf(minute(), 2, 0) + ":" + nf(second(), 2, 0),
    centerX,
    centerY + radius * 0.5
  );
}

function drawDate(centerX, centerY, radius) {
  // Set the text properties, font size is based on the radius
  textSize(radius / 10);
  textAlign(CENTER, CENTER);
  textFont("Helvetica");
  // Draw the date
  fill(0);
  noStroke();
  text(day() + "/" + month() + "/" + year(), centerX, centerY - radius * 0.5);
}

function addAuthor(centerX, centerY, radius) {
  // Set the text properties, font size is based on the radius
  textSize(radius / 30);
  textAlign(CENTER, CENTER);
  textFont("Helvetica");
  // Draw the author in the top center
  const textAuthor = "Created by: Ángel Quiroz <LexDev>";
  fill(0);
  noStroke();
  text(textAuthor, centerX, centerY + radius * 0.55);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 4);
  // Redraw the clock
  draw();
}

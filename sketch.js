var mySong;
var analyzer;
var volume;

var inc = 0;

var param;

var unit;
var centreX;
var centreY;


function preload() {
  mySong = loadSound("./assets/TG1_new.mp3");
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

}



function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  //to delete the scroll bar
  cnv.style('display', 'block');
  //to prevent problems with high density display
  pixelDensity(1);

  param = height;
  centreX = width / 2;
  centreY = height / 2;

  background(50);

  alert("Click to play");

  mySong.onended(function() {
    alert("Press enter to play again");


  });


}

function draw() {
  volume = analyzer.getLevel();

  //background noise
  var dimPixel = 10;
  for (var y = 0; y < height; y += dimPixel) {
    for (var x = 0; x < width; x += dimPixel) {

      var randomGrey = noise(inc) * 255;
      inc +=volume*0.01
      noStroke();
      fill(randomGrey);
      rectMode(CORNER);
      rect(x, y, dimPixel, dimPixel);
    }
  }




  noFill();
  stroke("red");

  for (var i = 1; i<5; i++) {
    beginShape();
  for(var j=0; j<width; j++){

    var lineY = height/4-map(volume,0,1,0,height/4);


    vertex(j,lineY*i);

  }endShape();
}


  writeTG1();

}




function mouseClicked() {
  mySong.play()
}

function keyPressed() {
  if (keyCode === ENTER) {
    location.reload();
  }
}


function writeTG1() {
  volume = map(volume, 0, 1, param / 16, param);
  unit = volume;




  rectMode(CENTER);
  fill(255);
  stroke(255);

  //letter g
  square(centreX, centreY + unit, unit);
  square(centreX + unit, centreY + unit, unit);
  square(centreX - unit, centreY + unit, unit);
  square(centreX - unit, centreY, unit);
  square(centreX - unit, centreY - unit, unit);
  square(centreX, centreY - unit, unit);
  square(centreX + unit, centreY - unit, unit);
  rect(centreX + unit, centreY + unit / 4, unit, unit / 2);

  //letter t
  square(centreX - 2 * unit, centreY + unit, unit);
  square(centreX - 3 * unit, centreY + unit, unit);
  square(centreX - 3 * unit, centreY, unit);
  square(centreX - 3 * unit, centreY - unit, unit);
  square(centreX - 3 * unit, centreY - 2 * unit, unit);
  rect(centreX - 2 * unit - unit / 4, centreY - unit, unit / 2, unit);

  //number 1
  square(centreX + 3 * unit, centreY - unit, unit);
  square(centreX + 3 * unit, centreY, unit);
  square(centreX + 3 * unit, centreY + unit, unit);
  square(centreX + 3 * unit, centreY + 2 * unit, unit);
  rect(centreX + 2 * unit + unit / 4, centreY - unit, unit / 2, unit);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centreX = width / 2;
  centreY = height / 2;
  if (height < width) {
    param = height;
  } else if (height > width) {
    param = width;
  }
}

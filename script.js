// This sketch uses the example code provided by Professor Cotter. The animation is my own.

let serial;                             // variable to hold an instance of the serialport library
// let portName = '/dev/tty.usbmodem101';  // fill in your serial port name here
let inData;                             // for incoming serial data
let portSelector;

let dataMode;
let buttonData;
let potentiometerData;

let yCor = 400;
let diameter = 100;
let speedY = 3;

function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  // serial.openPort(portName);              // open a serial port
}

function draw() {
  // black background, white text:
  background(255);
  // fill (255);
  // display the incoming serial data as a string:
  noFill();
  strokeWeight(1);
  text("Sensor Value: " + inData, 30, 50);
  text("Pot Data:" + potentiometerData, 30, 90)
  text("Button Data: " + buttonData, 30, 130)

// Speed of ellipse

  let anger = abs (speedY * potentiometerData);
  
// if button is not pressed 

if (buttonData == 0) {
  
  //ellipse setup
  
  // background(255);
  fill (255,160,122);
  strokeWeight(3);
  ellipse (200  , yCor + anger, diameter + anger, diameter + anger);
  
  //eyebrows
  
  strokeWeight(3);
  stroke (0);
  line (180, yCor+ anger, 190, yCor+ (anger+5));
  line (210, yCor+ anger, 220, yCor+ (anger-5));
  
  //creating screen boundaries
  
  if (yCor <= 0 + diameter/2){
  speedY = 3;
    
  }
  
  if (yCor >= (height - diameter/2)){
  speedY = -3
    
  }
  
  //Changing ellipse colour based on pot data
  
    if (anger > 40){
    fill (255,160,122);
    ellipse (200  , yCor + anger, diameter + anger, diameter + anger);
  strokeWeight(5);
  stroke (0);
  line (180, yCor+ anger, 190, yCor+ (anger+5));
  line (210, yCor+ anger, 220, yCor+ (anger-5));
  
  }
  
  if (anger > 80){
    fill (255,99,71);
    ellipse (200  , yCor + anger, diameter + anger, diameter + anger);
  strokeWeight(7);
  stroke (0);
  line (180, yCor+ anger, 190, yCor+ (anger+5));
  line (210, yCor+ anger, 220, yCor+ (anger-5));
  }
  
  if (anger > 120){
    fill (255,69,0);
    ellipse (200  , yCor + anger, diameter + anger, diameter + anger);
  strokeWeight(10);
  stroke (0);
  line (180, yCor+ anger, 190, yCor+ (anger+5));
  line (210, yCor+ anger, 220, yCor+ (anger-5));
  }
  
  
  if (anger > 150){
    fill (255,0,0);
    ellipse (200  , yCor + anger, diameter + anger, diameter + anger);
    
  strokeWeight(12);
  stroke (0);
  line (170, yCor+ anger, 190, yCor+ (anger+5));
  line (200, yCor+ anger, 220, yCor+ (anger-5));
  }
  
  //moving ellipse
  
    yCor = yCor + speedY;
  
  //console.log(anger)
  }
  
 // if button is pressed, ellipse goes in zen mode
  else if (buttonData == 1) {
  
  //ellipse setup
  
  fill (255,193,204);
  ellipse (200, yCor + anger, diameter + anger, diameter + anger);
  
  //eyebrows
  
  strokeWeight(3);
  stroke (0);
  noFill();
  line (180, yCor+ anger, 195, yCor+ (anger));
  line (210, yCor+ anger, 225, yCor+ (anger));
  

  //creating screen boundaries
  
  if (yCor <= 0 + diameter/2){
  speedY = 3;
    
  }
  
  if (yCor >= (height - diameter/2)){
  speedY = -3
    
  }
  }
}
   


// make a serial port selector object:
function printList(portList) {
  // create a select object:
  portSelector = createSelect();
  portSelector.position(10, 10);
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // add this port name to the select object:
    portSelector.option(portList[i]);
  }
  // set an event listener for when the port is changed:
  portSelector.changed(mySelectEvent);
}

function mySelectEvent() {
  let item = portSelector.value();
  // if there's a port open, close it:
  if (serial.serialport != null) {
    serial.close();
  }
  // open the new port:
  serial.openPort(item);
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
  let inString = serial.readLine();

  if(inString.length <= 0) return;

  if (inString === "potentiometer") {
    dataMode = "potentiometer"
  } else if(inString === "button") {
    dataMode = "button"
  } else if(dataMode === "potentiometer") {
    potentiometerData = inString
  } else if (dataMode === "button") {
    buttonData = inString
  }

  inData = inString
}

const softCopy = (i) => i

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}
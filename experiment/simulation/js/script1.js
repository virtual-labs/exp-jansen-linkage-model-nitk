//program variables

//controls section
var simstatus = 0;
var rotstatus = 1;
//comments section
var commenttext = "Some Text";
var commentloc = 0;
//computing section
var trans = new point(0, 0);
var a = new point(0, 0, "A");
var b = new point(0, 0, "B");
var c = new point(0, 0, "C");
var d = new point(0, 0, "D");
var e = new point(0, 0, "E");
var f = new point(0, 0, "F");
var g = new point(0, 0, "G");
var h = new point(0, 0, "H");

var offset;
var k, ka, kb, kc, det;
var ok, oka, okb, okc, odet;
var pk, pka, pkb, pkc, pdet;
var ABD, BEF, ABG;
var rm;
var dx, dy;
var r1 = 80,
  r2 = 40,
  r3 = 140,
  r4 = 100;
var rab,
  rac = 15 * 2,
  rcd = 50 * 2,
  rbd = 41.5 * 2,
  rbe = 40.1 * 2,
  rde = 55.8 * 2,
  ref = 39.4 * 2,
  rbg = 39.3 * 2,
  rfg = 36.7 * 2,
  rfh = 65.7 * 2,
  rgh = 49 * 2,
  rcg = 61.9 * 2,
  rao = 7.8 * 2,
  rob = 38 * 2;
var BAC = 30; // all angles to be defined either in degrees only or radians only throughout the program and convert as and when required
//var BAC = deg(Math.atan((r2*Math.sin(rad(BAC)))/(r1+r2*Math.cos(rad(BAC)))));
/*k=(rac*rac-rcd*rcd+rbd*rbd+rab*rab)/2;
ka=k-rac*(rab-rbd)*Math.cos(rad(BAC))-rbd*rab;
kb=-2*rac*rbd*Math.sin(rad(BAC));
kc=k-rac*(rab+rbd)*Math.cos(rad(BAC))+rbd*rab;
det=kb*kb-4*ka*kc;
ABD=deg(2*Math.atan((-kb-Math.sqrt(det))/(2*ka)));*/
var temp = 0;
//graphics section
var canvas;
var ctx;
var speed = 7;
var omega2;
//timing section
var simTimeId = setInterval("", "1000");
var time = 0;
//point tracing section
var ptx = [];
var pty = [];
//small point tracing section
var utx = [];
var uty = [];
var trace = false;
const rotationButton = document.getElementById('rotationbutton');

/*
function trythis()
{ alert();}
*/

//change simulation specific css content. e.g. padding on top of variable to adjust appearance in variables window
function editcss() {
  $(".variable").css("padding-top", "30px");
}

function startsim() {
  simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
}

// switches state of simulation between 0:Playing & 1:Paused
function simstate() {
  var imgfilename = document.getElementById("playpausebutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluepausedull") {
    document.getElementById("playpausebutton").src = "images/blueplaydull.svg";
    clearInterval(simTimeId);
    simstatus = 1;
    $("#alphaSpinner").spinner("value", BAC);
    pauseTime = setInterval("varupdate();", "100");
    rotationButton.classList.add('disabled');
    // console.log("disable")
  }
  if (imgfilename == "blueplaydull") {
    time = 0;
    clearInterval(pauseTime);
    document.getElementById("playpausebutton").src = "images/bluepausedull.svg";
    simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
    simstatus = 0;
    rotationButton.classList.remove('disabled');
    // console.log("enable");
  }
}

// switches state of rotation between 1:CounterClockWise & -1:Clockwise
function rotstate() {
  var imgfilename = document.getElementById("rotationbutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluecwdull") {
    document.getElementById("rotationbutton").src = "images/blueccwdull.svg";
    rotstatus = -1;
  }
  if (imgfilename == "blueccwdull") {
    document.getElementById("rotationbutton").src = "images/bluecwdull.svg";
    rotstatus = 1;
  }
}

function varinit() {
  varchange();

  /*$('#ABslider').slider("value", 40);	
$('#ABspinner').spinner("value", 40);

$('#crankslider').slider("value", 20);	
$('#crankspinner').spinner("value", 20);*/

  $("#alphaSlider").slider("value", 55);
  $("#alphaSpinner").spinner("value", 55);

  //Variable omega2 slider and number input types
  $("#omega2Slider").slider("value", 1);
  $("#omega2Spinner").spinner("value", 1);
}

// Initialise and Monitor variable containing user inputs of system parameters.
//change #id and repeat block for new variable. Make sure new <div> with appropriate #id is included in the markup
function varchange() {
  //Link AB
  // slider initialisation : jQuery widget
  /*$('#ABslider').slider({ max : 100, min : 50, step : 2 });
		
// number initialisation : jQuery widget			
$('#ABspinner').spinner({ max : 100, min : 50, step : 2 });
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#ABslider" ).on( "slide", function( h, ui ) { $('#ABspinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#ABspinner" ).on( "spin", function( h, ui ) { $('#ABslider').slider("value",ui.value); ptx=[]; pty=[]; } );
$( "#ABspinner" ).on( "change", function() {  varchange() } );

//Link BC
// slider initialisation : jQuery widget
$('#crankslider').slider({ max : 25, min : 15, step : 1 });
		
// number initialisation : jQuery widget			
$('#crankspinner').spinner({ max : 25, min : 15, step : 1 });
// monitoring change in value and connecting slider and number
// setting trace point coordinate arrays to empty on change of link length
$( "#crankslider" ).on( "slide", function( h, ui ) { $('#crankspinner').spinner("value",ui.value); ptx=[]; pty=[]; } );
$( "#crankspinner" ).on( "spin", function( h, ui ) { $('#crankslider').slider("value",ui.value); ptx=[]; pty=[];} );
$( "#crankspinner" ).on( "change", function() {  varchange() } );*/

  // Angle Alpha
  // slider initialisation : jQuery widget
  $("#alphaSlider").slider({ max: 360, min: 0, step: 1 });

  // number initialisation : jQuery widget
  $("#alphaSpinner").spinner({ max: 360, min: 0, step: 1 });

  //Speed Change
  //sliderintialisation : jquery widget
  //$('#speedslider').slider({ max : 30, min : 7, step : 2 });
  //$('#speedspinner').slider({ max : 30, min : 7, step : 2 });

  // monitoring change in value and connecting slider and number
  $("#alphaSlider").on("slide", function (h, ui) {
    $("#alphaSpinner").spinner("value", ui.value);
  });
  $("#alphaSpinner").on("spin", function (h, ui) {
    $("#alphaSlider").slider("value", ui.value);
  });
  $("#alphaSpinner").on("change", function () {
    varchange();
  });

  //Variable omega2 slider and number input types
  $("#omega2Slider").slider({ max: 5, min: 0, step: 0.2 }); // slider initialisation : jQuery widget
  $("#omega2Spinner").spinner({ max: 5, min: 0, step: 0.2 }); // number initialisation : jQuery widget
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#omega2Slider").on("slide", function (h, ui) {
    $("#omega2Spinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#omega2Spinner").on("spin", function (h, ui) {
    $("#omega2Slider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#omega2Spinner").on("change", function () {
    varchange();
  });

  varupdate();
}

function varupdate() {
  /*$('#ABslider').slider("value", $('#ABspinner').spinner('value'));  //updating slider location with change in spinner(debug)
$('#crankslider').slider("value", $('#crankspinner').spinner('value'));  */
  $("#alphaSlider").slider("value", $("#alphaSpinner").spinner("value"));
  $("#omega2Slider").slider("value", $("#omega2Spinner").spinner("value"));
  //$('#speedslider').slider("value", $('#speedspinner').spinner('value'));

  /*r1=$('#ABspinner').spinner("value");
r2=$('#crankspinner').spinner("value");*/

  //printcomment(pointdist(f,h),1);
  //printcomment(pointdist(g,h),2);

  if (!simstatus) {
    $("#alphaSlider").slider("disable");
    $("#alphaSpinner").spinner("disable");
    $("#omega2set").show();
    //'#speedspinner').spinner("enable");
    omega2 = rotstatus * $("#omega2Spinner").spinner("value");
    BAC = BAC + 0.1 * deg(omega2);
    BAC = BAC % 360;
  }
  if (simstatus) {
    $("#alphaSlider").slider("enable");
    //$('#crankslider').slider("enable");
    $("#alphaSpinner").spinner("enable");
    //$('#crankspinner').spinner("enable");
    $("#speedspinner").spinner("disable");
    $("#omega2set").hide();
    BAC = $("#alphaSpinner").spinner("value");
    omega2 = rotstatus * $("#omega2Spinner").spinner("value");
    ptx = [];
    pty = [];
  }
  rab = Math.sqrt(rao * rao + rob * rob);
  k = (rac * rac - rcd * rcd + rbd * rbd + rab * rab) / 2;
  ka = k - rac * (rab - rbd) * Math.cos(rad(180 + BAC + 11.599595)) - rbd * rab;
  //alert(rab);
  kb = -2 * rac * rbd * Math.sin(rad(180 + BAC + 11.599595));
  kc = k - rac * (rab + rbd) * Math.cos(rad(180 + BAC + 11.599595)) + rbd * rab;
  det = kb * kb - 4 * ka * kc;
  ABD = deg(2 * Math.atan((-kb - Math.sqrt(det)) / (2 * ka)));
  //alert(acttan((-kb-Math.sqrt(det))/(2*ka)));
  //BAC = deg(Math.atan((r2*Math.sin(rad(BAC)))/(r1+r2*Math.cos(rad(BAC)))));
  a.xcoord = 300;
  a.ycoord = 200;
  b.xcoord = a.xcoord - rob;
  b.ycoord = a.ycoord + rao;
  c.xcoord = a.xcoord + rac * Math.cos(rad(BAC));
  c.ycoord = a.ycoord + rac * Math.sin(rad(BAC));
  d.xcoord = b.xcoord + rbd * Math.cos(rad(180 - ABD + 11.599595));
  d.ycoord = b.ycoord - rbd * Math.sin(rad(180 - ABD + 11.599595));
  e.xcoord = b.xcoord - rbe * Math.cos(rad(ABD - 86.268 - 11.599595));
  e.ycoord = b.ycoord - rbe * Math.sin(rad(ABD - 86.268 - 11.599595));
  //alert(180-ABD+86.268);
  ok = (rac * rac - rcg * rcg + rbg * rbg + rab * rab) / 2;
  oka =
    ok - rac * (rab - rbg) * Math.cos(rad(180 - BAC - 11.599595)) - rbg * rab;
  //alert(rab);
  okb = -2 * rac * rbg * Math.sin(rad(180 - BAC - 11.599595));
  okc =
    ok - rac * (rab + rbg) * Math.cos(rad(180 - BAC - 11.599595)) + rbg * rab;
  odet = okb * okb - 4 * oka * okc;
  ABG = deg(2 * Math.atan((-okb - Math.sqrt(odet)) / (2 * oka)));
  g.xcoord = b.xcoord + rbg * Math.cos(rad(180 - ABG - 11.599595));
  g.ycoord = b.ycoord + rbg * Math.sin(rad(180 - ABG - 11.599595));
  //alert(pointdist(c,g));
  pk = (rbg * rbg - rfg * rfg + ref * ref + rbe * rbe) / 2;
  pka = pk - rbg * (rbe - ref) * Math.cos(rad(ABG + ABD - 86.268)) - ref * rbe;
  //alert(ABG+ABD-86.268);
  pkb = -2 * rbg * ref * Math.sin(rad(ABG + ABD - 86.268));
  pkc = pk - rbg * (rbe + ref) * Math.cos(rad(ABG + ABD - 86.268)) + ref * rbe;
  pdet = pkb * pkb - 4 * pka * pkc;
  BEF = deg(2 * Math.atan((-pkb - Math.sqrt(pdet)) / (2 * pka)));
  f.xcoord = e.xcoord + ref * Math.cos(rad(BEF - ABD - 82.133));
  f.ycoord = e.ycoord - ref * Math.sin(rad(BEF - ABD - 82.133));
  //rm=Math.sqrt((b.xcoord-f.xcoord)*(b.xcoord-f.xcoord)+(b.ycoord-f.ycoord)*(b.ycoord-f.ycoord));
  //alert(ABG);
  //alert(pointdist(f,g));
  var BGF = deg(Math.atan((f.ycoord - g.ycoord) / (f.xcoord - g.xcoord)));
  //alert(BGF);
  h.xcoord = g.xcoord - rgh * Math.cos(rad(94.941 - BGF));
  h.ycoord = g.ycoord + rgh * Math.sin(rad(94.941 - BGF));

  draw();
}

function draw() {
  //pointdisp(a); to display point
  //pointjoin(a,b); to join to points with a line
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 550, 400); //clears the complete canvas#simscreen everytime

  /*ctx.beginPath();
  ctx.lineWidth=0.5;
  ctx.strokeStyle= "#cccccc";
  ctx.moveTo(0,b.ycoord);
  ctx.lineTo(550,b.ycoord);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth=0.5;
  ctx.strokeStyle= "#cccccc";
  ctx.moveTo(b.xcoord,0);
  ctx.lineTo(b.xcoord,430);
  ctx.stroke();
  ctx.closePath();
  /*ctx.beginPath();
  ctx.lineWidth=10;
  ctx.strokeStyle= "#0000ff";
  ctx.moveTo(c.xcoord,c.ycoord);
  ctx.lineTo(c.xcoord,c.ycoord);
  ctx.stroke();
  ctx.closePath();*/
  ptx.push(h.xcoord);
  pty.push(h.ycoord);
  //utx.push(c.xcoord);
  //uty.push(c.ycoord);

  //pointjoin(a,b,ctx,"black",1);
  // pointjoin(b,c,ctx,"red",1);
  pointjoin(c, a, ctx, "black", 10);
  pointjoin(c, d, ctx, "blue", 10);
  pointjoin(d, b, ctx, "blue", 10);
  pointjoin(b, e, ctx, "green", 10);
  pointjoin(d, e, ctx, "red", 10);
  pointjoin(b, g, ctx, "red", 10);
  pointjoin(c, g, ctx, "red", 10);
  pointjoin(f, g, ctx, "purple", 10);
  pointjoin(e, f, ctx, "red", 10);
  pointjoin(h, f, ctx, "purple", 10);
  pointjoin(h, g, ctx, "purple", 10);

  pointdisp(a, ctx);
  pointdisp(b, ctx);
  pointdisp(c, ctx);
  pointdisp(d, ctx);
  pointdisp(e, ctx);
  pointdisp(f, ctx);
  pointdisp(g, ctx);
  pointdisp(h, ctx);

  /*ctx.save();
  
  ctx.beginPath();
  ctx.setLineDash([5, 15]);
  ctx.strokeStyle = "#cccccc";
  ctx.moveTo(0,200);
  ctx.lineTo(550, 200);
  ctx.moveTo(300,0);
  ctx.lineTo(300,200);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();*/

  if (trace) {
    pointtrace(ptx, pty, ctx, "blue", 2);
    pointdisp(h, ctx, 2, "", "", "", true, 3);
  } else {
    ptx = [];
    pty = [];
  }
  if (trace) {
    pointtrace(utx, uty, ctx, "red", 2);
    pointdisp(h, ctx, 2, "", "", "", true, 3);
  }
}

function enableGraphDraw() {
  trace = !trace;
}
// prints comments passed as 'commenttext' in location specified by 'commentloc' in the comments box;
// 0 : Single comment box, 1 : Left comment box, 2 : Right comment box
function printcomment(commenttext, commentloc) {
  if (commentloc == 0) {
    document.getElementById("commentboxright").style.visibility = "hidden";
    document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 1) {
    document.getElementById("commentboxright").style.visibility = "visible";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 2) {
    document.getElementById("commentboxright").style.visibility = "visible";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxright").innerHTML = commenttext;
  } else {
    document.getElementById("commentboxright").style.visibility = "hidden";
    document.getElementById("commentboxleft").style.width = "570px";
    document.getElementById("commentboxleft").innerHTML =
      "<center>please report this issue to adityaraman@gmail.com</center>";
    // ignore use of deprecated tag <center> . Code is executed only if printcomment function receives inappropriate commentloc value
  }
}

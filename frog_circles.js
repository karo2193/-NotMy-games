var tableColors=[];
var tableGoodColors=[];
var r=150;
var g=70;
var b=10;
var widthBoard;
var numberOfColors;
var numberOfRandomRotations;

$( document ).ready(function() {

    generateBasicParameters();

    showRandomBoard(widthBoard, numberOfColors);

    $("#generate-board").click( function(e) {
      e.preventDefault();
      console.log("Click board");
      generateBasicParameters()
      $(".button").remove();
      showRandomBoard(widthBoard, numberOfColors);
    });
});

function showRandomBoard(n, numbColors) {
  tableColors=[];
  tableGoodColors=[];
  showGoodBoard(n, numbColors);
  for(l=0; l<numberOfRandomRotations; l++) {
    var numberOfClick = Math.floor(Math.random()*7+1);
    var x=Math.floor(Math.random()*widthBoard);
    var y=Math.floor(Math.random()*widthBoard);
    for(var k=0; k<numberOfClick; k++) {
      clickTile(x,y,false);
    }
    console.log(x+':'+y+'|'+numberOfClick);
  }
}

function showGoodBoard(n, numbColors) {

  generateGoodColors(n,numbColors);

  for(i=0; i<n; i++) {
    var row = '<div class="row">';
    for(j=0; j<n; j++) {
      row += '<div class="button" id="tile'+i+','+j+'" ';
      row += 'style="background-color: rgb('+(tableColors[i][j]*r)%250+','+(tableColors[i][j]*g)%250+','+(tableColors[i][j]*b)%250+');"'
      row += 'onclick="clickTile('+i+','+j+', true)"></div>';
    }
    row += '</div>';
    $("#game").append(row);
  }
}

function generateGoodColors(n,numbColors) {
  for(i=0; i<n; i++) {
    tableColors.push([]);
    for(j=0; j<n; j++) {
      tableColors[i].push(0);
    }
  }
  if(numbColors>1) {
    var color = 1;
    for(i=1; i<((n/2)); i++) {
      for(j=i; j<n-i; j++) {
        tableColors[i][j]=color;
        tableColors[j][i]=color;
        tableColors[n-i-1][j]=color;
        tableColors[j][n-i-1]=color;
      }
      color = (color+1)%numbColors;
    }
  }
  for(var i=0; i<n; i++) {
    tableGoodColors.push([]);
    for(j=0; j<n; j++) {
      tableGoodColors[i].push(tableColors[i][j]);
    }
  }
}

function clickTile(x, y, isPlayer) {
  var temp = tableColors[(x-1+widthBoard)%widthBoard][y];
  tableColors[(x-1+widthBoard)%widthBoard][y]=tableColors[(x-1+widthBoard)%widthBoard][(y+1)%widthBoard];
  tableColors[(x-1+widthBoard)%widthBoard][(y+1)%widthBoard]=tableColors[x][(y+1)%widthBoard];
  tableColors[x][(y+1)%widthBoard]=tableColors[(x+1)%widthBoard][(y+1)%widthBoard];
  tableColors[(x+1)%widthBoard][(y+1)%widthBoard]=tableColors[(x+1)%widthBoard][y];
  tableColors[(x+1)%widthBoard][y]=tableColors[(x+1)%widthBoard][(y-1+widthBoard)%widthBoard];
  tableColors[(x+1)%widthBoard][(y-1+widthBoard)%widthBoard]=tableColors[x][(y-1+widthBoard)%widthBoard];
  tableColors[x][(y-1+widthBoard)%widthBoard]=tableColors[(x-1+widthBoard)%widthBoard][(y-1+widthBoard)%widthBoard];
  tableColors[(x-1+widthBoard)%widthBoard][(y-1+widthBoard)%widthBoard]=temp;
  for(i=x-1; i<=x+1; i++) {
    for(j=y-1; j<=y+1; j++) {
      changeColorOfTile((i+widthBoard)%widthBoard,(j+widthBoard)%widthBoard);
    }
  }
  if(isPlayer) {
    isEndOfGame();
  }
}

function changeColorOfTile(x, y) {
  document.getElementById('tile'+x+','+y).style.backgroundColor = 'rgb('+(tableColors[x][y]*r)%250+','+(tableColors[x][y]*g)%250+','+(tableColors[x][y]*b)%250+')';
}

function isEndOfGame() {
  if(areTheSame(tableColors,tableGoodColors)) {
    console.log("Brawo!!!");
    var tiles = document.getElementsByClassName("button");
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].style.pointerEvents = 'none';
    }
  }
}

function generateBasicParameters() {

  widthBoard = parseInt($("#selectSize")[0].value);
  var level = $("#selectLevel")[0].value;
  numberOfColors = 2;

  switch (level) {
    case "easy":
      numberOfRandomRotations = Math.floor(Math.random()*5+1);
      break;
    case "medium":
      numberOfRandomRotations = Math.floor(Math.random()*6+6);
      break;
    case "hard":
      numberOfRandomRotations = Math.floor(Math.random()*7+12);
      break;
    default:
      numberOfRandomRotations = 6
  }

  if( widthBoard>4 && widthBoard<9) {
    numberOfColors = Math.floor(Math.random()*2+2);
  }
  else if(widthBoard>8) {
    numberOfColors = Math.floor(Math.random()*3+2);
  }
}

function areTheSame(tab1,tab2) {
  if(tab1.length==tab2.length) {
    for (var i = 0; i < tab1.length; i++) {
      if(tab1[i].length==tab2[i].length) {
        for(var j=0; j<tab1[i].length; j++) {
          if(tab1[i][j]==tab2[i][j]) {

          }
          else {
            return false;
          }
        }
      }
      else {
        return false;
      }
    }
  }
  else {
    return false;
  }
  return true;
}

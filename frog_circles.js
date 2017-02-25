var tableColors=[];
var r=150;
var g=70;
var b=10;
var widthBoard = 5;
var numberOfColors = 2;
var numberOfRandomRotations = 3;

$( document ).ready(function() {
    $("#generate-board").click( function(e) {
      e.preventDefault();
      console.log("Click board");
      showRandomBoard(widthBoard, numberOfColors);
    });
});

function showRandomBoard(n, numbColors) {
  showGoodBoard(n, numbColors);
  for(l=0; l<numberOfRandomRotations; l++) {
    var x=Math.floor(Math.random()*widthBoard);
    var y =Math.floor(Math.random()*widthBoard);
    clickTile(x,y);
    console.log(x+':'+y);
  }
}

function showGoodBoard(n, numbColors) {

  generateGoodColors(n,numbColors);

  for(i=0; i<n; i++) {
    var row = '<div class="row">';
    for(j=0; j<n; j++) {
      row += '<div class="button" id="tile'+i+','+j+'" ';
      row += 'style="background-color: rgb('+(tableColors[i][j]*r)%250+','+(tableColors[i][j]*g)%250+','+(tableColors[i][j]*b)%250+');"'
      row += 'onclick="clickTile('+i+','+j+')"></div>';
    }
    row += '</div>';
    $("#game").append(row);
  }
}

//background-color:
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
}

function clickTile(x, y) {
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

}

function changeColorOfTile(x, y) {
  document.getElementById('tile'+x+','+y).style.backgroundColor = 'rgb('+(tableColors[x][y]*r)%250+','+(tableColors[x][y]*g)%250+','+(tableColors[x][y]*b)%250+')';
}

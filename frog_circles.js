var tableBoard=[];

$( document ).ready(function() {
    $("#generate-board").click( function(e) {
      e.preventDefault();
      generateBoard(8, 3);
    });
});

function generateBoard(n, colors) {
  for(i=0; i<n; i++) {
    var row = '<div class="row">';
    for(j=0; j<n; j++) {
      row += '<div class="button" onclick="clickTile('+i+','+j+')"></div>';
    }
    row += '</div>';
    $("#game").append(row);
  }
  var color = 0;
  for(i=0; i<(n/2); i++) {
    for(j=i; j<n-i; j++) {
      tableBoard.push(color);
    }
    color = (color+1)%colors;
  }
}

function clickTile( x, y) {
  console.log(x+','+y);
}

function changeColor(x, y) {

}

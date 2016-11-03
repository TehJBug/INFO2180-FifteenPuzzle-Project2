//Credit given to khalid sharpe for help with timer issues and direction on how to structure the code
//(Was pretty stuck for a little while initially...)


var moves = 0;
var updateInterval;
var diff;//time until update interval hits -- offset
var clk;//clock element
var refreshRate = 1;

window.onload = function(e){

  //Get elements from doc
  var heading = document.getElementsByTagName("h1");
  var btn_shuffle = document.getElementById("shufflebutton");

  var puzzle = document.getElementById("puzzlearea");
  var pieces = puzzle.getElementsByTagName("div");
  //Get context
  var self = this;
  var isSetup = false;
  var timerContainer = newTimer();
  var opts = {}
  opts.delay = refreshRate;

  heading[0].appendChild(timerContainer);//adds the counter and timer into heading

  if(!isSetup)
  {
    var puzzleArea = self.begin();//Self explanatory
  }

  for(var i = 0; i<pieces.length;i++)
  {
      pieces[i].onclick = function(el)
      {
        if(el.target.className == "puzzlepiece movablepiece"){
            moves++;
            puzzleArea = self.Move(puzzleArea,el.target.innerHTML);
            console.log(el.target.innerHTML + "clicked");
        }
      }
  }

  btn_shuffle.onclick = function()
  {
    puzzleArea = shufflePuzzle(puzzleArea);
    resetTimer();
    startTimer();
  }

//-----------------------TIMER FUNCTIONS--------------------------------

  function startTimer()//Self explanatory
  {
    if(!updateInterval)
    {
      diff = Date.now();
      updateInterval = setInterval(incrementTimer,opts.delay);
    }
  }

  function incrementTimer(){
    clk+=updateTimer();
    displayTimer();
  }

  function displayTimer(){
    timerContainer.innerHTML = "<hr />Moves: " + moves + "<br />Time: " + parseInt(clk/1000) + " s <hr />" ;
  }

  function resetTimer(){
    clk = 0;
    displayTimer();
  }

  function updateTimer(){
    var current = Date.now();
    var difference = current - diff;

    diff = current;
    return difference;
  }
}


//END OF TIMER FUNCTIONS

//-----MOVEMENT FUNCTIONS------
function Move(puzzle,el){
  var puzzle_playingArea = document.getElementById("puzzlearea");
  var pieces = puzzle_playingArea.getElementsByTagName("div");

  if(puzzle[el - 1][0] == 16){
    return moveUp(puzzle,el,pieces);
  }
  else if (puzzle[el - 1][1] == 16) {
    return moveRight(puzzle,el,pieces);
  }
  else if(puzzle[el - 1][2] == 16){

    return moveDown(puzzle, el, pieces);
  }
  else if(puzzle[el - 1][3] == 16){

    return moveLeft(puzzle, el, pieces);
  }
}

function makeFixedCell(cell){
  var puzzle = document.getElementById("puzzlearea");
  var pieces = puzzle.getElementsByTagName("div");

  //renders unmovable cells unmovable
  for(var i = 0; i < pieces.length;i++){
    pieces[i].setAttribute("class","puzzlepiece");
  }

  for(var i = 0; i<cell.length;i++){
    if(cell[i]!=null)
    {
      pieces[cell[i]-1].setAttribute("class","puzzlepiece movablepiece");
    }
  }
}

function moveDown(puzzle, el, pieces){

  var topValue = parseInt(pieces[el - 1].style.top, 10);

  pieces[el - 1].style.top = (topValue + 100) + "px";

  if ( puzzle[el - 1][0] != null){ puzzle[puzzle[el - 1][0] -1][2] = 16 }

  if ( puzzle[el - 1][1] != null){ puzzle[puzzle[el - 1][1] -1][3] = 16 }

  if ( puzzle[el - 1][3] != null){ puzzle[puzzle[el - 1][3] -1][1] = 16 }

  if ( puzzle[16 - 1][1] != null){ puzzle[puzzle[16 - 1][1] -1][3] = puzzle[16 - 1][0] }

  if ( puzzle[16 - 1][2] != null){ puzzle[puzzle[16 - 1][2] -1][0] = puzzle[16 - 1][0] }

  if ( puzzle[16 - 1][3] != null){ puzzle[puzzle[16 - 1][3] -1][1] = puzzle[16 - 1][0] }

  var swp = puzzle[el - 1];

  puzzle[el - 1] = puzzle[15];

  puzzle[el - 1][0] = 16;

  puzzle[15] = swp;

  puzzle[15][2] = parseInt(el, 10);

  makeFixedCell(puzzle[15]);

  return puzzle;
}

function moveUp(puzzle, el, pieces){


  var topVal = parseInt(pieces[el - 1].style.top, 10);


  pieces[el - 1].style.top = (topVal - 100) + "px";


  if ( puzzle[el - 1][2] != null){ puzzle[puzzle[el - 1][2] -1][0] = 16 }

  if ( puzzle[el - 1][1] != null){ puzzle[puzzle[el - 1][1] -1][3] = 16 }

  if ( puzzle[el - 1][3] != null){ puzzle[puzzle[el - 1][3] -1][1] = 16 }


  if ( puzzle[16 - 1][1] != null){ puzzle[puzzle[16 - 1][1] -1][3] = puzzle[16 - 1][2] }

  if ( puzzle[16 - 1][0] != null){ puzzle[puzzle[16 - 1][0] -1][2] = puzzle[16 - 1][2] }

  if ( puzzle[16 - 1][3] != null){ puzzle[puzzle[16 - 1][3] -1][1] = puzzle[16 - 1][2] }


  var swp = puzzle[el -1];

  puzzle[el - 1] = puzzle[15];

  puzzle[el - 1][2] = 16;

  puzzle[15] = swp;

  puzzle[15][0] = parseInt(el, 10);

  makeFixedCell(puzzle[15]);

  return puzzle;
}

function moveRight(puzzle, el, pieces){

  //Retrives the offset value of piece from the left margin
  var leftVal = parseInt(pieces[el - 1].style.left, 10);

  //Increases the distance from the margin by 100px
  pieces[el - 1].style.left = (leftVal + 100) + "px";


  //Modifies layout of tiles in the Playing Area
  if ( puzzle[el - 1][0] != null){ puzzle[puzzle[el - 1][0] -1][2] = 16 }

  if ( puzzle[el - 1][2] != null){ puzzle[puzzle[el - 1][2] -1][0] = 16 }

  if ( puzzle[el - 1][3] != null){ puzzle[puzzle[el - 1][3] -1][1] = 16 }


  if ( puzzle[16 - 1][0] != null){ puzzle[puzzle[16 - 1][0] -1][2] = puzzle[16 - 1][3] }

  if ( puzzle[16 - 1][1] != null){ puzzle[puzzle[16 - 1][1] -1][3] = puzzle[16 - 1][3] }

  if ( puzzle[16 - 1][2] != null){ puzzle[puzzle[16 - 1][2] -1][0] = puzzle[16 - 1][3] }


  var swp = puzzle[el - 1];

  puzzle[el - 1] = puzzle[15];

  puzzle[el - 1][3] = 16;

  puzzle[15] = swp;

  puzzle[15][1] = parseInt(el, 10);

  self.makeFixedCell(puzzle[15]);

  return puzzle;
}

function moveLeft(puzzle, el, pieces){

  //Retrives the offset value of piece from the left margin
  var leftVal = parseInt(pieces[el - 1].style.left, 10);

  //Increases the distance from the margin by 100px
  pieces[el - 1].style.left = (leftVal - 100) + "px";


  //Modifies layout of tiles in the Playing Area
  if ( puzzle[el - 1][0] != null){ puzzle[puzzle[el - 1][0] -1][2] = 16 }

  if ( puzzle[el - 1][1] != null){ puzzle[puzzle[el - 1][1] -1][3] = 16 }

  if ( puzzle[el - 1][2] != null){ puzzle[puzzle[el - 1][2] -1][0] = 16 }


  if ( puzzle[16 - 1][0] != null){ puzzle[puzzle[16 - 1][0] -1][2] = puzzle[16 - 1][1] }

  if ( puzzle[16 - 1][2] != null){ puzzle[puzzle[16 - 1][2] -1][0] = puzzle[16 - 1][1] }

  if ( puzzle[16 - 1][3] != null){ puzzle[puzzle[16 - 1][3] -1][1] = puzzle[16 - 1][1] }

  var swp = puzzle[el - 1];

  puzzle[el - 1] = puzzle[15];

  puzzle[el - 1][1] = 16;

  puzzle[15] = swp;

  puzzle[15][3] = parseInt(el, 10);

  makeFixedCell(puzzle[15]);

  return puzzle;
}

//------END OF MOVEMENT FUNCTIONS--------

function begin(){
  var b_Y = 0;
  var b_X = 0;

  var puzzle = document.getElementById("puzzlearea");
  var pieces = puzzle.getElementsByTagName("div");

  for(var i = 0; i <pieces.length;i++)
  {
      pieces[i].setAttribute("class","puzzlepiece");
      pieces[i].style.position = "relative";
      pieces[i].style.float = "left";
      pieces[i].style.top = "0px";
      pieces[i].style.right = "0px";
      pieces[i].style.bottom = "0px";
      pieces[i].style.left = "0px";
      pieces[i].style.backgroundPosition = b_X + "px " + b_Y + "px ";

      if(b_X != -300){
        b_X -= 100;
      }
      else {
        b_Y -= 100;
        b_X = 0;
      }
  }

  //create movable pieces
  pieces[14].setAttribute("class","puzzlepiece movablepiece");
  pieces[11].setAttribute("class","puzzlepiece movablepiece");

  //Returns original layout of puzzle
  return [  [null,2,5,null], [null,3,6,1], [null,4,7,2], [null,null,8,3],[1,6,9,null], [2,7,10,5], [3,8,11,6], [4,null,12,7], [5,10,13,null], [6,11,14,9], [7,12,15,10], [8,null,16,11],[9,14,null,null], [10,15,null,13], [11,16,null,14], [12,null,null,15]];
}

function shufflePuzzle(puzzle){
  var rand = limitedRandomInt(4);//Generates random int

  for (var x = 1; x <= 50; x++)
  {
    while(puzzle[15][rand] == null){
      rand = limitedRandomInt(4);
    }

    puzzle = Move(puzzle,puzzle[15][rand]);

    rand = limitedRandomInt(4);
  }

  resetMoves();
  return puzzle;
}

//---------------HELPER FUNCTIONS--------------
function limitedRandomInt(limit){
  return Math.floor((Math.random() * limit));
}
function resetMoves()
{
  moves = 0;
}

function newTimer(){
  return document.createElement("span");//creates element that has counter and timer
}

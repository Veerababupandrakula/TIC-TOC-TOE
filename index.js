const cells=document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const restartBtn=document.querySelector("#restartBtn");
const winCoditions=[
    [0,1,2], [3,4,5],[6,7,8] ,
    [0, 3, 6], [1,4,7],[2,5,8],
    [0, 4, 8], [2,4,6] 
];
let options=["","","","","","","","",""];
let currentPlayer="X";
let running =false;
startGame();

function startGame(){
  cells.forEach(cell => cell.addEventListener("click",cellClicked));
  restartBtn.addEventListener("click",restartGame);
  statusText.textContent=`${currentPlayer}'s turn`;
  running=true;
}

function cellClicked(){
     const cellindex=this.getAttribute("cellIndex");
     if(options[cellindex]!="" || !running)
     {
        return;
     }
     updateCell(this,cellindex);
     checkWinner();
}

function updateCell(cell,index){
     options[index]=currentPlayer;
     cell.textContent=currentPlayer;
}

function changePlayer(){
  currentPlayer=(currentPlayer=="X")?"O":"X";
  statusText.textContent=`${currentPlayer}'s turn`;
}
function checkWinner(){
   let roundWon=false;

   for(let i=0;i<winCoditions.length;i++){
    const condition=winCoditions[i];
    const cellA=options[condition[0]];
    const cellB=options[condition[1]];
    const cellC=options[condition[2]];
    if(cellA=="" || cellB=="" ||cellC=="")
    {
        continue;
    }
    else if (cellA==cellB && cellB==cellC ){
        roundWon=true;
        break;
    }
   }
   if(roundWon)
   {
    statusText.textContent=`${currentPlayer}'s wins`;
    running=false;
   }
   else if(!options.includes("")){
    statusText.textContent=`$draw`;
   }
   else{
    changePlayer();
   }
}

function restartGame(){
   currentPlayer="X";
   options=["","","","","","","","",""];
   statusText.textContent=`${currentPlayer}'s turn`;
   cells.forEach(cell=>cell.textContent="");
   running=true;

}
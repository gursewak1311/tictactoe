let t0 = document.getElementById('0');
let t1 = document.getElementById('1');
let t2 = document.getElementById('2');
let t3 = document.getElementById('3');
let t4 = document.getElementById('4');
let t5 = document.getElementById('5');
let t6 = document.getElementById('6');
let t7 = document.getElementById('7');
let t8 = document.getElementById('8');
//The user will be signaled to start the game using this element
let signal = document.getElementById('signal');

//An array to store keep track of the boxes while computer is playing
const boxes = [0,1,2,3,4,5,6,7,8];

let result = document.getElementById("result");
let restartBtn = document.getElementById("restartBtn");
let error = document.getElementById("error");
let selectedChoice = document.getElementById("selectedChoice");
var numberOfBoxesLeftEmpty = 9;
// To count how many times the user and computer have marked an entry
var counter = 0;

// when the "Start Game" button is clicked 'runGame' method is invoked
selectedChoice.onclick = () => runGame();

restartBtn.onclick = () => restart();

function runGame(){
    signal.innerText = "You may start playing 😁👍";
    //checks which value of the radio button is clicked
    var selected = document.querySelector('input[name="choice"]:checked');
    if(selected.value === "no")
    {
        twoPlayersPlaying()
    }
    else
    {
        OnePlayerPlaying()
    }
}

function twoPlayersPlaying()
{
    //method describes what the individual box will do
    BoxAction()
}

function BoxAction(){
    // here whenever the box is clicked a method name BoxClicked is called 
    t0.onclick = () => BoxClicked(t0);
    t1.onclick = () => BoxClicked(t1);
    t2.onclick = () => BoxClicked(t2);
    t3.onclick = () => BoxClicked(t3);
    t4.onclick = () => BoxClicked(t4);
    t5.onclick = () => BoxClicked(t5);
    t6.onclick = () => BoxClicked(t6);
    t7.onclick = () => BoxClicked(t7);
    t8.onclick = () => BoxClicked(t8);
}

function BoxClicked(boxNo)
{
    /*Boxfilled checks if the box is empty or filled.
    If the box is empty then value returned is true and 'if' statement works*/
    if(BoxFilled(boxNo))
    {
        //counter is used to increment each time the box is filled and helps alternate the 'O' and 'X'
        ++counter;
        //If the counter is even then 'X' is assigned to the box
        if(counter%2 == 0)
        boxNo.innerText = 'X'
        else
        boxNo.innerText = 'O'
        //Each time a box is filled, we check if there is a winner or not 
        checkResult(counter);
    }
    
}

function BoxFilled(box)
{
    if(box.innerText === 'X')
    {
        return false;
    }
    if(box.innerText === 'O')
    {
        return false;
    }
    else
    return true;
}

function checkResult(counter)
{
    //Comparing the values according to tik tac toe rules.
    if(t0.innerText == t4.innerText && t4.innerText == t8.innerText)
    {
        //'whoWins' method sets the result on the screen and pauses the game
        whoWins(t0.innerText)
    }
    if(t0.innerText == t3.innerText && t3.innerText == t6.innerText)
    {
        whoWins(t0.innerText)
    }
    if(t1.innerText == t4.innerText && t4.innerText == t7.innerText)
    {
        whoWins(t1.innerText)
    }
    if(t2.innerText == t5.innerText && t5.innerText == t8.innerText)
    {
        whoWins(t2.innerText)
    }
    if(t2.innerText == t4.innerText && t4.innerText == t6.innerText)
    {
        whoWins(t2.innerText)
    }
    if(t3.innerText == t4.innerText && t4.innerText == t5.innerText)
    {
        whoWins(t3.innerText)
    }
    if(t0.innerText == t1.innerText && t1.innerText == t2.innerText)
    {
        whoWins(t0.innerText)
    }
    if(t6.innerText == t7.innerText && t7.innerText == t8.innerText)
    {
        whoWins(t6.innerText)
    }
    //if all the boxes are filled then it is a draw
    if (counter == 9)
    {
        whoWins('D')
    }
}

function whoWins(winnerText)
{
    if(winnerText == 'X')
    {
        result.innerText = "Player 2 wins"
        pauseGame();
    }
    else if(winnerText == 'O')
    {
        result.innerText = "Player 1 wins"
        pauseGame();
    }
    else if(winnerText == 'D')
    {
        result.innerText = "Its a draw"
    }
}

function restart(){
    // restart function is to set all the values to default
    runGame();
    //it cuts the existing log of boxes available and adds them again
    boxes.splice(0,boxes.length,0,1,2,3,4,5,6,7,8);
    //resets the box text to empty
    t0.innerText = '';
    t1.innerText = '';
    t2.innerText = '';
    t3.innerText = '';
    t4.innerText = '';
    t5.innerText = '';
    t6.innerText = '';
    t7.innerText = '';
    t8.innerText = '';
    counter = 0;
    numberOfBoxesLeftEmpty = 9;
    result.innerText = '';
    error.innerText = '';
}
// when one person is playing 
function OnePlayerPlaying(){
    //The box onclick actions change
    t0.onclick = () => BoxClickedSinglePerson(t0);
    t1.onclick = () => BoxClickedSinglePerson(t1);
    t2.onclick = () => BoxClickedSinglePerson(t2);
    t3.onclick = () => BoxClickedSinglePerson(t3);
    t4.onclick = () => BoxClickedSinglePerson(t4);
    t5.onclick = () => BoxClickedSinglePerson(t5);
    t6.onclick = () => BoxClickedSinglePerson(t6);
    t7.onclick = () => BoxClickedSinglePerson(t7);
    t8.onclick = () => BoxClickedSinglePerson(t8);

}

function BoxClickedSinglePerson(boxNo)
{
    if(BoxFilled(boxNo))
    {
        //getting the box number which was clicked
        let BoxNumber = parseInt(boxNo.id);
        //searching the index position of the box clicked in boxes array
        let position = boxes.indexOf(BoxNumber);
        //removing the box from the array
        boxes.splice(position,1)
        ++counter;
        boxNo.innerText = 'X';
        --numberOfBoxesLeftEmpty;
        checkResult(counter);
        // then comes the computer's turn 
        computerChoice();
    }
    
}

function computerChoice(){
    //helps to generate a random number from the boxes array, when the boxes are decreasing while being filled
    let box = boxes[Math.floor(Math.random() * numberOfBoxesLeftEmpty) ];
    //we remove the box selected  by computer from the array boxes
    let indexPosition = boxes.indexOf(box);
    boxes.splice(indexPosition,1)
    --numberOfBoxesLeftEmpty
    switch(box){
        case 0:
            t0.innerText = 'O'
            break;
        case 1:
            t1.innerText = 'O'
            break;
        case 2:
            t2.innerText = 'O'
            break;
        case 3:
            t3.innerText = 'O'
            break;
        case 4:
            t4.innerText = 'O'
            break;
        case 5:
            t5.innerText = 'O'
            break;
        case 6:
            t6.innerText = 'O'
            break;
        case 7:
            t7.innerText = 'O'
            break;
        case 8:
            t8.innerText = 'O'
            break;
    }
    ++counter;
    checkResult(counter);
}



function pauseGame()
{
    t0.onclick = () => pauseGame();
    t1.onclick = () => pauseGame();
    t2.onclick = () => pauseGame();
    t3.onclick = () => pauseGame();
    t4.onclick = () => pauseGame();
    t5.onclick = () => pauseGame();
    t6.onclick = () => pauseGame();
    t7.onclick = () => pauseGame();
    t8.onclick = () => pauseGame();
    error.innerText = "The winner is declared!"
}



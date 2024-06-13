var DepressionTest=[
    "No interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Poor appetite or overeating",
    "Feeling tired or having little energy",
    "Thoughts that you would be better off dead, or of hurting yourself",
    "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed",
    "Do you ever feel to give such mental Health test",
    ""
]

var length = DepressionTest.length;

var currentQuestionIndex=-1;

function startGame(){
    currentQuestionIndex = -1;
    $(".start-btn").click(function(){
        $(this).toggleClass('hide');
        $("#question-container").removeClass('hide');
        $("#next-button").removeClass('hide');
    })
}
var score = 0;
var final_score = 0;

$("#next-button").click(function(){
    currentQuestionIndex++;
    $("#question").text(DepressionTest[currentQuestionIndex]);
    $("#question-count").text(`${currentQuestionIndex+1}/${DepressionTest.length}`);

    if(currentQuestionIndex==length-1){
        $("#next-button").addClass('hide');
        $("#result-button").removeClass('hide');
        $("#question-count").addClass('hide');

    }
    $(".btn").click(function(){
        score = parseInt($(this).attr('name'));
    })
    // if(score === NaN){
    //     score = 0;
    // }
    score = score ? score : 0;
    final_score+=score;
    console.log(final_score);
});
$("#result-button").click(function(){
    var Result = "";
    final_score = final_score/8;
    if(final_score <= 0){
        Result = "Your have severe Depression.😫";
    }
    if(final_score >1 && final_score <=2){
        Result = "You are in Depression.😩";
    }
    if(final_score >2 && final_score <3){
        Result = "You are having Mild Depression.😳";
    }
    if(final_score ==4){
        Result = "You are in the Middle.😬";
    }
    if(final_score >2.5 && final_score <=5){
        Result = "You are fine.😊";
    }
    if(final_score>3 && final_score<=6){
        Result = "Chill you are perfectly fine.😄";
    }
    $("#result").text(Result);
});

startGame();

// Get references to the buttons and result div
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-button');
const resultButton = document.getElementById('result-button');
const resultDiv = document.getElementById('result');

// Add event listener for the "Show Result" button
resultButton.addEventListener('click', function() {
    // Show the result div when the button is clicked
    resultDiv.style.display = 'block';
});

// You can add more JavaScript to handle other functionalities

var sec = 20;
var counter = 0;
var correctAnswer = 0;
var missedtAnswer = 0;
var inCorrectAnswer = 0;
var interval;
var questions = [
    { q: "What is the world's longest river?", a1: "Nile", a2: "Amazon.", a3: "Ganges", a4: "Mississippi", correct: "Amazon." },
    { q: "What is the diameter of Earth?", a1: " 20,000 miles", a2: " 1,000 miles", a3: " 9,000 miles", a4: " 8,000 miles", correct: " 8,000 miles" },
    { q: "What is the Name the world's largest ocean?", a1: "Pacific", a2: "Atlantic", a3: "Indian", a4: "Arctic", correct: "Pacific" },
    { q: "What is the capital city of Spain?", a1: "Las Palmas", a2: "Barcelona", a3: "Madrid", a4: "Malaga", correct: "Madrid" },
    { q: "What is the Name Of the world's biggest island?", a1: "Greenland", a2: "New Guinea", a3: "Borneo", a4: "Baffin Island", correct: "Greenland" }
];
var score = 0;
var questionIndex = 0;
$("document").ready(function () {
    $(".hide_answers").hide();
    $(".resultArea").hide();
    $("#startGame").on("click", function () {
    $(".hide_answers").show();
    $(".resultArea").hide();
    $("#counter").text(timerFunc());
    renderQuestion();
    $("#startGame").hide();
    });
    $(".answer").on("click", function () {

        result_q($(this).text());
        $(this).attr("button")
        questionIndex++;
        renderQuestion();
    });

    function result_q(result) {
        if (result === questions[questionIndex].correct) {
            $("#answer1Img").empty();
            $("#answer1Img").show();
            var newimage = $("<div>");
            newimage.html("<img src=assets/images/right.png>");
            $("#answer1Img").append(newimage);
            $("#answer1Img").delay(1000).hide(1);
            correctAnswer++;
            counter = 0;
        }
        else {
            $("#answer1Img").empty();
            $("#answer1Img").show();
            var newimage = $("<div>");
            newimage.html("<img src=assets/images/wrong.png>"); 
            $("#answer1Img").append(newimage);
            $("#answer1Img").delay(1000).hide(1);
            inCorrectAnswer++;
            counter = 0;
        }
    }
   
    // Function to render questions.
    function renderQuestion() {
        if (questionIndex <= (questions.length - 1)) {
            $("#question").text(questions[questionIndex].q);
            $("#answer1").text(questions[questionIndex].a1);
            $("#answer2").text(questions[questionIndex].a2);
            $("#answer3").text(questions[questionIndex].a3);
            $("#answer4").text(questions[questionIndex].a4);
            $("#statusbar").text("question " + (questionIndex + 1) + " Out Of " + questions.length);
            $("#counter").text(" ");
        }
        else {
            $(".hide_all").hide();
            $(".hide_result").show();
            clearInterval(interval);
            finalResult();
        }
        // Function to set timers.
    }
    function timerFunc() {
        $("#counter").text('');
        var timer = $("#counter");
        function timeIt() {
                    /*  var audio = new Audio('test.wav');
                        audio.play();        
                     */ 
           var cnt = sec - counter;
            timer.html(" Time remaining is " + cnt + " Second");
            counter++;
            if (cnt === 0) {
                missedtAnswer++;
                questionIndex++;
                renderQuestion();
                counter = 0;
            }
            return counter;
        }
        interval = setInterval(timeIt, 1000);
    }
    function finalResult() {
        $(".resultArea").empty();
        $(".resultArea").show();
        $(".hide_answers").hide();
        var correct = $("<p>").text("Correct Answers : " + correctAnswer);
        $(".resultArea").append(correct);
        var wrong = $("<p>").text(" InCorrect Answers : " + inCorrectAnswer);
        $(".resultArea").append(wrong);
        var missed = $("<p>").text(" Missed Questions : " + missedtAnswer);
        $(".resultArea").append(missed);
        $("#startGame").show();
        $("#counter").text('');
        $("#question").text('');
        $("#statusbar").text('');
        questionIndex = 0;
    }
});
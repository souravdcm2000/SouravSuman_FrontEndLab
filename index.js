(function () {
    function Quiz(questions) {
        this.questions = [...questions];
        this.score = 0;
        this.questionIndex = 0;
    } 

    function Question(textOfTheQuestion, choices, answer) {
        this.textOfTheQuestion = textOfTheQuestion;
        this.choices = choices;
        this.answer = answer;
    }

    Quiz.prototype.getQuestionByIndex = function() {
        return this.questions[this.questionIndex];
    }

    Quiz.prototype.checkOptionWithAnswer = function(answer) {
        if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
            this.score++;
        }

        this.questionIndex++;
    }

    Quiz.prototype.isEnded = function() {
        //console.log('isEnded?', this.questionIndex === this.questions.length);
        return this.questionIndex === this.questions.length;
    }


    Question.prototype.isCorrectAnswer = function(choice) {
        return this.answer === choice;
    }

    const arrayOfQuestions = [
        new Question("Question 1", ["op1", "op2", "op3", "op4"], "op1"),
        new Question("Question 2", ["op1", "op2", "op3", "op4"], "op2"),
        new Question("Question 3", ["op1", "op2", "op3", "op4"], "op3"),
    ];

    const quiz = new Quiz(arrayOfQuestions);

    async function loadQuestions() {
        // if quiz is ended -> show score
        // else
            // fetch and update question
            // fetch the options
            // for or foreach or map ->> update options, then invoke handleOption
            // show progress
        if (quiz.isEnded()) {
            showScore();
        } else {
            let questionText = document.getElementById('question');
            //console.log('question', quiz.getQuestionByIndex());
            questionText.innerText = await quiz.getQuestionByIndex().textOfTheQuestion;
            let choices = await quiz.getQuestionByIndex().choices;
            //console.log('Choices', choices)
            for (let i = 0; i < choices.length; i++) {
                const choice = choices[i];
                //console.log('choice', choice);
                let choiceElement = document.getElementById('choice' + i);
                choiceElement.innerText = choice;

                let buttonElement = document.getElementById('btn' + i);
                buttonElement.value = choice;
                //console.log('button element', buttonElement)
                buttonElement.onclick = () => handleOption(choice);

                //console.log('index', quiz.questionIndex)
                //console.log("length of questions", quiz.questions.length)
            }

            showProgress();
        }
    }

    function handleOption(choice) {
        console.log('Clicked', choice);
        // define onClick behavious for each of the buttons
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }

    function showProgress() {
        // update the footer p
        let currentQuestionNumber = quiz.questionIndex + 1;
        let footer = document.getElementById('progress');
        footer.innerText = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
    }

    function showScore() {
        // Create h1
        // add score and add % to h1
        // add h1 to quiz html element
        let quizOverHTML = "<h1>Result</h1>";
        quizOverHTML += "<h2>Your score: " + quiz.score + " with percentage " + calcPercentage(quiz.score, quiz.questions.length) + "% </h2>";
        let quizElement = document.getElementById("quiz");
        quizElement.innerHTML = quizOverHTML;
    }

    function calcPercentage(numerator, denominator) {
        return (Math.floor((parseFloat(numerator) / parseFloat(denominator)) * 10000) / 10000) * 100;
    }

    loadQuestions();
})();
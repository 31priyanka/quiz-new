const quizData = [
    {
        question: " What year was JavaScript launched?",
        a:1996,
        b:1995,
        c:1994,
        d:"none of the above",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a:"Hypertext Markup Language",
        b:"Hypertext Markdown language",
        c:"Hyperloop Machine language",
        d:"Helicopters Terminals motorboats Lamborginis",
        correct: "a",
    },
    {
        question: " Which language runs in a web browser?",
        a:"Java",
        b:"C",
        c:"Python",
        d:"JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a:"Central Style Sheet",
        b:"Cascading Style Sheet",
        c:"Cascading Simple sheets",
        d:"Cars SUVs Sailboats",
        correct: "b",
    }
];

const quizapp = document.getElementById('quiz')
const answers = document.querySelectorAll('.answer')
const questions = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const next = document.getElementById('next')
const previous = document.getElementById('previous')

var modalbox = document.getElementById("modalbox")
var login = document.getElementById("login")
var username = document.getElementById("username")
var email = document.getElementById("email")
const usernameDisplay = document.getElementById("usernameDisplay");

let count = 0
let currentQuiz = 0
let backbtn =0
let score = 0
let currentQuizData = 0;
// *Random function calling
shuffleQuestions()

// Loading quiz array function
function loadQuiz(){

    // deselectAnswer call
    deselectAnswers()
    currentQuizData = quizData[currentQuiz]
    // Loading questions
    questions.innerText = currentQuizData.question
    
    if(backbtn==0){
        previous.style.display="none";
        backbtn++;
    }
    else{
        previous.style.display="block";
    }
    // loading options
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
    } 

function deselectAnswers(){
    answers.forEach(answer1 => answer1.checked = false)
}

function getSelected() {
    let answer;
    answers.forEach(answer1 => {
        if(answer1.checked) {
            answer = answer1.id
        }
    })
    // localStorage.setItem(currentQuiz, answer);
    return answer
}
var Userx;
var Emailx;
var Scorex;

// *Next submit button
next.addEventListener('click', () => {
    const answer = getSelected();
    if(answer) {
        if (answer === quizData[currentQuiz].correct){
            score++ 
        }
        currentQuiz++;

        if(currentQuiz < quizData.length){
            loadQuiz()
        } else {
            // *Result box
            const getResult = document.getElementById("resultbox");

            quizapp.addEventListener('click', (e) => {

                e.preventDefault()
                quizapp.style.display = 'none';

                getResult.style.display = 'block';

                // *Correct answer
                
                var getScoredata = score;
                Scorex = getScoredata;

                let getData = localStorage.getItem(Emailx)
                getData = JSON.parse(getData)

                let newobj = {
                    "username": getData.Username,
                    "Email": getData.Email,
                    "score": Scorex
                }
                let x = localStorage.setItem(Emailx, JSON.stringify(newobj))
                var CurrentUserScore = localStorage.getItem(Emailx);
                const datastore = JSON.parse(CurrentUserScore);

                document.getElementById("totalcorrect").innerHTML = datastore.score;
// 4.  All the users that attended quiz their details should also retain.
                for (let i = 0; i < localStorage.length; i++) {
                    NEW = JSON.parse(localStorage.getItem(localStorage.key(i)))
// 9.  Result screen will be in tabular form that shows username email and Their score.
                    alltable.innerHTML += `
                    <table>
                       <tr>

                         <td>${i + 1}</td> 

                         <td>${NEW.username}</td> 
                        
                         <td>${NEW.Email}</td>
                        
                         <td>${NEW.score}</td>

                       </tr>
                       
                     </table>   
                    `
                }
            });
        };
 
    } else {
        alert("Please select an option");
    }
})


const getModel = document.getElementById("login")
let tryObj = {}
const form = document.getElementById('modalbox')



// *login submit button
modalbox.addEventListener('submit',(e) => {
    e.preventDefault()
    let username1 = username.value;
// *calling of validation form
    if (formvalidation() == false) {
        return false;      
    }
    // localStorage.setItem(username1, email1);

    usernameDisplay.textContent = username1;
    
    login.style.display = 'none';
    quizapp.style.display = 'block';
    loadQuiz()

    let getUser = document.getElementById('username').value
    let getEmail = document.getElementById('email').value
    Emailx = getEmail;

    const getResult = document.getElementById("resultbox");
// 7.  If the same user came again with same email then it will directly show them their previous result screen. 
    for (let i = 0; i < localStorage.length; i++) {
        let UserEmail = localStorage.key(i)
        
        if (UserEmail == Emailx) {
            let CurrentUserScore = localStorage.getItem(Emailx);
            const datastore = JSON.parse(CurrentUserScore);
            alert("You've already attempted the Quiz! Here is your result!")
            document.getElementById("totalcorrect").innerHTML = datastore.score;

            document.getElementById('usernamea').innerHTML = datastore.username

            for (let a = 0; a < localStorage.length; a++) {
                takeEmail = JSON.parse(localStorage.getItem(localStorage.key(i)))

                alltable.innerHTML += `
                <table>
                   <tr>
                     <td>${a + 1}</td> 

                     <td>${takeEmail.username}</td> 
                    
                     <td>${takeEmail.Email}</td>
                    
                     <td>${takeEmail.score}</td>
                   </tr>

                 </table>   
                `
            }
            quizapp.style.display = "none";
            getResult.style.display = "block";
            return false
        }
    }
    getModel.style.display = 'none';
    quizapp.style.display = 'block';

    tryObj = {
        "Username": getUser,
        "Email": Emailx
    }
    count++;
    let x = localStorage.setItem(Emailx, JSON.stringify(tryObj))

    let m1 = localStorage.getItem(Emailx)
    m1 = JSON.parse(m1)

    var aq = document.getElementById('usernameDisplay');
    aq.value = m1.Username;
    let m = document.getElementById('usernamea');
    m.innerHTML = m1.Username; 
 

});

//1. validation form 
const isValidEmail = email_check => {
    const Regex = /^(([a-zA-Z]+[^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Regex.test(String(email_check).toLowerCase());
}
// validation function
function formvalidation() {
    var nameuser = form.username.value;
    var checkemail = form.email.value;

    if (nameuser == null || nameuser == "") {
        alert("UserName can't be blank");
        return false;

    } else if (nameuser.length < 8) {
        alert("Name can't be less than 8 characters!")
        return false;
    }
    else if (checkemail == null || checkemail == "") {
        alert("UserEmail can't be blank");
        return false;
    }
    else if (!isValidEmail(checkemail)) {
        alert("Invalid email! Please enter valid email to proceed");
        return false;
    }
    else {
        return true;
    }
}

//5. Back button
previous.addEventListener("click", () => {
    if(currentQuiz > 0){
        currentQuiz --;
        loadQuiz()
    }
});

// random function
function shuffleQuestions() {
    for (var i = quizData.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = quizData[i];
      quizData[i] = quizData[j];
      quizData[j] = temp;
    }
}

// 6. Reset button for new session. 
reset.addEventListener("click", (e) => {
    e.preventDefault()
    resultbox.style.display = 'none';
    login.style.display = 'block';
    location.reload()
    // 8.  After 10th quiz browser should automatically closed with message that u have exceeded limit for quiz . Please start new session .
    if(localStorage.length >= 10){
        alert("You've exceeded limit for quiz . Please start new session .")
        localStorage.clear();
        window.close();
        document.write("Refresh page to start new session!")
    } 
});

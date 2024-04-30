//Elements
let container = document.querySelector(".container")
let lis = document.querySelectorAll("ul  li");
let slide_bar = document.querySelector(".slide-bar");
let close_subjects = document.querySelector(".close-subjects")


// let res = document.querySelector(".result-show");
//dependant vars
let currentIndex = 0;
let true_answer = 0;

//fetch the ques
function quesLink(link) {
let request = new XMLHttpRequest();
request.onload = function() {
    let obj = JSON.parse(this.responseText)
    let objLength = Object.keys(JSON.parse(this.responseText)).length
    
        if(this.status === 200 && this.readyState === 4) {
            let btn = document.querySelector(".result-btn");
            pageContent(obj[currentIndex], objLength);
            const quizArea = document.querySelector(".quiz-area");
            const quizFooter = document.querySelector(".quiz-footer");
            const result_area = document.createElement("div")
            const result_show = document.querySelector(".result-show")
            result_area.className = 'result-area';
            btn.addEventListener("click", () => {
                if(currentIndex < (objLength - 1)) {
                    const h = document.querySelector(".quiz-area .ques")
                    const answers = document.querySelector(".answers")
                    
                    //please return this again
                    //store result to another box and show it laterally
                    
                    quizArea.innerHTML = '';
                    quizFooter.children[0].innerHTML = '';
                    
                    createResultShow(h, answers, result_show)
                    // next ques of the current ques 
                    currentIndex++
                    
                    //call the fn again to get another ques in the specific condition
                    pageContent(obj[currentIndex], objLength);
                    if(currentIndex === (objLength - 1)){
                        btn.textContent = 'Show Result';
                        btn.addEventListener("click", () => {
                            if(btn.textContent === 'Show Result') {
                                //please return this again
                                //store result to another box and show it laterally
                                showResult(
                                    quizArea,
                                    quizArea,
                                    result_show,
                                    bullets,
                                    btn,
                                    request,
                                    objLength
                                    );
                            }
                        })
                    };
                    //put active class to each bullet 
                    const bullets = document.querySelector(".bullets");
                    for(i = 1; i <= currentIndex; i++) {
                        bullets.children[i].classList.add("active")
                    }
                }  
            });

            lis.forEach(li => {
                if(li.classList.contains("active")) {
                    if(objLength === 1) {
                        btn.textContent = 'Show Result'
                        if(btn.textContent === 'Show Result') {
                            console.log(objLength)
                            btn.addEventListener("click", () => {
                                const bullets = document.querySelector(".bullets")
                                showResult(
                                    quizArea,
                                    quizArea,
                                    result_show,
                                    bullets,
                                    btn,
                                    request,
                                    objLength
                                    );
                            })
                        }
                    }
                }
            })
        }
};

request.open("GET", link, true)
request.send();
}

function showResult(
    quizArea,
    quizArea,
    result_show,
    bullets,
    btn,
    request,
    objLength
    ) {
    const h = document.querySelector(".quiz-area .ques")
    const answers = document.querySelector(".answers")
    // const result_show = document.querySelector(".result-show")
    createResultShow(h, answers, result_show)
    quizArea.innerHTML = ''
    quizArea.classList.add("result");
    bullets.innerHTML = ''
    btn.style.display = 'none';
    
    result_show.style.display = 'block';
    setTimeout(() => {
        document.querySelector(".quiz-app").classList.add("finished")
        result_show.classList.add("showed")
    },3000)
    
    let result = document.createElement("span");
    //access the class to put the formats
    result.className = 'final-result';
    
    //show final result
    result.textContent = `${true_answer}/${Object.keys(JSON.parse(request.responseText)).length}`
    quizArea.appendChild(result);
    
    //Evaluate the answers:-
    let evaluation_result = document.createElement("span")
    evaluation_result.className = "evaluation-result";

    if(true_answer < objLength / 2) {
        evaluation_result.innerHTML = '<span>Bad</span> Result'
        evaluation_result.children[0].classList.add("bad");
    } else if(true_answer >= objLength / 2 && true_answer < objLength) {
        evaluation_result.innerHTML = '<span>Good</span> Result'
        evaluation_result.children[0].classList.add("good");
    } else {
        evaluation_result.innerHTML = '<span>Perfect</span> Result'
        evaluation_result.children[0].classList.add("perfect");
    }
    
    quizArea.appendChild(evaluation_result)

    let timer = document.querySelector(".timer")
    timer.parentElement.remove();

    const selectedAnswers = document.querySelectorAll(".box .answer")
    Array.from(selectedAnswers).some(selectedAnswer => {
        let true_false_answer = document.createElement("span")
        if(selectedAnswer.classList.contains('selected')) {
            selectedAnswer.style.opacity = '1';
            selectedAnswer.style.borderBottomColor = '#2196f3';
            if(selectedAnswer.children[1].textContent === selectedAnswer.children[1].getAttribute("answer-value")) {
                selectedAnswer.classList.add("true")
                true_false_answer.innerHTML = "&#10004;" 
            } else if(selectedAnswer.children[1].textContent !== selectedAnswer.children[1].getAttribute("answer-value")) {
                selectedAnswer.classList.add("false")
                true_false_answer.innerHTML = "&#10006;"
            }
        } else {
            if(selectedAnswer.children[1].textContent === selectedAnswer.children[1].getAttribute("answer-value")) {
                selectedAnswer.style.opacity = '1'
                selectedAnswer.classList.add("true")
                true_false_answer.innerHTML = "&#10004;" 
            }
        }
        selectedAnswer.appendChild(true_false_answer) 
    })
}

lis.forEach(li =>{
    li.addEventListener("click", () => {
        lis.forEach(e => e.classList.remove("active"));
        li.classList.add("active")
        if(li.classList.contains("active")) {
            //Must reset the currentIndex & true_answer again; 
            currentIndex = 0;
            true_answer = 0;

            let quizApp = document.createElement("div")
            quizApp.className = 'quiz-app';
            
            quizApp.innerHTML = '';
            setTimeout(() => {
                quizApp.classList.add("active");
            }, 100)
            container.appendChild(quizApp);
            if(quizApp.previousElementSibling) {
                quizApp.previousElementSibling.remove();
            }
                quizApp.innerHTML = `
                <div class="category">
                <span class="appear-subjects"><i class="fa-solid fa-bars"></i></span>
                <h3>Subject <span class='subject-name'></span></h3>
                    <div class="ques-number">Question Number <span></span></div>
                </div>
                <div class="quiz-area"></div>
                <div class="quiz-footer">
                    <div class="bullets"></div>
                    <div class="btn-timer">
                    </div>
                    </div>
                    <button class='result-btn'>Show Next</button>
                    <div class="result-show"></div>
                    `;
                    quesLink(`../json files/${li.textContent}.json`);                    
                    let subject_name = document.querySelector(".category h3 .subject-name");
                    subject_name.textContent = li.textContent

                    let appear_subjects = document.querySelector(".category .appear-subjects");
                    appear_subjects.classList.add("active")

                    appear_subjects.onclick = () => {
                        if(!slide_bar.classList.contains("active")) {
                            slide_bar.classList.remove("inactive")
                            slide_bar.classList.add("active")
                        }
                    }

                    close_subjects.addEventListener("click", () => {
                        slide_bar.classList.remove("active")
                        slide_bar.classList.add("inactive")
                    })
            }
    })
    })



//Appear Page Content
function pageContent(content, length) {
    let quizArea = document.querySelector(".quiz-area")
    let btn = document.querySelector(".result-btn")
    let bullets = document.querySelector(".bullets")
    let btnTimer = document.querySelector(".btn-timer")
    //create question
    const ques = document.createElement("h3")
    ques.textContent = content.title
    ques.className = 'ques'
    quizArea.appendChild(ques);
    // res.appendChild(ques)

    //create answer
    const answers = document.createElement("div")
    answers.className = 'answers';

    for(i = 1; i <= 4; i++) {
        const ans_parent = document.createElement("div")
        ans_parent.className = 'answer';
        
        const circle = document.createElement("span");
        circle.className = "circle"
        ans_parent.appendChild(circle);
        
        const asr = document.createElement("span");
        asr.className = "answer-value"
        asr.textContent += content[`answer-${i}`]
        ans_parent.appendChild(asr);

        if(asr.textContent === "undefined") {
            asr.parentElement.style.display = 'none';
        }

        //important input
        asr.setAttribute("answer-value", content["rt-answer"]);
        answers.appendChild(ans_parent);
        
        //check the answer value
        ans_parent.addEventListener("click", () => {
            [...answers.children].forEach(e => e.classList.remove("selected"));
            ans_parent.classList.add("selected");
            
            if(ans_parent.classList.contains("selected")) {
                if(ans_parent.children[1].getAttribute("answer-value") === ans_parent.children[1].textContent) {
                    true_answer++;
                }
            }
        });
        
    }
    quizArea.appendChild(answers);
    // res.appendChild(resAnswers);


        if(quizArea.innerHTML !== '') {
            btn.classList.add("show")
        }

        //put number of bullets = number of questions;    
        document.querySelector(".category .ques-number > span").textContent = length
        for(i = 0; i < length; i++) {
            let bullet = document.createElement("span");
            bullet.className = "bullet";
            bullets.appendChild(bullet)
        }
        bullets.children[0].classList.add("active");
        
        //Put the ques time;
        const ques_time = 30

        let timer = document.createElement("span");
        timer.className = 'timer';

        timer.innerHTML = `
        <span class="mt"></span>
        :
        <span class="sc"></span>
        `;
        
        btnTimer.appendChild(timer)
        if(timer.previousElementSibling) {
            timer.previousElementSibling.style.display = 'none';
        }

        //Minutes
        timer.firstElementChild.textContent = `0${Math.trunc(ques_time / 60)}`
        
        //Seconds
        timer.lastElementChild.textContent = ques_time % 60;

        //countDown sc
        function countDown ()  {
            if(s < 10) {
                return timer.lastElementChild.textContent = `0${s--}`
            } else {
                return timer.lastElementChild.textContent = s--
            }
        }
        
        //counter down of the minutes
        let m = parseInt(timer.firstElementChild.textContent)
        
        //counter down of the seconds
        let s = parseInt(timer.lastElementChild.textContent)
        countDown()
        
        let scDwn = setInterval(() => {
            if(timer.lastElementChild.textContent === "00" && timer.firstElementChild.textContent === "00") {
                clearInterval(scDwn);

                //click to bring the next ques
                btn.click();
                
            } else if(timer.lastElementChild.textContent === "00") {
                // update the number of minutes
                if(timer.firstElementChild.textContent !== "00") {
                    timer.firstElementChild.textContent = `0${--m}`;
                }
                
                timer.lastElementChild.textContent = "59";
                
                //update the number of seconds
                s = parseInt(timer.lastElementChild.textContent);
                
                //the same state to repeat the action
                countDown();
            } else {
                countDown();
            }
        }, 1000);

        //click on btn to restart the counter down;
        btn.onclick = () => {
            clearInterval(scDwn)
        }    
}

//result show
function createResultShow(h, a, result_show) {
        let box = document.createElement("div")
        box.className = 'box';
        
        let cloned_header = h.cloneNode(true)
        let cloned_answers = a.cloneNode(true);

        for(i = 0; i <= currentIndex; i++) {
            box.appendChild(cloned_header)
            box.appendChild(cloned_answers)
        }
        result_show.appendChild(box)
        
        /*
        must put this condition in this shape:-
        as if i = 0 and i < 0 ==> this condition isn't true so the first element isn't included in the result show,
        so it must be to i <= 0(currentIndex) to include the first ele to resultShow 
        */
}
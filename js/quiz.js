//Elements
let container = document.querySelector(".container")
let lis = document.querySelectorAll("ul  li");
let slide_bar = document.querySelector(".slide-bar");
let close_subjects = document.querySelector(".close-subjects")

//Global Vars Is Very Important To use in many projects as => dependant vars
let currentIndex = 0;
let trueAnswer = 0;
let set_interval;

//    const appear_subjects = document.createElement("span")
//     appear_subjects.className = "appear-subjects"
//     appear_subjects.clas
//     const appear_icon = document.createElement("i")
//     appear_icon.className = 'fa-solid fa-bars';
//     appear_subjects.appen
//     appear_subjects.onclick = () => {
//         appear_subjects.classList.add("active")
//         if(!slide_bar.classList.contains("active")) {
//             slide_bar.classList.remove("inactive")
//             slide_bar.classList.add("active")
//                 }
//          
//             category.appendChil
//                 close_subjects.addEventListener("click", () => {
//                     slide_bar.classList.remove("active")
//                     slide_bar.classList.add("inactive")
//                 })
//             }
//                     }
// */

//Appear Page Content

lis.forEach(li =>{
    li.addEventListener("click", () => {
        quesLink(`https://raw.githubusercontent.com/drmostafa710/${li.textContent}/main/${li.textContent}.json`)
        // quesLink(`../json files/${li.textContent}.json`)
        lis.forEach(e => e.classList.remove("active"));
        li.classList.add("active")
        
        if(li.classList.contains("active")) {
            currentIndex = 0;
            trueAnswer = 0;
            container.innerHTML = '';

            //You Must Must Must Clear The interval to prevent any masking the previous and the next quizAreas
            clearInterval(set_interval)
            
            const quizApp = document.createElement("div")
            quizApp.className = `quiz-app ${li.textContent}`
            
            let button = document.createElement("button")
            button.textContent = "Submit Ques"
            container.appendChild(button)
            
            container.appendChild(quizApp)
            setTimeout(() => {
                quizApp.classList.add("active")
                if(quizApp.classList.contains("active")) {
                    button.className = 'result-btn show'

                    setTimeout(() => {
                        if(button.className = 'result-btn show') {
                            button.classList.add("amazing")
                        }
                    }, 10)
                }
            }, 0)
        }
    })
})
let duration = 45;
//fetch the ques
function quesLink(link) {
let request = new XMLHttpRequest();
request.onload = function() {
    let obj = JSON.parse(this.responseText)
    let objLength = Object.keys(JSON.parse(this.responseText)).length

        if(this.status === 200 && this.readyState === 4) {
            
            pageContent(obj[currentIndex], objLength);

            let result_show = document.createElement("div")
            result_show.className = 'result-show'
            container.appendChild(result_show);
            
            const quizApp = document.querySelector(".quiz-app");
            let btn = document.querySelector(".show");
            
            [...quizApp.children].forEach(e =>{
                e.classList.add("prev-scale")

                setTimeout(() => {
                    e.classList.remove("prev-scale")
                    e.classList.add("next-scale")
                },100)
            })
                
            mainCountDown(duration);
            
            btn.addEventListener("click", () => {
                //Must Clear The Interval as used in li.onclick
                
                clearInterval(set_interval);
                
                if(currentIndex < (objLength - 1)) {
                    if(btn.classList.contains("show")) {
                        //put active class to each bullet 
                        
                        const h = document.querySelector(".quiz-area .ques")
                        const answers = document.querySelector(".answers")
                        let quizFooter = document.querySelector(".quiz-footer");
                        //please return this again
                        //store result to another box and show it laterally
                        // next ques of the current ques 
                        //call the fn again to get another ques in the specific condition
                        [...quizApp.children].forEach(e => {
                            e.classList.add("prev-scale")
                            setTimeout(() => {
                                e.remove();
                            }, 500)
                        })
                        createResultShow(h, answers, result_show);
                        currentIndex++
                        setTimeout(() => {
                            pageContent(obj[currentIndex], objLength);
                            mainCountDown(duration, quizFooter);
                            [...quizApp.children].forEach(e => {
                                e.classList.add("prev-scale")
                                setTimeout(() => {
                                e.classList.remove("prev-scale")
                                e.classList.add("next-scale")

                                const bullets = document.querySelector(".bullets");
                                for(i = 1; i <= currentIndex; i++) {
                                    bullets.children[i].classList.add("active")
                                }
                                }, 550)
                            })   
                        }, 500)
                        
                        if(currentIndex === (objLength - 1)){
                            btn.textContent = 'Show Result';
                            btn.addEventListener("click", () => {
                                if(btn.textContent === 'Show Result') {
                                    let quizArea = document.querySelector(".quiz-area");
                                    let quizFooter = document.querySelector(".quiz-footer");
                                    let bullets = document.querySelector(".bullets");
                                    let timer = document.querySelector(".timerDiv");

                                    //Must Access Them here to Clone the Last Ques
                                    const h = document.querySelector(".quiz-area .ques")
                                    const answers = document.querySelector(".answers");
                                    
                                    btn.style.display = 'none'
                                    quizFooter.remove();
                                    bullets.remove();                                        
                                    timer.remove();
                                    createResultShow(h, answers, result_show);                                    

                                    //please return this again
                                    //store result to another box and show it laterally
                                    showResult(
                                        quizArea,
                                        result_show,
                                        bullets,
                                        request,
                                        objLength
                                        ) 
                                }
                                })
                            };
                        } 
                } 
            });
        }
};

request.open("GET", link, true)
request.send();
}

function pageContent(content, length) {
    let quizApp = document.querySelector('.quiz-app')
    
    let category = document.createElement("div")
    category.className = 'category'

    let subjectName = document.createElement("div")
    subjectName.className = 'sub-name';
    subjectName.textContent = "Subject"

    let subNameChild = document.createElement("span")
    subNameChild.className = 'subject-name'
    lis.forEach(li => {
        if(li.classList.contains("active")) {
            subNameChild.textContent = li.textContent
        }
    })
    
    subjectName.appendChild(subNameChild)
    category.appendChild(subjectName)
    
    let quesNumbers = document.createElement("div")
    quesNumbers.innerHTML = `Questions Number <span class='number'>${length}</span>`
    category.appendChild(quesNumbers)
    
    quizApp.appendChild(category);
    
    let quizArea = document.createElement("div")
    quizArea.className = 'quiz-area'

    let quesTitle = document.createElement("h3")
    quesTitle.className = 'ques'
    quesTitle.textContent = content.title
    quizArea.appendChild(quesTitle)

    const answers = document.createElement("div")
    answers.className = 'answers';

    for(i = 1; i <= 4; i++) {
        const answer = document.createElement("div")
        answer.className = 'answer'
        
        let circle = document.createElement("span")
        circle.className = 'circle'
        
        let answerVal = document.createElement("div")
        answerVal.className = 'answer-value';
        answerVal.textContent += `${content[`answer-${i}`].trim()}`;
        answerVal.setAttribute("rt-answer", content[`rt-answer`].trim())

        answer.appendChild(circle)
        answer.appendChild(answerVal)
        
        answers.appendChild(answer)
        if(answerVal.textContent === "undefined") {
            answerVal.parentElement.style.display = 'none';
        }
        quizArea.appendChild(answers)

        quizApp.appendChild(quizArea)
    };

    [...quizArea.children[1].children].forEach(e => {
        e.onclick = () => {
            [...quizArea.children[1].children].forEach(e => e.classList.remove("selected"))  
            e.classList.add("selected")
        }
    })

    let quizFooter = document.createElement("div")
    quizFooter.className = 'quiz-footer'

    // //put number of bullets = number of questions;    
    const bullets = document.createElement("div")
    bullets.className = 'bullets'

    quizFooter.appendChild(bullets)
    let bulletCount = 1
    for(i = 0; i < length; i++) {
        let bullet = document.createElement("span");
        bullet.className = "bullet";
        bullets.appendChild(bullet)
        bullets.children[0].classList.add("active");
        bullet.textContent = bulletCount++
    }

    
    // //Put the ques time;
    let timerParent = document.createElement("div")
    timerParent.className = 'timerDiv'

    let timer = document.createElement("div")
    timer.className = 'timer'
    timerParent.appendChild(timer)

    quizFooter.appendChild(timerParent)
    quizApp.appendChild(quizFooter);

    
}

function showResult(
    quizArea,
    result_show,
    bullets,
    request,
    objLength
    ) 
    {
        quizArea.innerHTML = ''
        quizArea.classList.add("result");
        bullets.innerHTML = '';

        result_show.style.display = 'block';
        setTimeout(() => {
            document.querySelector(".quiz-app").classList.add("finished")
            result_show.classList.add("showed")
        },3000)
        
        let result = document.createElement("span");
        //access the class to put the formats
        result.className = 'final-result';
        
        //show final result
        quizArea.appendChild(result);
        
        const selectedAnswers = document.querySelectorAll(".box .answer")
        Array.from(selectedAnswers).some(selectedAnswer => {
            let true_false_answer = document.createElement("span")
            if(selectedAnswer.classList.contains('selected')) {
                selectedAnswer.style.opacity = '1';
                selectedAnswer.style.borderBottomColor = '#2196f3';
                if(selectedAnswer.children[1].textContent === selectedAnswer.children[1].getAttribute("rt-answer")) {
                    trueAnswer++;
                    selectedAnswer.classList.add("true")
                    true_false_answer.innerHTML = "&#10004;" 
                } else if(selectedAnswer.children[1].textContent !== selectedAnswer.children[1].getAttribute("rt-answer")) {
                    selectedAnswer.classList.add("false")
                    true_false_answer.innerHTML = "&#10006;"
                }
            } else {
                if(selectedAnswer.children[1].textContent === selectedAnswer.children[1].getAttribute("rt-answer")) {
                    selectedAnswer.style.opacity = '1'
                    selectedAnswer.classList.add("true")
                    true_false_answer.innerHTML = "&#10004;" 
                }
            }
            selectedAnswer.appendChild(true_false_answer) 
            
        })
        //Evaluate the answers:-
        let evaluation_result = document.createElement("span")
        evaluation_result.className = "evaluation-result";
        
        if(trueAnswer < objLength / 2) {
            evaluation_result.innerHTML = '<span>Bad</span> Result'
            evaluation_result.children[0].classList.add("bad");
        } else if(trueAnswer >= objLength / 2 && trueAnswer < objLength) {
            evaluation_result.innerHTML = '<span>Good</span> Result'
            evaluation_result.children[0].classList.add("good");
        } else {
            evaluation_result.innerHTML = '<span>Perfect</span> Result'
            evaluation_result.children[0].classList.add("perfect");
        }
        
        result.textContent = `${trueAnswer}/${Object.keys(JSON.parse(request.responseText)).length}`
        quizArea.appendChild(evaluation_result)

        
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

function mainCountDown(duration) {
    let mt = Math.trunc(duration / 60)
    let sc = Math.trunc(duration % 60)
    const resBtn = document.querySelector(".show")

    // let timerParent = document.querySelector(".timerDiv")
    
    let timer = document.querySelector(".timer")

    let minutes = document.createElement("span") 
    minutes.className = 'mints'
    
    timer.appendChild(minutes)
    
    let colon = document.createTextNode(":");
    timer.appendChild(colon)
    
    let seconds = document.createElement("span") 
    seconds.className = 'scs'
    
    timer.appendChild(seconds)
    
    dwn(sc, seconds, mt, minutes)
    set_interval = setInterval(() => {
        if(sc > 0) {
            sc--;
            dwn(sc, seconds, mt, minutes)
        } else if(sc === 0 && mt !== 0) {
            sc = 59
            mt--;
            dwn(sc, seconds, mt, minutes)
        } else if(sc === 0 && mt === 0) {
            clearInterval(set_interval);
            resBtn.click();
        } 
    }, 1000)
    
    // seconds.textContent = sc ? sc >= 10 : `0${sc} ? i don't Know why this is not valid`
}

function dwn(sc, seconds, mt, minutes) {
    if(sc >= 10) {
        seconds.textContent = sc
    } else {
        seconds.textContent = `0${sc}`
    }

    if(mt >= 10) {
        minutes.textContent = mt
    } else {
        minutes.textContent = `0${mt}`
    }
};

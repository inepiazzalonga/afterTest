const divTest = document.getElementById("divTest")
let respuestasCorrectas = []

function showQuestions() {
    preguntas.forEach((pregunta) => {
        divTest.innerHTML += `
        <div>
            <h3>Pregunta ${pregunta.number} de ${preguntas.length}</h3>
            <h3>${pregunta.text}</h3>
            <button class="btnOption" id="${pregunta.number}">${pregunta.options[0]}</button>
            <button class="btnOption" id="${pregunta.number}">${pregunta.options[1]}</button>
            <button class="btnOption" id="${pregunta.number}">${pregunta.options[2]}</button>
            <button class="btnOption" id="${pregunta.number}">${pregunta.options[3]}</button>
        </div>
        `
        let btnOptions = document.getElementsByClassName("btnOption")
       
        for (btn of btnOptions) {
            btn.onclick = (e) => {
                let option = e.target
                let answer = option.innerText
                
                let questionId = option.getAttribute("id")
               
                let currQuestion = preguntas.find(pregunta => pregunta.number === parseInt(questionId))
                
                answer === currQuestion.answer ? (respuestasCorrectas.push(answer) && Toastify({
                    text: "Correcta",
                    duration: 2000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#2A9D8F",
                    }
                }).showToast()) : Toastify({
                    text: "Incorrecta",
                    duration: 2000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#E76F51",
                    }
                }).showToast();
                console.log(respuestasCorrectas)

                scroll()
            }
        }
    })
}

showQuestions()

function scroll() {
    divTest.style.scrollSnapType = "y mandatory",
    divTest.style.scrollSnapAlign = "start"
    divTest.scrollBy(0, 500)
}



//MOSTRAR RESULTADO
const verResultado = document.getElementById("resultado")

verResultado.onclick = () => {
    let level 
    if (respuestasCorrectas.length < 20) {
        level = "Elementary"
    } else if (respuestasCorrectas.length > 20 && respuestasCorrectas.length <= 29) {
        level = "Begginer"
    } else if (respuestasCorrectas.length >= 30 && respuestasCorrectas.length <= 39) {
        level = "Intermediate"
    } else {
        level = "Advanced"
    }


    Swal.fire(
        'Tuviste ' + respuestasCorrectas.length + " respuestas correctas.",
        'Tu nivel es ' + level,
        'success'
    )


}

// PASAR PREGUNTA

const counterTest = document.getElementById("counter")

function counter() {
    let counter = 10;
    const i = setInterval(() => {
        counterTest.innerText = (counter)
        // console.log(counter);
        counter--;
        if (counter === -1) {
            clearInterval(i);
            counterTest.innerText = (counter)
            Swal.fire({
                title: 'Se agoto el tiempo',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Volver a comenzar',
                denyButtonText: `Salir`,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                } else if (result.isDenied) {
                    window.location.href = "index.html"
                }
            })
            counterTest.innerText = (0)
        }
    }, 1000);
}

counter()



//LOGOUT
const salir = document.getElementById("logout")

salir.onclick=()=>{
    window.location.href = "index.html"
}
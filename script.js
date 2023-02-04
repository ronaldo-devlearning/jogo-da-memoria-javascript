const cards = document.querySelectorAll('.card')
let hasFlippedCard = false
let firstCard, secondCard
let lockBoard = false

function flipCard() {
    if(lockBoard) {
        return
    }

    //fazer apenas quando chegar em duplo clique
    if(this === firstCard) {
        return
    }
    this.classList.add('flip')
    if(!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this //adicionar atributo data no html para o else
        return
    }
    secondCard = this

    checkforMatch() //criar funcao para checar se as cartas sao iguais atraves do atributo data
}



//funcao que checa se o tipo (atributo data) e valor(nome do atributo) sao iguais
function checkforMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards() //criar funcao que desabilita o clique nas cartas
        return
    }

    unflipCards() //criar funcao que desvira as cartas
}


//funcao que retira o listener dos elementos firstcard e secondcard
function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}



//funcao que desvira as cartas selecionadas
function unflipCards() {
    lockBoard = true

    //o settimeout é um metodo js que recebe uma funcao, e um tempo para essa funcao ser ativada, essa funcao é ativada apenas uma vez
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1500)
}

//essa funcao vai ser chamada em disablecards e unflipcards
function resetBoard() { 
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

//Para invocar a função shuffle, vamos transformá-la em uma
//Immediately Invoked Function Expression (IIFE) encapsulando-a em parenteses, e invocando em seguida
// assim ela será executada logo após a sua definição.
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12)
        card.style.order =ramdomPosition
    })
})()

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})
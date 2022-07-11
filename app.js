const bottomNumber = document.querySelectorAll('[data-number]')
const bottomOperator = document.querySelectorAll('[data-operator]')
const bottomEqual = document.querySelector('[data-equal]')
const bottomDeleteAll = document.querySelector('[data-delete-all]')
const bottomDelete = document.querySelector('[data-delete]')
const textSuperiorValue = document.querySelector('[data-superior-value]')
const textInferiorValue = document.querySelector('[data-inferior-value]')


class Calculator {
    constructor(textInferiorValue,textSuperiorValue){
        this.textInferiorValue = textInferiorValue
        this.textSuperiorValue = textSuperiorValue
        this.inferiorValue = ''
        this.superiorValue = ''
        this.operator = undefined
    }

    addNumber(number){
    if(number === '.' && this.inferiorValue.includes('.')) return
    this.inferiorValue = this.inferiorValue + number
    }
    printDisplay() {
        this.textInferiorValue.innerText = this.inferiorValue
        this.textSuperiorValue.innerText = this.superiorValue
    }
    delete (){
        this.inferiorValue = this.inferiorValue.slice(0,-1)
    }
    chooseOperation(operator) {
        if(this.inferiorValue == '') return
        if(this.superiorValue != '') {
            this.compute()
        }
        this.operator = operator
        this.superiorValue = this.inferiorValue
        this.inferiorValue = ''
    }
    compute() {
        let result
        let conversionsuperiorValue = parseFloat(this.superiorValue)
        let conversioninferiorValue = parseFloat (this.inferiorValue)
        if(isNaN(conversionsuperiorValue) || isNaN(conversioninferiorValue)) return
        switch (this.operator) {
            case '+':
            result = conversionsuperiorValue + conversioninferiorValue
            break
            case '-':
            result = conversionsuperiorValue - conversioninferiorValue
            break
            case '*':
            result = conversionsuperiorValue * conversioninferiorValue
            break
            case '÷':
            result = conversionsuperiorValue / conversioninferiorValue
            break
            default: return
        }
        
        this.inferiorValue = result
        this.operator = undefined
        this.superiorValue= ''
    }

    cleanScreen() {
        this.inferiorValue = ''
        this.superiorValue = ''
        this.operator = undefined

    }
}



const calculator = new Calculator (textInferiorValue,textSuperiorValue)



bottomNumber.forEach(bottom => {
    bottom.addEventListener('click', () => {
        calculator.addNumber(bottom.innerText)
        calculator.printDisplay() 
    })
})

bottomDelete.addEventListener('click',() => {
    calculator.delete()
    calculator.printDisplay()
})

bottomOperator.forEach(bottom => {
    bottom.addEventListener('click', () => {
        calculator.chooseOperation(bottom.innerText)
        calculator.printDisplay() 
    })
})
bottomEqual.addEventListener('click',() => {
    calculator.compute()
    calculator.printDisplay()
})

bottomDeleteAll.addEventListener('click',() => {
    calculator.cleanScreen()
    calculator.printDisplay()
})
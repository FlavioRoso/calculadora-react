import React from 'react'
import Display from './Display';
//import Botao from './Botao';
const VALOR_MAXIMO = 14;
class Calculadora extends React.Component{

    constructor(props)
    {
        super(props)

        this.state = {
            
            displayValue: '0',
            operacao: null,
            displayOperacao: null,
            botoesDisplay: [
                '7','8','9','/',
                '4','5','6','x',
                '1','2','3','-',
                '0','.','=','+',
            ],
            botoesEspeciais: [
                'DEL','AC'
            ],
            botoesAction:{
                'DEL': () =>this.apagaDisplay(),
                'AC': () => this.limpaDisplay(),
                '=': () => this.actionOperacao('='),
                '/': () => this.actionOperacao('/'),
                'x': () => this.actionOperacao('*'),
                '-': () => this.actionOperacao('-'),
                '+': () => this.actionOperacao('+'),
            },
            operacoes:{
                '/': (n1,n2) => n1/n2,
                'x': (n1,n2) => n1*n2,
                '-': (n1,n2) => n1-n2,
                '+': (n1,n2) => n1+n2,
            },
            botoesRestricoes:{
                '.': () => {
                    
                    return !this.state.displayValue.includes('.')
                }
            }

        }
    }


    actionOperacao(op)
    {
        if(!this.isDisplayEmpty())
        {
            if(this.isOperacaoEmpty() && op !== '=')
            {
                
                if(parseFloat(this.state.displayValue) !== 0)
                {
               
                    this.setOperacao( this.state.displayValue ,op)
                    this.setDisplayValue('0');
                }
                
            }
            else if(!this.isOperacaoEmpty() && parseFloat(this.state.displayValue) !== 0)
            {
               let resultado = this.executaCalculo({
                   n1: this.state.operacao.value,
                   n2: this.state.displayValue,
                   op: this.state.operacao.op
               })

               if(op === '=')
               {
                   this.limpaDisplay()
                   this.setDisplayValue(resultado)
               }
               else
               {
                this.setOperacao(resultado,op)
                this.setDisplayValue('0')
               }
            }
        }
    }


    setOperacao(value,op)
    {
        
        this.setState({
            operacao: {
                value: value,
                op : op
            },
            displayOperacao: value + " " + op
        });
       
    }

    executaCalculo(param)
    {
        let n1 = parseFloat(param.n1)
        let n2 = parseFloat(param.n2)

        return this.state.operacoes[param.op](n1,n2).toString().slice(0,VALOR_MAXIMO)

    }

    

    setDisplayValue(value)
    {
        this.setState({
            displayValue: value
        });
    }

    isOperacaoEmpty()
    {
        return this.state.operacao === null
    }
    
    isDisplayEmpty()
    {
        return this.state.displayValue === '0' 
    }
    

    apagaDisplay()
    {
        let novodisplayValue = '0';
        if(this.state.displayValue !== '0')
        {        
            if(this.state.displayValue.length > 1)
            {
                novodisplayValue = this.state.displayValue.slice(0,-1);
            }
            

            this.setDisplayValue(novodisplayValue)
        }
    }

    limpaDisplay()
    {
        this.setState({
            displayValue: '0',
            operacao: null,
            displayOperacao: ''
        })
    }

   
    validaValorMaximo()
    {
        return this.state.displayValue.length + 1 < VALOR_MAXIMO
    }

    validaRestricao(value)
    {
        let valido  = false;

        if(this.state.botoesRestricoes[value] === undefined)
        {
            valido = true;
        }
        else{
            valido = this.state.botoesRestricoes[value]()
        }
        return valido
    }

    addToDisplay(value)
    {
        let novoValor
        if(this.validaRestricao(value))
        {
            novoValor = !this.isDisplayEmpty() || value === '.'  ? this.state.displayValue + value : value;
            this.setDisplayValue(novoValor)
        }
        

        
    }

    actionBotao(value){
        
        if(this.state.botoesAction[value] === undefined && this.validaValorMaximo())
        {
            this.addToDisplay(value)
        }
        else if(this.state.botoesAction[value])
        {
            this.state.botoesAction[value]();
        }
    }

    sayHello() {
        alert('Hello!');
      }

     render(){
        return(
            <div className="calculadora">
                <Display operacao={this.state.displayOperacao} value={this.state.displayValue}  />
                <div className="botoes especial">
                    {
                        this.state.botoesEspeciais.map((item) => {

                            return (<button onClick={(() => this.actionBotao(item))} className="btnAction">{item}</button>)

                        })
                    }
                </div>
                <div className="clearfix"></div>
                <div className="botoes">
                    {
                        this.state.botoesDisplay.map((item) => {

                            return (<button onClick={(() => this.actionBotao(item))} className="btnAction">{item}</button>)

                        })
                    }
                    
                </div> 
            </div>
        )
    }


}

export default Calculadora
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
            botoesDisplay: [
                '7','8','9','%',
                '4','5','6','*',
                '1','2','3','-',
                '.','0','=','+',
            ],
            botoesEspeciais: [
                'DEL','AC'
            ],
            botoesAction:{
                '=': () => this.calculaFromDisplay(),
                'DEL': () =>this.apagaDisplay(),
                'AC': () => this.limpaDisplay()
            },
            botoesRestricoes:{
                '.': () =>
            }

        }
    }
    

    apagaDisplay()
    {
        let novoDisplayValue = '0';
        if(this.state.displayValue !== '0')
        {        
            if(this.state.displayValue.length > 1)
            {
                novoDisplayValue = this.state.displayValue.slice(0,-1);
            }
            

            this.setState({
                displayValue: novoDisplayValue
            })
        }
    }

    limpaDisplay()
    {
        this.setState({
            displayValue: '0'
        })
    }

    calculaFromDisplay()
    {
        let operacao = this.state.displayValue;
        console.log(operacao);
        
    }

    validaValorMaximo()
    {
        return this.state.displayValue.length + 1 < VALOR_MAXIMO
    }

    addToDisplay(value)
    {
        let novoValor = this.state.displayValue !== '0' ? this.state.displayValue + value : value;

        this.setState({ 
            displayValue: novoValor
        })
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
                <Display value={this.state.displayValue} />
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
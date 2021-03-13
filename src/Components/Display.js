import React from 'react'


class Display extends React.Component{


     render(){
     return(
         <div className="display">
             <p className="operacao">{this.props.operacao}</p>
             <p className="valor">{this.props.value}</p>
         </div>
     )
    }


}

export default Display
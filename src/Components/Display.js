import React from 'react'


class Display extends React.Component{


     render(){
     return(
         <div className="display">
             <p>{this.props.value}</p>
         </div>
     )
    }


}

export default Display
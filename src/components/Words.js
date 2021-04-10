import React, { Component } from 'react'

export default class Words extends Component {

    // verify = (id) => {
    //     const {characters, inputText, loading } = this.props;
    //     let style = {
    //         backgroundColor : "none",
    //     }
    //     let correct = "green";
    //     let uncorrect = "red";
    //     if(loading === false){
    //         return {};
    //     }
    //     if(inputText.length < id - 1){
    //         return style;
    //     }
    //     if(characters[id] === inputText[id]){
    //         style.backgroundColor = correct;
    //         return style;
    //     }
    //     else if(characters[id] !== inputText[id]){
    //         style.backgroundColor = uncorrect;
    //         return style;
    //     }
    // }
    
    render() {
        const { display, loading} = this.props;
        return (
            <div className="words">
                { loading === false ? 
                display.map((char, id)=>{
                    
                    return char;
                }) 
                : 
                <h3>loading...</h3> } 
            </div>
        )
    }
}

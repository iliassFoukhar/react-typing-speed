import React, { Component } from 'react'

export default class Form extends Component {
    state = {
        text : this.props.text
    }
    changeInput = (e) => {
        const newText = e.target.value;
        this.setState({text:newText}, ()=>{
            this.props.changeText(newText);
        });
    };
    
    render() {
        // const {text} = this.state;
        return (
            <form id="form">
                <div>
                    <input  type="text" 
                            name="typed"
                            className="form-control" 
                            id="input-field" 
                            onChange={this.changeInput}
                           />
                    
                    <button className="btn"
                            type="button">
                                <i className="fa fa-refresh" 
                                   aria-hidden="true"></i>
                    </button>
                    {this.test}
                </div>
            </form>
        )
    }
}

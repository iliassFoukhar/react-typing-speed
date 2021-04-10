import React, { Component } from 'react'

export default class Form extends Component {
   
    changeInput = (e) => {
        const newText = e.target.value;
        this.props.changeText(newText);
        
    };
    
    render() {
        return (
            <form id="form">
                <div>
                    <input  type="text" 
                            name="typed"
                            className="form-control" 
                            id="input-field" 
                            onChange={this.changeInput}
                            value={this.props.text}
                           />
                    
                    <button className="btn"
                            type="button"
                            onClick={this.props.restart.bind(this)}>
                                <i className="fa fa-refresh" 
                                   aria-hidden="true"></i>
                    </button>
                    
                </div>
            </form>
        )
    }
}

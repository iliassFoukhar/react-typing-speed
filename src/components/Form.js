import React, { Component } from 'react'

export default class Form extends Component {
    render() {
        return (
            <form>
                
                <input  type="text" 
                        name="typed"
                        className="form-control" />
                
                <button className="btn"
                        type="button">Restart</button>
            </form>
        )
    }
}

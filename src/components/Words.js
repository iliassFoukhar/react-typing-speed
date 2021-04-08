import React, { Component } from 'react'

export default class Words extends Component {

    
    render() {
        const {words, loading} = this.props;
        return (
            <div className="words">
                { loading === false ? 
                words.map(word=>{ return word + " ";}) 
                : <h3>loading...</h3> } 
            </div>
        )
    }
}

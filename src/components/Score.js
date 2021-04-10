import React, { Component } from 'react'

export default class Score extends Component {
    render() {
        const {wpm,cpm, timer} = this.props;
        return (
            <div className="score-container">
                <h3>{wpm} wpm</h3>
                <h3><i className="fas fa-clock fa-sm"></i> {timer}</h3>
                <h3>{cpm} cpm</h3>
                
            </div>
        )
    }
}

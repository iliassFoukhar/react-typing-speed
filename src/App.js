import './App.css';
import Words from './components/Words.js';
import Form from './components/Form.js'
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    wpm : 0,
    cpm : 0,
    words : ["I", "Am", "Words", "salam"],
    loading : true
  }
  
  async componentDidMount(){
    let words = [];
    const url = "https://api.quotable.io/random";
    for(let i = 0; i < 30; i++){
      const response = await fetch(url);
      const data = await response.json();
      data.content.split(" ").map(word=> { words.push(word); return word});

      //words.push(data.content.split(" ").map(word => {return word}));
    }

    this.setState({words: [...words], loading : false}, ()=>{
      console.log([...words]);
    });
  }
  render() {
    const { words, loading } = this.state;
    return (
      <div className="App">
        <Words words={words} loading={loading}/>
        <Form />
      </div>

    )
  }
}


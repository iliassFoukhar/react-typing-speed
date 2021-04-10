import './App.css';
import Words from './components/Words.js';
import Form from './components/Form.js';
import Score from './components/Score.js';
import Header from './components/Header.js';
import React, { Component } from 'react'

export default class App extends Component {
  state = {
    wpm : 0,
    cpm : 0,
    words : [],
    characters: [],
    loading : true,
    playing : false,
    timer : 60,
    inputText: '',
    display: []
  }
  initialState = {
    wpm : 0,
    cpm : 0,
    words : [],
    characters: [],
    loading : true,
    playing : false,
    timer : 60,
    inputText: '',
    display: []
  }
  onRestart = () => {
    this.setState(this.initialState);
  };

  async fetchWords(){
    let words = [...this.state.words];
    let characters = [...this.state.characters];
    const url = "https://api.quotable.io/random";
    const response = await fetch(url);
    const data = await response.json();
    data.content.split(" ").map( word => { 
      words.push(word); 
      return word
    });
    data.content.split("").map(char => {
      characters.push(char);
      return char;
    });
    this.setState({
      words: [...words], 
      characters: [...characters],
      loading : false
    });
    
  };
  async componentDidMount(){
    await this.fetchWords();
    const {characters} = this.state;
    let display = [];
    characters.map((char, key)=>{
      display.push(<span id={key}>{char}</span>);
      return char;
    });
    this.setState({
      display:display
    });
    
  }

  startTimer = () =>{
    const { timer } = this.state;
    if(timer > 0)
    {  
      this.setState({
        timer: timer - 1
      });
    }
    else if(timer <= 0){
      this.setState({
        timer : 0,
        playing: false
      });
      clearInterval(this.interv);
    }
  };

  interv = null;

  changeText = (newText) => {
    // To start the timer
    const { playing,timer } = this.state;
    let cpm = 0;
    if(playing === false && timer > 0){
      this.setState({
        playing:true
      },()=>{
        this.interv = setInterval(this.startTimer, 1000);
      });
    }
    // To change the colors of correct characters
    this.setState({inputText: newText}, ()=>{
      const {inputText, characters} = this.state;
      let display = [];
      let correctStyle = {
        color : "lightgreen",
      }
      let incorrectStyle = {
        color : "#e50d64",
      }
      let normalStyle = {
        white : "none",
      }
      
      characters.map((char, key)=>{
        let style = normalStyle;
        if(inputText.length <= key){
          style = normalStyle;
        }
        else if(characters[key] === inputText[key]){
          style = correctStyle;
          cpm++;
        }
        else if(characters[key] !== inputText[key]){
          style = incorrectStyle;
         
        }
        display.push(<span key={key} style={style}>{char}</span>);
        return char;
      });
      
      // Managing every other component
      this.setState({
        display: [...display],
        cpm : cpm,
        wpm: parseInt(cpm/5),
      });
    });
    
  }

  render() {
    const { words, loading, characters , cpm, wpm, timer, inputText, display } = this.state;
    return (
      <div className="App">
        <Header />
        <Words  characters={characters} 
                words={words} 
                loading={loading} 
                inputText={inputText}
                display={display}
                />
        <Form   changeText={this.changeText.bind(this)} />
        <Score  wpm={wpm} 
                cpm={cpm} 
                timer={timer} />
      </div>

    )
  }
}


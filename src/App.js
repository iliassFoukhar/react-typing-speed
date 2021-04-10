import './App.css';
import Words from './components/Words.js';
import Form from './components/Form.js';
import Score from './components/Score.js';
import Header from './components/Header.js';
import React, { Component } from 'react'

export default class App extends Component {
  // state = {
  //   wpm : 0,
  //   cpm : 0,
  //   curr : 0,
  //   words : [],
  //   characters: [],
  //   loading : true,
  //   playing : false,
  //   timer : 60,
  //   inputText: '',
  //   quote: '',
  //   display: []
  // }
  initialState = {
    wpm : 0,
    cpm : 0,
    curr : 0,
    words : [],
    characters: [],
    loading : true,
    playing : false,
    timer : 60,
    inputText: '',
    quote: '',
    display: []
  }
  state = this.initialState
  onRestart = () => {
    this.setState(this.initialState, ()=>{
      this.fetchWords();
    });
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
    
    let display = [];
    characters.map((char, key)=>{
      display.push(<span id={key}>{char}</span>);
      return char;
    });
    this.setState({
      display:display,
      quote: data.content,
      inputText: '',
      curr :  this.state.cpm// + this.state.curr
    });
    
  };
  async componentDidMount(){
    await this.fetchWords();
    
    
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
      }, () =>{
        clearInterval(this.interv);
      });
      
    }
  };

  interv = null;

  changeText = (newText) => {
    // To start the timer
    const { playing,timer, inputText,quote } = this.state;
    let cpm = 0;
    if(playing === false && timer > 0){
      this.setState({
        playing:true,
        inputText:newText
      },()=>{
        this.interv = setInterval(this.startTimer, 1000);
      });
    }
    //To disable backspace
    if(inputText.length > newText.length - 1){
      newText = inputText;
    }
    
    
    // To change the colors of correct characters
    if(playing === true)
    {
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
          cpm : this.state.curr + cpm,
          wpm: parseInt( (cpm + this.state.curr) / 5),
          
        });
      });
     
      // Fetch another quote if finished the current one
      if(quote.length === newText.length){
        this.setState({
          words : [],
          characters : [],
          quote : [],
          curr : this.state.cpm
          
        }, ()=>{
          this.fetchWords();  
        })
        
      }
    }
    
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
        <Form   changeText={this.changeText.bind(this)} 
                text={inputText} 
                restart={this.onRestart} 
                />
        <Score  wpm={wpm} 
                cpm={cpm} 
                timer={timer} 
                />
      </div>

    )
  }
}


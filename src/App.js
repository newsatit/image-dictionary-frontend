import React, {Component} from 'react';
import './App.css';
import Result from './Result/Result'
import Input from './Input/Input'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: "",
      definitions: [],
      suggestions: [],
      images: [],
      showResult: false,
      isLoadingDef: false,
      isLoadingImg: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      searchInput: event.target.value
    })
  }

  handleSubmit(event) {   
    const apiKey = 'AIzaSyASaXpNoYuHyKdG2tzEeJGyiOi1phs_B2s'
    const engineId = '006440095621558188841:oyunba398sc'

    const word = this.state.searchInput.trim();
    const defBase = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json'
    const defUrl = defBase + '/' + word + '?key=8ff43ecf-f2dc-453e-8de3-c8a1b17c02b3'
    const imgBase = 'https://www.googleapis.com/customsearch/v1'
    const imgUrl = imgBase + '?' 
      + 'q=' + word + '&'
      + 'key=' + apiKey + '&'
      + 'cx=' + engineId + '&'
      + 'searchType=image&'
      + 'imgSize=medium' 
    this.setState({
      isLoadingDef: true,
      isLoadingImg: true,
      showResult: true
    }, () => {
      fetch(defUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let newDefinitions, newSuggestions
          try {
            newDefinitions = data.map((def) => ({
              word: def.meta.id,
              shortdef: def.shortdef,
              fl: def.fl
            }))
            newSuggestions = []
          } catch (error) {
            console.log(error)
            newDefinitions = []
            newSuggestions = data
          } finally {
            this.setState({
              definitions: newDefinitions,
              suggestions: newSuggestions,
              isLoadingDef: false
            })
          }
        })
        .catch((error)=> console.log(error)) 
      
      fetch(imgUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let newImages
          try {
            newImages = data.items.map((image) => image.image.thumbnailLink)
          } catch (error) {
            console.log(error)
            newImages = []
          } finally {
            this.setState({
              images: newImages,
              isLoadingImg: false
            })
          }
        })
        .catch((error)=> console.log(error)) 
    })
    
    event.preventDefault()  
  }

  render() {
    const {definitions, suggestions, images, isLoadingDef, isLoadingImg, showResult} = this.state

    return (
      <div className="container  my-sm-5">
          <Input searchInput={this.state.searchInput} onChange={this.handleInputChange} onSubmit={this.handleSubmit}/>
          { showResult ? <Result definitions={definitions} suggestions={suggestions} images={images} isLoadingDef={isLoadingDef} isLoadingImg={isLoadingImg}/> : <div></div> }
      </div>
    );    
  }
}

export default App;

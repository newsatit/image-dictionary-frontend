import React, {Component} from 'react';

import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

import Result from './Result/Result'
import Input from './Input/Input'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: "",
      definitions: [],
      suggestions: [],
      images: [],
      showResult: false,
      isLoadingDef: false,
      isLoadingImg: false,
      searchQuery: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.fetchDefinitions()
  }

  fetchDefinitions = () => {
    const query = new URLSearchParams(this.props.location.search)
    const word = query.get('q')
    if (word) {
      const apiKey = 'AIzaSyASaXpNoYuHyKdG2tzEeJGyiOi1phs_B2s'
      const engineId = '006440095621558188841:oyunba398sc'
  
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
        showResult: true,
        searchInput: word
      }, () => {
        axios.get(defUrl)
          .then((res) => {
            let newDefinitions, newSuggestions
            try {
              newDefinitions = res.data.map((def) => ({
                word: def.meta.id,
                shortdef: def.shortdef,
                fl: def.fl
              }))
              newSuggestions = []
            } catch (error) {
              console.log(error)
              newDefinitions = []
              newSuggestions = res.data
            } finally {
              this.setState({
                definitions: newDefinitions,
                suggestions: newSuggestions,
                isLoadingDef: false
              })
            }
          })
          .catch((error) => console.log(error)) 
        
        axios.get(imgUrl)
          .then((res) => {
            let newImages
            try {
              newImages = res.data.items.map((image) => image.image.thumbnailLink)
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
          .catch((error) => console.log(error)) 

          axios.post('/api/histories/', {
            query: word
          })
          .catch((error) => console.log(error))
      })
    }
  }

  handleInputChange(event) {
    this.setState({
      searchInput: event.target.value
    })
  }

  handleSubmit(event) {      
    const word = this.state.searchInput.trim()  
    this.setState({
      searchQuery: word
    })
    const url = '/search?q=' + word
    this.props.history.push(url)
    event.preventDefault() 
  }

  render() {
    const {definitions, suggestions, images, isLoadingDef, isLoadingImg, showResult, searchQuery} = this.state
    console.log('render!')
    console.log(this.props.location.search)
    console.log(this.props.history)
    // if (searchQuery) {
    //   const url = '/search?q=' + searchQuery
    //   console.log('redirecting...')
    //   return <Redirect to={url} />
    // }

    return (
      <div className="container  my-sm-5">
          <Input searchInput={this.state.searchInput} onChange={this.handleInputChange} onSubmit={this.handleSubmit}/>
          { showResult ? <Result definitions={definitions} suggestions={suggestions} images={images} isLoadingDef={isLoadingDef} isLoadingImg={isLoadingImg}/> : <div></div> }
      </div>
    );    
  }
}

export default Home;

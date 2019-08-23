import React, {Component} from 'react'
import WordCard from './WordCard'
import ImgCard from './ImageCard'

class Result extends Component {
    render() {
        const { definitions, images, isLoadingDef, isLoadingImg } = this.props

        const imgUrls = [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQcqTNwA9nam8XpWhfNzPrB5QJ95UQfyIU3Rumb-bECF6aHaO-iN5EIw",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9_CcegB2-N52ksSqHHpT7nbU_tb-mPiucAfgVwXKbBN3JAveW1Qg0wPI",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFyqcax-cO4SRb_tG9TctLRiY4Vh3d783eZcyQ80ncdSEquo6bZ1EwA"
        ]
        console.log('isLoadingDef: ', isLoadingDef)

        const wordCards = isLoadingDef ? (
            <div className="text-center">
                <div className="text-primary" role="status">
                    <span>Loading Definition</span>
                </div>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>  
        ) : definitions.length === 0 ? (
            <div className="alert alert-warning" role="alert">
                <strong>Sorry!</strong> No definition found.
            </div>
            ) : (
            <div>
            {
                definitions.map((def, index) => <WordCard key={index} word={def.word} shortdef={def.shortdef} fl={def.fl}/>)
            }                
            </div>
            ) 

        const imgCards = isLoadingImg ? (
            <div className="text-center">
                <div className="text-primary" role="status">
                    <span>Loading Image</span>
                </div>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>  
        ) : imgUrls.length === 0 ? (
            <div className="alert alert-warning" role="alert">
                <strong>Sorry!</strong> No images found.
            </div>
            ) : (
            <div>
            {
                images.map((url, index) => <ImgCard key={index} url={url}/>)
            }                
            </div>
            ) 
  
        return (
            <div className="row">
                <div className="col" style={{width: "30rem"}}>
                    {wordCards}
                </div>    
                <div className="col">
                    {imgCards}
                </div>            
            </div>

        )
    }
}

export default Result

import React from 'react'

const ImageCard = ({url}) => (
    <img key={url} src={url} className="img-thumbnail mx-sm-2" alt={url}/> 
)
export default ImageCard

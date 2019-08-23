import React from 'react'

const WordCard = ({word, shortdef, fl}) => (
    <div key={word} className="card">
        <div className="card-body">
            <h5 className="card-title">{word}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{fl}</h6>
            <div className="card-text">
                <ol>
                    {shortdef.map((def, index) => <li key={index}>{def}</li>)}
                </ol>
            </div>
        </div>
    </div>
)

export default WordCard

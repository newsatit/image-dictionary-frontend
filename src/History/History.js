import React, {Component} from 'react';
import axios from 'axios';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            histories: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.fetchHistories()
    }

    fetchHistories = () => {
        this.setState({
            isLoading: true
        }, () => {
            axios.get('/api/histories/').then((res) => {
                this.setState({
                    histories: res.data,
                    isLoading: false
                })
            })
            .catch((error) => console.log(error))
        })
    }

    render() {
        const { isLoading, histories } = this.state
        return (
             isLoading ? 
                <div className="text-center">
                    <div className="text-primary" role="status">
                        <span>Loading Histories</span>
                    </div>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> :
                <ul>
                    { histories.map((history, index) => <li key={index}>{history.query}</li>) }
                </ul>

        );
    }
}

export default History;
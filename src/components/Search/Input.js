import React, {Component} from 'react';

class Input extends Component {
    render() {
        const { onChange, onSubmit, searchInput } = this.props;
        return (
                <form className="form-inline justify-content-center" onSubmit={onSubmit}>
                    <div className="form-group mx-sm-3 mb-2">
                        <input type="text" id="searchInput" className="form-control" onChange={onChange} value={searchInput} required/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Search</button>
                </form>
        );
    }
}

export default Input;

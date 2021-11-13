import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../styles.css';

export default class Searchbar extends Component {
    state = {
        query: '',
    };

    handleChange = e => {
        this.setState({ query: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    };

    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={this.state.query}
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        );
    }
    static propTypes = {
        handleSubmit: PropTypes.func,
    };
}

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleModalEscape);
    }

    // componentWillUnmount() {
    //     window.removeEventListener('keydown', this.handleModalEscape);
    // }

    handleModalEscape = e => {
        this.props.modalClose(e);
    };

    render() {
        return createPortal(
            <div className="Overlay" onClick={this.props.handleBackdropClick}>
                <div className="Modal">{this.props.children}</div>
            </div>,
            modalRoot,
        );
    }

    static propTypes = {
        handleBackdropClick: PropTypes.func.isRequired,
        children: PropTypes.node,
    };
}

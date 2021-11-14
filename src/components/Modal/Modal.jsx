import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, modalImage }) {
    useEffect(() => {
        window.addEventListener('keydown', handleModalEscape);
        return () => {
            window.removeEventListener('keydown', handleModalEscape);
        };
    });

    const handleModalEscape = e => {
        if (e.keyCode === 27) onClose();
    };

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div className="Overlay" onClick={handleBackdropClick}>
            <div className="Modal">
                <img src={modalImage} alt="" />
            </div>
        </div>,
        modalRoot,
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    modalImage: PropTypes.string.isRequired,
};

// export default class Modal extends Component {
//     componentDidMount() {
//         window.addEventListener('keydown', this.handleModalEscape);
//     }

//     handleModalEscape = e => {
//         this.props.modalClose(e);
//     };

//     render() {
//         return createPortal(
//             <div className="Overlay" onClick={this.props.handleBackdropClick}>
//                 <div className="Modal">{this.props.children}</div>
//             </div>,
//             modalRoot,
//         );
//     }

//     static propTypes = {
//         handleBackdropClick: PropTypes.func.isRequired,
//         children: PropTypes.node,
//     };
// }

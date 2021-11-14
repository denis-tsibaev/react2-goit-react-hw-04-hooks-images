import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ handleBackdropClick, modalImage }) {
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
    handleBackdropClick: PropTypes.func.isRequired,
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

import '../../styles.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, largeImage, onImageClick }) => (
    <img
        src={src}
        alt={alt}
        width="300"
        height="300"
        onClick={() => onImageClick(largeImage)}
        className="ImageGalleryItem-image"
    />
);

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

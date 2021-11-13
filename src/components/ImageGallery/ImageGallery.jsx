import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import '../../styles.css';

const ImageGallery = ({ hits, onImageClick }) => (
    <ul className="ImageGallery">
        {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
            <li className="ImageGalleryItem" key={id}>
                <ImageGalleryItem
                    src={webformatURL}
                    alt={tags}
                    largeImage={largeImageURL}
                    onImageClick={onImageClick}
                />
            </li>
        ))}
    </ul>
);

ImageGallery.propTypes = {
    hits: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        }).isRequired,
    ),
    onImageClick: PropTypes.func,
};

export default ImageGallery;

import React, { Component } from 'react';
import imageApi from './components/Api';
import Button from './components/Button';
import Container from './components/Container';
import { mapper } from './components/helpers/mapper';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import Spinner from './components/Spinner';

export default class App extends Component {
    state = {
        query: '',
        hits: [],
        currentPage: 1,
        modal: false,
        modalImage: '',
        isLoading: false,
        error: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const { currentPage, query } = this.state;

        if (prevState.query !== query) {
            this.fetchImg();
        }
        if (prevState.currentPage !== currentPage) {
            this.fetchImg(currentPage);
        }
    }

    handleInputChange = data => {
        this.setState({ query: data.trim(), currentPage: 1, hits: [] });
    };

    fetchImg = () => {
        const { query, currentPage } = this.state;
        const option = { query, currentPage };
        if (!query) return;

        this.setState({ isLoading: true });

        imageApi(option)
            .then(result => {
                this.setState(prevState => ({
                    hits: [...prevState.hits, ...mapper(result)],
                }));

                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                });
            })
            .catch(error => this.setState({ error }))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    };

    loadMore = () => {
        let { currentPage } = this.state;
        currentPage += 1;
        this.setState({ currentPage });
    };

    handleModalOpen = largeImage => {
        this.setState({ modal: true, modalImage: largeImage });
    };

    handleModalEscape = e => {
        if (e.keyCode === 27) this.resetModal();
    };

    handleBackdropClick = e => {
        if (e.target === e.currentTarget) this.resetModal();
    };

    resetModal = () => {
        this.setState({ modal: false, modalImage: '' });
        window.removeEventListener('keydown', this.handleModalEscape);
    };

    render() {
        const { hits, query, modal, modalImage, isLoading } = this.state;
        const {
            handleInputChange,
            handleModalOpen,
            handleModalEscape,
            handleBackdropClick,
            loadMore,
        } = this;

        return (
            <Container>
                <Searchbar onSubmit={handleInputChange} />
                {query && (
                    <ImageGallery hits={hits} onImageClick={handleModalOpen} />
                )}

                {isLoading && <Spinner />}

                {hits.length > 0 && (
                    <Button onLoadClick={loadMore} text="Load more" />
                )}

                {modal && (
                    <Modal
                        modalClose={handleModalEscape}
                        handleBackdropClick={handleBackdropClick}
                    >
                        <img src={modalImage} alt="" />
                    </Modal>
                )}
            </Container>
        );
    }
}

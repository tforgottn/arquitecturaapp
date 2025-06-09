function BookDetail({ bookId, onBack, onRefresh, onLoginRequired }) {
    try {
        const book = BookData.books.find(b => b.id === parseInt(bookId));
        const similarBooks = BookData.getSimilarBooks(parseInt(bookId));
        const { user } = useAuth();
        const [isInWishlist, setIsInWishlist] = React.useState(false);

        React.useEffect(() => {
            const wishlist = StorageUtils.getWishlist();
            setIsInWishlist(wishlist.some(item => item.id === book?.id));
        }, [book?.id]);

        if (!book) {
            return React.createElement('div', { className: 'container mt-4 text-center' }, [
                React.createElement('h3', { key: 'error' }, 'Book not found'),
                React.createElement('button', {
                    className: 'btn phthalo-primary text-white',
                    onClick: onBack,
                    key: 'back'
                }, 'Back to Books')
            ]);
        }

        const handleWishlistClick = () => {
            if (isInWishlist) {
                StorageUtils.removeFromWishlist(book.id);
                setIsInWishlist(false);
            } else {
                StorageUtils.addToWishlist(book);
                setIsInWishlist(true);
            }
            onRefresh && onRefresh();
        };

        const handleCartClick = () => {
            if (!user) {
                onLoginRequired && onLoginRequired();
                return;
            }
            StorageUtils.addToCart(book);
            onRefresh && onRefresh();
        };

        return React.createElement('div', {
            className: 'container mt-4',
            'data-name': 'book-detail',
            'data-file': 'pages/BookDetail.js'
        }, [
            React.createElement('button', {
                className: 'btn btn-outline-secondary mb-4',
                onClick: onBack,
                key: 'back-btn'
            }, [
                React.createElement('i', { className: 'fas fa-arrow-left me-2', key: 'arrow' }),
                'Back to Books'
            ]),
            React.createElement('div', { className: 'row', key: 'content' }, [
                React.createElement('div', { className: 'col-md-4', key: 'image-col' },
                    React.createElement('img', {
                        src: book.cover,
                        className: 'img-fluid rounded shadow',
                        alt: book.title,
                        style: { maxHeight: '500px', width: '100%', objectFit: 'cover' }
                    })
                ),
                React.createElement('div', { className: 'col-md-8', key: 'details-col' }, [
                    React.createElement('h2', { className: 'text-phthalo mb-3', key: 'title' }, book.title),
                    React.createElement('h5', { className: 'text-muted mb-3', key: 'author' }, `by ${book.author}`),
                    React.createElement('span', { className: 'badge bg-secondary mb-3', key: 'category' }, book.category),
                    React.createElement('div', { className: 'mb-3', key: 'reading-info' }, [
                        React.createElement('div', { className: 'text-muted', key: 'word-count' }, [
                            React.createElement('i', { className: 'fas fa-book me-2', key: 'book-icon' }),
                            `${book.wordCount.toLocaleString()} words`
                        ]),
                        React.createElement('div', { className: 'text-muted', key: 'reading-time' }, [
                            React.createElement('i', { className: 'fas fa-clock me-2', key: 'clock-icon' }),
                            `Reading time: ${book.readingTime}`
                        ])
                    ]),
                    React.createElement('p', { className: 'lead mb-4', key: 'description' }, book.longDescription),
                    React.createElement('div', { className: 'd-flex align-items-center gap-3 mb-4', key: 'actions' }, [
                        React.createElement('h3', { className: 'text-phthalo mb-0', key: 'price' }, `$${book.price}`),
                        React.createElement('button', {
                            className: `btn ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`,
                            onClick: handleWishlistClick,
                            key: 'wishlist'
                        }, [
                            React.createElement('i', { className: 'fas fa-heart me-2', key: 'heart' }),
                            isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'
                        ]),
                        React.createElement('button', {
                            className: 'btn phthalo-primary text-white',
                            onClick: handleCartClick,
                            key: 'cart'
                        }, [
                            React.createElement('i', { className: 'fas fa-cart-plus me-2', key: 'cart-icon' }),
                            'Add to Cart'
                        ])
                    ])
                ])
            ]),
            similarBooks.length > 0 && React.createElement('div', { className: 'mt-5', key: 'similar' }, [
                React.createElement('h4', { className: 'text-phthalo mb-4', key: 'similar-title' }, 'Similar Books'),
                React.createElement('div', { className: 'row', key: 'similar-books' },
                    similarBooks.map(similarBook =>
                        React.createElement(BookCard, {
                            key: similarBook.id,
                            book: similarBook,
                            onAddToWishlist: onRefresh,
                            onAddToCart: onRefresh,
                            onLoginRequired: onLoginRequired,
                            onBookClick: (id) => window.location.hash = `book-${id}`
                        })
                    )
                )
            ])
        ]);
    } catch (error) {
        console.error('BookDetail page error:', error);
        reportError(error);
    }
}

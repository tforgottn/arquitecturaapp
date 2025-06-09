function BookCard({ book, onAddToWishlist, onAddToCart, onLoginRequired, onBookClick }) {
    try {
        const { user } = useAuth();
        const [isInWishlist, setIsInWishlist] = React.useState(false);

        React.useEffect(() => {
            const wishlist = StorageUtils.getWishlist();
            setIsInWishlist(wishlist.some(item => item.id === book.id));
        }, [book.id]);

        const handleWishlistClick = () => {
            if (isInWishlist) {
                StorageUtils.removeFromWishlist(book.id);
                setIsInWishlist(false);
            } else {
                StorageUtils.addToWishlist(book);
                setIsInWishlist(true);
            }
            onAddToWishlist && onAddToWishlist();
        };

        const handleCartClick = () => {
            if (!user) {
                onLoginRequired && onLoginRequired();
                return;
            }
            StorageUtils.addToCart(book);
            onAddToCart && onAddToCart();
        };

        return React.createElement('div', {
            className: 'col-md-4 col-lg-3 mb-4',
            'data-name': 'book-card',
            'data-file': 'components/BookCard.js'
        },
            React.createElement('div', { className: 'card book-card h-100' }, [
                React.createElement('img', {
                    src: book.cover,
                    className: 'card-img-top',
                    alt: book.title,
                    style: { height: '300px', objectFit: 'cover', cursor: 'pointer' },
                    onClick: () => onBookClick && onBookClick(book.id),
                    key: 'image'
                }),
                React.createElement('div', { className: 'card-body d-flex flex-column', key: 'body' }, [
                    React.createElement('h6', { 
                        className: 'card-title text-phthalo', 
                        style: { cursor: 'pointer' },
                        onClick: () => onBookClick && onBookClick(book.id),
                        key: 'title' 
                    }, book.title),
                    React.createElement('p', { className: 'card-text text-muted small', key: 'author' }, `by ${book.author}`),
                    React.createElement('span', { className: 'badge bg-secondary mb-2', key: 'category' }, book.category),
                    React.createElement('div', { className: 'small text-muted mb-2', key: 'reading-info' }, [
                        React.createElement('i', { className: 'fas fa-book-open me-1', key: 'book-icon' }),
                        `${book.wordCount.toLocaleString()} words • ${book.readingTime}`
                    ]),
                    React.createElement('p', { className: 'card-text flex-grow-1', key: 'description' }, book.description),
                    React.createElement('div', { className: 'd-flex justify-content-between align-items-center mt-auto', key: 'actions' }, [
                        React.createElement('span', { className: 'h5 text-phthalo mb-0', key: 'price' }, `$${book.price}`),
                        React.createElement('div', { key: 'buttons' }, [
                            React.createElement('button', {
                                className: `btn btn-sm wishlist-btn me-2 ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`,
                                onClick: handleWishlistClick,
                                key: 'wishlist'
                            }, React.createElement('i', { className: 'fas fa-heart' })),
                            React.createElement('button', {
                                className: 'btn btn-sm phthalo-primary text-white cart-btn',
                                onClick: handleCartClick,
                                key: 'cart'
                            }, React.createElement('i', { className: 'fas fa-cart-plus' }))
                        ])
                    ])
                ])
            ])
        );
    } catch (error) {
        console.error('BookCard component error:', error);
        reportError(error);
    }
}

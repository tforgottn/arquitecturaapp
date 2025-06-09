function Wishlist({ onRefresh }) {
    try {
        const [wishlist, setWishlist] = React.useState([]);

        React.useEffect(() => {
            setWishlist(StorageUtils.getWishlist());
        }, []);

        const handleRemove = (bookId) => {
            const updated = StorageUtils.removeFromWishlist(bookId);
            setWishlist(updated);
            onRefresh();
        };

        const handleAddToCart = (book) => {
            StorageUtils.addToCart(book);
            onRefresh();
        };

        return React.createElement('div', {
            className: 'container mt-4',
            'data-name': 'wishlist-page',
            'data-file': 'pages/Wishlist.js'
        }, [
            React.createElement('h2', { className: 'text-phthalo mb-4', key: 'title' }, 
                React.createElement('i', { className: 'fas fa-heart me-2' }), 'My Wishlist'
            ),
            wishlist.length === 0 ? 
                React.createElement('div', { className: 'text-center py-5', key: 'empty' }, [
                    React.createElement('i', { className: 'fas fa-heart-broken fa-3x text-muted mb-3', key: 'icon' }),
                    React.createElement('h4', { className: 'text-muted', key: 'message' }, 'Your wishlist is empty'),
                    React.createElement('p', { className: 'text-muted', key: 'description' }, 'Add some books to your wishlist to see them here')
                ]) :
                React.createElement('div', { className: 'row', key: 'items' },
                    wishlist.map(book =>
                        React.createElement('div', { className: 'col-md-6 col-lg-4 mb-4', key: book.id },
                            React.createElement('div', { className: 'card h-100' }, [
                                React.createElement('img', {
                                    src: book.cover,
                                    className: 'card-img-top',
                                    alt: book.title,
                                    style: { height: '250px', objectFit: 'cover' },
                                    key: 'image'
                                }),
                                React.createElement('div', { className: 'card-body d-flex flex-column', key: 'body' }, [
                                    React.createElement('h6', { className: 'card-title text-phthalo', key: 'title' }, book.title),
                                    React.createElement('p', { className: 'card-text text-muted', key: 'author' }, `by ${book.author}`),
                                    React.createElement('p', { className: 'h5 text-phthalo', key: 'price' }, `$${book.price}`),
                                    React.createElement('div', { className: 'mt-auto', key: 'actions' }, [
                                        React.createElement('button', {
                                            className: 'btn phthalo-primary text-white me-2',
                                            onClick: () => handleAddToCart(book),
                                            key: 'add-cart'
                                        }, React.createElement('i', { className: 'fas fa-cart-plus me-2' }), 'Add to Cart'),
                                        React.createElement('button', {
                                            className: 'btn btn-outline-danger',
                                            onClick: () => handleRemove(book.id),
                                            key: 'remove'
                                        }, React.createElement('i', { className: 'fas fa-trash' }))
                                    ])
                                ])
                            ])
                        )
                    )
                )
        ]);
    } catch (error) {
        console.error('Wishlist page error:', error);
        reportError(error);
    }
}

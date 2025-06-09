function Cart({ onRefresh }) {
    try {
        const [cart, setCart] = React.useState([]);

        React.useEffect(() => {
            setCart(StorageUtils.getCart());
        }, []);

        const handleRemove = (bookId) => {
            const updated = StorageUtils.removeFromCart(bookId);
            setCart(updated);
            onRefresh();
        };

        const handleCheckout = () => {
            alert('Checkout functionality would be implemented with backend integration');
        };

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return React.createElement('div', {
            className: 'container mt-4',
            'data-name': 'cart-page',
            'data-file': 'pages/Cart.js'
        }, [
            React.createElement('h2', { className: 'text-phthalo mb-4', key: 'title' }, 
                React.createElement('i', { className: 'fas fa-shopping-cart me-2' }), 'Shopping Cart'
            ),
            cart.length === 0 ? 
                React.createElement('div', { className: 'text-center py-5', key: 'empty' }, [
                    React.createElement('i', { className: 'fas fa-shopping-cart fa-3x text-muted mb-3', key: 'icon' }),
                    React.createElement('h4', { className: 'text-muted', key: 'message' }, 'Your cart is empty'),
                    React.createElement('p', { className: 'text-muted', key: 'description' }, 'Add some books to your cart to see them here')
                ]) :
                React.createElement('div', { key: 'cart-content' }, [
                    React.createElement('div', { className: 'row', key: 'items' },
                        cart.map(book =>
                            React.createElement('div', { className: 'col-12 mb-3', key: book.id },
                                React.createElement('div', { className: 'card' }, [
                                    React.createElement('div', { className: 'card-body', key: 'body' }, [
                                        React.createElement('div', { className: 'row align-items-center', key: 'row' }, [
                                            React.createElement('div', { className: 'col-md-2', key: 'image' },
                                                React.createElement('img', {
                                                    src: book.cover,
                                                    className: 'img-fluid',
                                                    alt: book.title,
                                                    style: { height: '100px', objectFit: 'cover' }
                                                })
                                            ),
                                            React.createElement('div', { className: 'col-md-6', key: 'details' }, [
                                                React.createElement('h6', { className: 'text-phthalo', key: 'title' }, book.title),
                                                React.createElement('p', { className: 'text-muted mb-0', key: 'author' }, `by ${book.author}`)
                                            ]),
                                            React.createElement('div', { className: 'col-md-2', key: 'quantity' },
                                                React.createElement('span', { className: 'badge bg-secondary' }, `Qty: ${book.quantity}`)
                                            ),
                                            React.createElement('div', { className: 'col-md-2', key: 'actions' }, [
                                                React.createElement('p', { className: 'h6 text-phthalo mb-2', key: 'price' }, `$${(book.price * book.quantity).toFixed(2)}`),
                                                React.createElement('button', {
                                                    className: 'btn btn-outline-danger btn-sm',
                                                    onClick: () => handleRemove(book.id),
                                                    key: 'remove'
                                                }, React.createElement('i', { className: 'fas fa-trash' }))
                                            ])
                                        ])
                                    ])
                                ])
                            )
                        )
                    ),
                    React.createElement('div', { className: 'card mt-4', key: 'total' }, [
                        React.createElement('div', { className: 'card-body text-end', key: 'total-body' }, [
                            React.createElement('h4', { className: 'text-phthalo', key: 'total-text' }, `Total: $${total.toFixed(2)}`),
                            React.createElement('button', {
                                className: 'btn phthalo-primary text-white btn-lg mt-3',
                                onClick: handleCheckout,
                                key: 'checkout'
                            }, React.createElement('i', { className: 'fas fa-credit-card me-2' }), 'Proceed to Checkout')
                        ])
                    ])
                ])
        ]);
    } catch (error) {
        console.error('Cart page error:', error);
        reportError(error);
    }
}

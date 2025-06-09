function Header({ currentPage, setCurrentPage, setShowLogin }) {
    try {
        const { user, logout } = useAuth();
        const [wishlistCount, setWishlistCount] = React.useState(0);
        const [cartCount, setCartCount] = React.useState(0);

        React.useEffect(() => {
            setWishlistCount(StorageUtils.getWishlist().length);
            setCartCount(StorageUtils.getCart().reduce((sum, item) => sum + item.quantity, 0));
        }, [currentPage]);

        return React.createElement('nav', {
            className: 'navbar navbar-expand-lg phthalo-primary',
            'data-name': 'header',
            'data-file': 'components/Header.js'
        }, [
            React.createElement('div', { className: 'container', key: 'container' }, [
                React.createElement('a', {
                    className: 'navbar-brand text-white',
                    href: '#',
                    onClick: (e) => { e.preventDefault(); setCurrentPage('home'); },
                    key: 'brand'
                }, [
                    React.createElement('i', { className: 'fas fa-dragon me-2', key: 'icon' }),
                    'Caracarn Book Store'
                ]),
                React.createElement('div', { className: 'navbar-nav ms-auto d-flex flex-row align-items-center', key: 'nav' }, [
                    React.createElement('button', {
                        className: 'btn btn-outline-light me-3 position-relative',
                        onClick: () => setCurrentPage('wishlist'),
                        key: 'wishlist'
                    }, [
                        React.createElement('i', { className: 'fas fa-heart', key: 'heart' }),
                        wishlistCount > 0 && React.createElement('span', {
                            className: 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger',
                            key: 'badge'
                        }, wishlistCount)
                    ]),
                    React.createElement('button', {
                        className: 'btn btn-outline-light me-3 position-relative',
                        onClick: () => setCurrentPage('cart'),
                        key: 'cart'
                    }, [
                        React.createElement('i', { className: 'fas fa-shopping-cart', key: 'cart-icon' }),
                        cartCount > 0 && React.createElement('span', {
                            className: 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger',
                            key: 'cart-badge'
                        }, cartCount)
                    ]),
                    user ? React.createElement('div', { className: 'dropdown', key: 'user-menu' }, [
                        React.createElement('button', {
                            className: 'btn btn-outline-light dropdown-toggle',
                            'data-bs-toggle': 'dropdown',
                            key: 'user-btn'
                        }, [
                            React.createElement('i', { className: 'fas fa-user me-2', key: 'user-icon' }),
                            user.name
                        ]),
                        React.createElement('ul', { className: 'dropdown-menu', key: 'dropdown' }, [
                            React.createElement('li', { key: 'logout' },
                                React.createElement('button', {
                                    className: 'dropdown-item',
                                    onClick: logout
                                }, 'Logout')
                            )
                        ])
                    ]) : React.createElement('button', {
                        className: 'btn btn-outline-light',
                        onClick: () => setShowLogin(true),
                        key: 'login'
                    }, 'Login')
                ])
            ])
        ]);
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}

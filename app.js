function App() {
    try {
        const [currentPage, setCurrentPage] = React.useState('home');
        const [selectedBookId, setSelectedBookId] = React.useState(null);
        const [showLogin, setShowLogin] = React.useState(false);
        const [showRegister, setShowRegister] = React.useState(false);
        const [refreshKey, setRefreshKey] = React.useState(0);

        const handleRefresh = () => {
            setRefreshKey(prev => prev + 1);
        };

        const handleLoginRequired = () => {
            setShowLogin(true);
        };

        const handleBookClick = (bookId) => {
            setSelectedBookId(bookId);
            setCurrentPage('book-detail');
        };

        const handleBackToHome = () => {
            setCurrentPage('home');
            setSelectedBookId(null);
        };

        const renderCurrentPage = () => {
            switch (currentPage) {
                case 'home':
                    return React.createElement(Home, { 
                        onRefresh: handleRefresh,
                        onLoginRequired: handleLoginRequired,
                        onBookClick: handleBookClick
                    });
                case 'book-detail':
                    return React.createElement(BookDetail, {
                        bookId: selectedBookId,
                        onBack: handleBackToHome,
                        onRefresh: handleRefresh,
                        onLoginRequired: handleLoginRequired
                    });
                case 'wishlist':
                    return React.createElement(Wishlist, { onRefresh: handleRefresh });
                case 'cart':
                    return React.createElement(Cart, { onRefresh: handleRefresh });
                default:
                    return React.createElement(Home, { 
                        onRefresh: handleRefresh,
                        onLoginRequired: handleLoginRequired,
                        onBookClick: handleBookClick
                    });
            }
        };

        return React.createElement(AuthProvider, { key: 'auth-provider' }, [
            React.createElement(Header, {
                currentPage: currentPage,
                setCurrentPage: setCurrentPage,
                setShowLogin: setShowLogin,
                key: `header-${refreshKey}`
            }),
            React.createElement('main', { key: 'main' }, renderCurrentPage()),
            React.createElement(LoginModal, {
                show: showLogin,
                onHide: () => setShowLogin(false),
                onSwitchToRegister: () => setShowRegister(true),
                key: 'login-modal'
            }),
            React.createElement(RegisterModal, {
                show: showRegister,
                onHide: () => setShowRegister(false),
                onSwitchToLogin: () => setShowLogin(true),
                key: 'register-modal'
            })
        ]);
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));

function Home({ onRefresh, onLoginRequired, onBookClick }) {
    try {
        const [selectedCategory, setSelectedCategory] = React.useState('All Books');
        const [displayBooks, setDisplayBooks] = React.useState(BookData.books);

        React.useEffect(() => {
            setDisplayBooks(BookData.getBooksByCategory(selectedCategory));
        }, [selectedCategory]);

        const [recommendations] = React.useState([
            { title: "The Wheel of Time", author: "Robert Jordan", description: "Epic 14-book fantasy series" },
            { title: "Dune Chronicles", author: "Frank Herbert", description: "Science fantasy masterpiece" },
            { title: "A Song of Ice and Fire", author: "George R.R. Martin", description: "Complex political fantasy" },
            { title: "Mistborn Series", author: "Brandon Sanderson", description: "Innovative magic systems" }
        ]);

        return React.createElement('div', {
            'data-name': 'home-page',
            'data-file': 'pages/Home.js'
        }, [
            React.createElement('div', { className: 'hero-section text-center', key: 'hero' }, 
                React.createElement('div', { className: 'container' }, [
                    React.createElement('h1', { className: 'display-4 mb-4', key: 'title' }, 'Welcome to Caracarn Book Store'),
                    React.createElement('p', { className: 'lead', key: 'subtitle' }, 'Your gateway to epic fantasy adventures and legendary tales')
                ])
            ),
            React.createElement('div', { className: 'container mt-5', key: 'content' }, [
                React.createElement('div', { className: 'kindle-suggestion rounded p-4 mb-5', key: 'recommendations' }, [
                    React.createElement('h4', { className: 'mb-4', key: 'rec-title' }, 
                        React.createElement('i', { className: 'fas fa-star me-2' }), 'Epic Fantasy Recommendations'
                    ),
                    React.createElement('div', { className: 'row', key: 'rec-list' },
                        recommendations.map((rec, index) =>
                            React.createElement('div', { className: 'col-md-6 col-lg-3 mb-3', key: index },
                                React.createElement('div', { className: 'text-center' }, [
                                    React.createElement('h6', { className: 'mb-1', key: 'title' }, rec.title),
                                    React.createElement('small', { className: 'text-light opacity-75', key: 'author' }, rec.author),
                                    React.createElement('p', { className: 'small mb-0 mt-1', key: 'desc' }, rec.description)
                                ])
                            )
                        )
                    )
                ]),
                React.createElement(CategoryFilter, {
                    selectedCategory: selectedCategory,
                    onCategoryChange: setSelectedCategory,
                    key: 'category-filter'
                }),
                React.createElement('h2', { className: 'text-phthalo mb-4', key: 'books-title' }, 
                    `${selectedCategory} (${displayBooks.length})`
                ),
                React.createElement('div', { className: 'row', key: 'books' },
                    displayBooks.map(book =>
                        React.createElement(BookCard, {
                            key: book.id,
                            book: book,
                            onAddToWishlist: onRefresh,
                            onAddToCart: onRefresh,
                            onLoginRequired: onLoginRequired,
                            onBookClick: onBookClick
                        })
                    )
                )
            ])
        ]);
    } catch (error) {
        console.error('Home page error:', error);
        reportError(error);
    }
}

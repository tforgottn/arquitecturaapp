function CategoryFilter({ selectedCategory, onCategoryChange }) {
    try {
        return React.createElement('div', {
            className: 'mb-4',
            'data-name': 'category-filter',
            'data-file': 'components/CategoryFilter.js'
        }, [
            React.createElement('h5', { className: 'text-phthalo mb-3', key: 'title' }, 'Book Categories'),
            React.createElement('div', { className: 'd-flex flex-wrap gap-2', key: 'buttons' },
                BookData.categories.map(category =>
                    React.createElement('button', {
                        key: category,
                        className: `btn btn-sm ${selectedCategory === category ? 'phthalo-primary text-white' : 'btn-outline-secondary'}`,
                        onClick: () => onCategoryChange(category)
                    }, category)
                )
            )
        ]);
    } catch (error) {
        console.error('CategoryFilter component error:', error);
        reportError(error);
    }
}

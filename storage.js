const StorageUtils = {
    getWishlist: () => {
        try {
            const wishlist = localStorage.getItem('bookstore_wishlist');
            return wishlist ? JSON.parse(wishlist) : [];
        } catch (error) {
            console.error('Error getting wishlist:', error);
            return [];
        }
    },

    addToWishlist: (book) => {
        try {
            const wishlist = StorageUtils.getWishlist();
            const exists = wishlist.find(item => item.id === book.id);
            if (!exists) {
                wishlist.push(book);
                localStorage.setItem('bookstore_wishlist', JSON.stringify(wishlist));
            }
            return wishlist;
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            return StorageUtils.getWishlist();
        }
    },

    removeFromWishlist: (bookId) => {
        try {
            const wishlist = StorageUtils.getWishlist();
            const filtered = wishlist.filter(item => item.id !== bookId);
            localStorage.setItem('bookstore_wishlist', JSON.stringify(filtered));
            return filtered;
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            return StorageUtils.getWishlist();
        }
    },

    getCart: () => {
        try {
            const cart = localStorage.getItem('bookstore_cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error getting cart:', error);
            return [];
        }
    },

    addToCart: (book) => {
        try {
            const cart = StorageUtils.getCart();
            const existingItem = cart.find(item => item.id === book.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...book, quantity: 1 });
            }
            localStorage.setItem('bookstore_cart', JSON.stringify(cart));
            return cart;
        } catch (error) {
            console.error('Error adding to cart:', error);
            return StorageUtils.getCart();
        }
    },

    removeFromCart: (bookId) => {
        try {
            const cart = StorageUtils.getCart();
            const filtered = cart.filter(item => item.id !== bookId);
            localStorage.setItem('bookstore_cart', JSON.stringify(filtered));
            return filtered;
        } catch (error) {
            console.error('Error removing from cart:', error);
            return StorageUtils.getCart();
        }
    }
};

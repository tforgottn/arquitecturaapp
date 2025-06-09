const BookData = {
    categories: [
        'All Books',
        'Epic Fantasy',
        'Urban Fantasy',
        'Science Fantasy',
        'Dark Fantasy',
        'High Fantasy',
        'Sword & Sorcery'
    ],

    books: [
        {
            id: 1,
            title: "The Eye of the World",
            author: "Robert Jordan",
            price: 16.99,
            category: "Epic Fantasy",
            wordCount: 305000,
            readingTime: "20h 20m",
            cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
            description: "The first book in The Wheel of Time series, an epic fantasy adventure following Rand al'Thor.",
            longDescription: "In a world where magic exists and prophecies shape destiny, young Rand al'Thor discovers he may be the prophesied Dragon Reborn. This epic tale begins an incredible journey through a richly detailed world."
        },
        {
            id: 2,
            title: "Dune",
            author: "Frank Herbert",
            price: 18.99,
            category: "Science Fantasy",
            wordCount: 188000,
            readingTime: "12h 30m",
            cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
            description: "A science fantasy epic set on the desert planet Arrakis.",
            longDescription: "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides as he and his family accept control of the desert planet Arrakis."
        },
        {
            id: 3,
            title: "A Game of Thrones",
            author: "George R.R. Martin",
            price: 17.99,
            category: "Dark Fantasy",
            wordCount: 298000,
            readingTime: "19h 50m",
            cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
            description: "The first book in A Song of Ice and Fire series.",
            longDescription: "In the Seven Kingdoms of Westeros, noble families fight for control of the Iron Throne. Political intrigue, betrayal, and supernatural threats converge in this gripping tale."
        },
        {
            id: 4,
            title: "The Final Empire",
            author: "Brandon Sanderson",
            price: 15.99,
            category: "High Fantasy",
            wordCount: 214000,
            readingTime: "14h 15m",
            cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
            description: "First book in the Mistborn trilogy, featuring unique magic systems.",
            longDescription: "In a world where ash falls from the sky and mist dominates the night, a thief discovers she has magical powers that could overthrow an immortal emperor."
        },
        {
            id: 5,
            title: "The Name of the Wind",
            author: "Patrick Rothfuss",
            price: 16.99,
            category: "High Fantasy",
            wordCount: 259000,
            readingTime: "17h 15m",
            cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
            description: "The first book in The Kingkiller Chronicle series.",
            longDescription: "Kvothe tells his own story - of his legendary exploits, his time at the University learning magic, and his search for answers about the mysterious Chandrian."
        },
        {
            id: 6,
            title: "The Fellowship of the Ring",
            author: "J.R.R. Tolkien",
            price: 14.99,
            category: "High Fantasy",
            wordCount: 187000,
            readingTime: "12h 25m",
            cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
            description: "The first volume of The Lord of the Rings trilogy.",
            longDescription: "Frodo Baggins inherits a mysterious ring from his cousin Bilbo and must embark on a perilous journey to destroy it before the Dark Lord Sauron can reclaim it."
        },
        {
            id: 7,
            title: "The Blade Itself",
            author: "Joe Abercrombie",
            price: 15.99,
            category: "Dark Fantasy",
            wordCount: 215000,
            readingTime: "14h 20m",
            cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop",
            description: "First book in The First Law trilogy, a gritty fantasy adventure.",
            longDescription: "In a world where heroes are hard to come by, an infamous barbarian, a crippled torturer, and a selfish nobleman must work together to save their world."
        },
        {
            id: 8,
            title: "Storm Front",
            author: "Jim Butcher",
            price: 13.99,
            category: "Urban Fantasy",
            wordCount: 95000,
            readingTime: "6h 20m",
            cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop",
            description: "First Dresden Files book, mixing magic with modern Chicago.",
            longDescription: "Harry Dresden is Chicago's only professional wizard, and business is slow. But when the police bring him in to consult on a double murder, things get complicated fast."
        }
    ],

    getSimilarBooks: (bookId, limit = 3) => {
        const book = BookData.books.find(b => b.id === bookId);
        if (!book) return [];
        
        return BookData.books
            .filter(b => b.id !== bookId && b.category === book.category)
            .slice(0, limit);
    },

    getBooksByCategory: (category) => {
        if (category === 'All Books') return BookData.books;
        return BookData.books.filter(book => book.category === category);
    }
};

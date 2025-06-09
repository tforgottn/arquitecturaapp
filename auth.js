const AuthContext = React.createContext();

function AuthProvider({ children }) {
    try {
        const [user, setUser] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(false);

        React.useEffect(() => {
            const savedUser = localStorage.getItem('bookstore_user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }, []);

        const login = async (email, password) => {
            setIsLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                const userData = { id: 1, email, name: email.split('@')[0] };
                setUser(userData);
                localStorage.setItem('bookstore_user', JSON.stringify(userData));
                return { success: true };
            } catch (error) {
                return { success: false, error: 'Login failed' };
            } finally {
                setIsLoading(false);
            }
        };

        const logout = () => {
            setUser(null);
            localStorage.removeItem('bookstore_user');
        };

        const value = {
            user,
            login,
            logout,
            isLoading
        };

        return React.createElement(AuthContext.Provider, { value }, children);
    } catch (error) {
        console.error('Auth provider error:', error);
        reportError(error);
    }
}

function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

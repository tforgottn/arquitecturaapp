function LoginModal({ show, onHide, onSwitchToRegister }) {
    try {
        const { login, isLoading } = useAuth();
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [error, setError] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            
            if (!email || !password) {
                setError('Please fill in all fields');
                return;
            }

            const result = await login(email, password);
            if (result.success) {
                onHide();
                setEmail('');
                setPassword('');
            } else {
                setError(result.error);
            }
        };

        if (!show) return null;

        return React.createElement('div', {
            className: 'modal d-block',
            style: { backgroundColor: 'rgba(0,0,0,0.5)' },
            'data-name': 'login-modal',
            'data-file': 'components/LoginModal.js'
        },
            React.createElement('div', { className: 'modal-dialog modal-dialog-centered' },
                React.createElement('div', { className: 'modal-content' }, [
                    React.createElement('div', { className: 'modal-header phthalo-primary text-white', key: 'header' }, [
                        React.createElement('h5', { className: 'modal-title', key: 'title' }, 'Login to Caracarn'),
                        React.createElement('button', {
                            type: 'button',
                            className: 'btn-close btn-close-white',
                            onClick: onHide,
                            key: 'close'
                        })
                    ]),
                    React.createElement('div', { className: 'modal-body', key: 'body' },
                        React.createElement('form', { onSubmit: handleSubmit }, [
                            error && React.createElement('div', {
                                className: 'alert alert-danger',
                                key: 'error'
                            }, error),
                            React.createElement('div', { className: 'mb-3', key: 'email-group' }, [
                                React.createElement('label', { className: 'form-label', key: 'email-label' }, 'Email'),
                                React.createElement('input', {
                                    type: 'email',
                                    className: 'form-control',
                                    value: email,
                                    onChange: (e) => setEmail(e.target.value),
                                    placeholder: 'Enter your email',
                                    key: 'email-input'
                                })
                            ]),
                            React.createElement('div', { className: 'mb-3', key: 'password-group' }, [
                                React.createElement('label', { className: 'form-label', key: 'password-label' }, 'Password'),
                                React.createElement('input', {
                                    type: 'password',
                                    className: 'form-control',
                                    value: password,
                                    onChange: (e) => setPassword(e.target.value),
                                    placeholder: 'Enter your password',
                                    key: 'password-input'
                                })
                            ]),
                            React.createElement('button', {
                                type: 'submit',
                                className: 'btn phthalo-primary text-white w-100 mb-3',
                                disabled: isLoading,
                                key: 'submit'
                            }, isLoading ? 'Logging in...' : 'Login'),
                            React.createElement('div', { className: 'text-center', key: 'switch' }, [
                                React.createElement('span', { key: 'text' }, "Don't have an account? "),
                                React.createElement('button', {
                                    type: 'button',
                                    className: 'btn btn-link p-0',
                                    onClick: () => { onHide(); onSwitchToRegister(); },
                                    key: 'register-link'
                                }, 'Register here')
                            ])
                        ])
                    )
                ])
            )
        );
    } catch (error) {
        console.error('LoginModal component error:', error);
        reportError(error);
    }
}

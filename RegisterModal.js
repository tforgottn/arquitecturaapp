function RegisterModal({ show, onHide, onSwitchToLogin }) {
    try {
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [name, setName] = React.useState('');
        const [error, setError] = React.useState('');
        const [isLoading, setIsLoading] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            
            if (!name || !email || !password) {
                setError('Please fill in all fields');
                return;
            }

            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('Registration successful! Please login with your credentials.');
                onHide();
                setName('');
                setEmail('');
                setPassword('');
                onSwitchToLogin();
            } catch (error) {
                setError('Registration failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        if (!show) return null;

        return React.createElement('div', {
            className: 'modal d-block',
            style: { backgroundColor: 'rgba(0,0,0,0.5)' },
            'data-name': 'register-modal',
            'data-file': 'components/RegisterModal.js'
        },
            React.createElement('div', { className: 'modal-dialog modal-dialog-centered' },
                React.createElement('div', { className: 'modal-content' }, [
                    React.createElement('div', { className: 'modal-header phthalo-primary text-white', key: 'header' }, [
                        React.createElement('h5', { className: 'modal-title', key: 'title' }, 'Register at Caracarn'),
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
                            React.createElement('div', { className: 'mb-3', key: 'name-group' }, [
                                React.createElement('label', { className: 'form-label', key: 'name-label' }, 'Full Name'),
                                React.createElement('input', {
                                    type: 'text',
                                    className: 'form-control',
                                    value: name,
                                    onChange: (e) => setName(e.target.value),
                                    placeholder: 'Enter your full name',
                                    key: 'name-input'
                                })
                            ]),
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
                            }, isLoading ? 'Registering...' : 'Register'),
                            React.createElement('div', { className: 'text-center', key: 'switch' }, [
                                React.createElement('span', { key: 'text' }, 'Already have an account? '),
                                React.createElement('button', {
                                    type: 'button',
                                    className: 'btn btn-link p-0',
                                    onClick: () => { onHide(); onSwitchToLogin(); },
                                    key: 'login-link'
                                }, 'Login here')
                            ])
                        ])
                    )
                ])
            )
        );
    } catch (error) {
        console.error('RegisterModal component error:', error);
        reportError(error);
    }
}

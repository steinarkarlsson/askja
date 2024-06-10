module.exports = {
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier'
    ],
    'parser': '@typescript-eslint/parser',
    'plugins': ['@typescript-eslint'],
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    rules: {
        'quotes': ['error', 'single', {'avoidEscape':true}],
    }
}

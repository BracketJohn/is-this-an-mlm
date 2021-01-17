module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: ['eslint:recommended', 'plugin:vue/base', 'plugin:prettier/recommended', 'prettier/vue'],
    globals: {
        process: 'readonly',
    },
    rules: {
        'prettier/prettier': 'warn',
        'prefer-const': ['warn'],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        curly: 'warn',
    },
    plugins: ['prettier'],
};

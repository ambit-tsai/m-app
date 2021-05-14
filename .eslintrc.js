module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        indent: ['error', 4],
        semi: ['error', 'never'],
        'no-use-before-define': ['error', 'nofunc'],
        'no-underscore-dangle': 'off',
        'no-plusplus': 'off',
        'no-continue': 'off',
        'func-names': 'off',
        'no-param-reassign': 'off',
        'prefer-const': ['error', { destructuring: 'all' }],
        'arrow-parens': ['error', 'as-needed'],
        'no-confusing-arrow': 'off',
        'no-return-assign': ['error', 'except-parens'],
        'import/prefer-default-export': 'off',
        'no-restricted-syntax': 'off',
        'import/extensions': ['error', {
            '.ts': 'never',
        }],
        'import/no-unresolved': 'off',
    },
}

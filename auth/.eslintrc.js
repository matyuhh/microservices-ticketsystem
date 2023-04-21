module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir : __dirname, 
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'airbnb-base',
      'airbnb-typescript'
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      "no-underscore-dangle":  ["error", { "allow": ["_id", "_update"] }],
      "react/jsx-filename-extension": [0],
      "linebreak-style": "off",
      "no-console": ["error", { "allow": ["debug", "error", "warn", "info"] }],
      "max-len": ["error", { "code": 160 }],
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
    },
  };
  
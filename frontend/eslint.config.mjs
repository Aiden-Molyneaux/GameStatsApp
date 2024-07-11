import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import { fixupConfigRules } from '@eslint/compat';

export default [
  {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  { 
    languageOptions: {
      parserOptions: { 
        ecmaFeatures: { 
          jsx: true 
        } 
      } 
    } 
  },
  {languageOptions: { globals: globals.browser }},
  // { extends: [
  //     "react-app",
  //     "react-app/jest"
  //   ]
  // },
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      camelcase: ['error', { properties: 'always' }],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      semi: ['error', 'always'],
      eqeqeq: ['error', 'always'],
      indent: ['error', 2],
      'jsx-quotes': ['error', 'prefer-single'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
    }
  }
];
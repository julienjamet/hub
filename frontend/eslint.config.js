/****************************************************************IMPORTS*/
/****************************************NPM MODULES*/
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
/****************************************************/
/************************************************************************/


/**********************************************************ESLINT CONFIG*/
/*********************************************TARGET*/
// -- to target TS and TSX files only
const files = ['**/*.{ts,tsx}'];

// -- to ignore built files
const ignores = { ignores: ['dist'] };
/****************************************************/


/********************************************CONTEXT*/
// -- to indicate a browser ( frontend ) context
const codingContext = globals.browser;

// -- to indicate a use of JS modern features
const ecmaVersion = 2020;

const languageOptions = {
    globals: codingContext,
    ecmaVersion: ecmaVersion
};
/****************************************************/


/**********************************************RULES*/
// -- to use recommended JS lint rules
const jsRules = js.configs.recommended;

// -- to use recommended TS lint rules
const tsRules = tseslint.configs.recommended;

const jsTsRules = [jsRules, ...tsRules];

// -- to declare React plugins used below
const reactPlugins = {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh
};

// -- to use recommended hooks lint rules
const hooksRules = reactHooks.configs.recommended.rules;

const reactRules = {
    ...hooksRules,
    // -- to add a warning if an export of something other than a React component is found ( constants also tolerated )
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
};
/****************************************************/


/*********************************************CONFIG*/
const configOptions = {
    files: files,
    languageOptions: languageOptions,
    extends: jsTsRules,
    plugins: reactPlugins,
    rules: reactRules
};

const eslintConfig = tseslint.config(ignores, configOptions);
/****************************************************/


export default eslintConfig;
/************************************************************************/
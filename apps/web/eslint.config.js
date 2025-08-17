import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import stylistic from '@stylistic/eslint-plugin';
import importXPlugin from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
const nextJsConfig = [
  // ========================================
  // 기본 추천 설정
  // ========================================
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // ========================================
  // Stylistic 기본 설정
  // ========================================
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
  }),

  // ========================================
  // 기본 환경 설정
  // ========================================
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        browser: true,
        commonjs: true,
        node: true,
        es2021: true,
      },
    },
  },

  // ========================================
  // 플러그인 설정
  // ========================================
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'import-x': importXPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@stylistic': stylistic,
      '@next/next': nextPlugin,
    },
  },

  // ========================================
  // React 설정
  // ========================================
  {
    settings: {
      'react': {
        version: 'detect',
      },
      'import-x/resolver': {
        typescript: true,
        node: true,
      },
    },
  },

  // ========================================
  // 모든 파일에 적용되는 규칙
  // ========================================
  {
    files: [
      '**/*.{js,jsx,ts,tsx}',
    ],
    ignores: [
      '**/eslint.config.{js,mjs,ts}',
      'eslint.config.{js,mjs,ts}',
    ],
    rules: {
      // ===== 기본 ESLint 규칙 =====
      'no-console': 'off',
      'no-unused-vars': 'off',
      'no-unexpected-multiline': 'off',
      'no-use-before-define': 'off',
      'spaced-comment': 'off',
      'no-multiple-empty-lines': [
        'error',
        { max: 1, maxBOF: 0, maxEOF: 0 },
      ],
      'no-irregular-whitespace': 'error',
      'no-param-reassign': 'off',
      'eol-last': ['warn', 'always'],
      'no-plusplus': 'off',
      'no-restricted-syntax': 'off',
      'array-callback-return': 'off',
      'consistent-return': 'off',
      'no-nested-ternary': 'off',
      'no-shadow': 'off',
      'linebreak-style': 'off',
      'prefer-const': 'off',
      'max-len': 'off',
      'no-else-return': 'off',
      'no-lonely-if': 'off',
      'global-require': 'off',
      'class-methods-use-this': 'off',
      'no-useless-constructor': 'off',
      'no-useless-return': 'off',
      'lines-between-class-members': 'off',
      'arrow-body-style': 'off',
      'no-empty-function': 'off',
      'camelcase': 'off',
      'no-empty-pattern': 'off',
      'no-underscore-dangle': 'off',
      'function-call-argument-newline': 'off',
      'function-paren-newline': 'off',

      // ===== Stylistic 규칙 =====
      '@stylistic/multiline-ternary': [
        'warn',
        'always',
      ],
      '@stylistic/arrow-parens': [
        'error',
        'always',
      ],
      '@stylistic/quotes': [
        'error',
        'single',
        { allowTemplateLiterals: 'always' },
      ],
      '@stylistic/semi': [
        'error',
        'always',
      ],
      '@stylistic/array-bracket-spacing': [
        'warn',
        'always',
        {
          arraysInArrays: true,
          singleValue: true,
          objectsInArrays: true,
        },
      ],
      '@stylistic/object-curly-spacing': [
        'warn',
        'always',
      ],
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, consistent: true },
          ObjectPattern: { multiline: true, consistent: true },
          ImportDeclaration: { multiline: true, consistent: true },
          ExportDeclaration: { multiline: true, consistent: true },
        },
      ],
      '@stylistic/array-element-newline': 'off',
      '@stylistic/array-bracket-newline': 'off',
      '@stylistic/object-property-newline': 'off',
      '@stylistic/comma-dangle': [
        'warn',
        {
          arrays: 'always',
          functions: 'never',
          objects: 'always',
          imports: 'never',
          exports: 'never',
        },
      ],
      '@stylistic/comma-style': [
        'error',
        'last',
        {
          exceptions: {
            ObjectExpression: true,
            ArrayExpression: true,
            VariableDeclaration: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            ArrowFunctionExpression: true,
          },
        },
      ],
      '@stylistic/indent': [
        'error',
        2,
        {
          FunctionDeclaration: { parameters: 1 },
          FunctionExpression: { parameters: 1 },
          CallExpression: { arguments: 1 },
        },
      ],

      // ===== Import 규칙 =====
      'import-x/extensions': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/no-dynamic-require': 'off',
      'import-x/prefer-default-export': 'off',
      'import-x/order': [
        'warn',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          'alphabetize': { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-cycle': 'off',
      'import-x/no-self-import': 'error',
      'import-x/no-useless-path-segments': 'warn',

      // ===== TypeScript 규칙 =====
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-use-before-define': [
        'warn',
        { functions: false, classes: true, variables: true },
      ],

      // ===== React JSX Stylistic 규칙 =====
      '@stylistic/jsx-quotes': [
        'error',
        'prefer-single',
      ],
      '@stylistic/jsx-indent-props': [
        'warn',
        2,
      ],
      '@stylistic/jsx-curly-spacing': [
        'error',
        { when: 'never', children: true },
      ],
      '@stylistic/jsx-closing-bracket-location': [
        'warn',
        'tag-aligned',
      ],
      '@stylistic/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],

      // ===== React 규칙 =====
      'react/jsx-props-no-spreading': 'off',
      'react/forbid-prop-types': 'off',
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['js', 'jsx', '.ts', '.tsx'] },
      ],
      'react/no-danger': 'off',
      'react/require-default-props': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react/no-arrow-function-lifecycle': 'off',
      'react/no-invalid-html-attribute': 'off',
      'react/no-unused-class-component-methods': 'off',
      'react/button-has-type': 'off',
      'react/no-unknown-property': [
        'error',
        { ignore: ['css', 'tw', 'jsx', 'global'] },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ===== JSX A11y 규칙 =====
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      'jsx-a11y/anchor-has-content': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/label-has-associated-control': 'off',

      // ===== 플러그인 기본 규칙들 =====
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // ===== Next.js 커스텀 규칙 =====
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'warn',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-is-mounted': 'error',
      'react/no-typos': 'error',
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'warn',
      '@next/next/no-unwanted-polyfillio': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/inline-script-id': 'error',
      '@next/next/no-css-tags': 'error',
      '@next/next/no-head-element': 'error',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/img-redundant-alt': 'warn',
      'jsx-a11y/no-access-key': 'error',
    },
  },

  // ========================================
  // 무시할 파일들
  // ========================================
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/pnpm-lock.yaml',
      '**/.git/**',
      '**/.cursor/**',
      '**/public/**',
      '**/coverage/**',
      '**/*.log',
      'app/(common)/_components/ui/**',
    ],
  },
];

export default nextJsConfig;

import { defineConfig, globalIgnores } from 'eslint/config'

import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import svelteConfig from './svelte.config.js'

import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'
const compat = new FlatCompat()

// https://eslint.org/docs/latest/use/configure/ignore#ignoring-files
export default defineConfig([
  // Standard JS config
  // https://github.com/standard/eslint-config-standard/issues/411
  ...fixupConfigRules(
    compat.config({
      extends: ['standard']
    })
  ),
  globalIgnores([
    '.*/',
    'build',
    'src/lib/mawanet',
    'src/lib/stores/mawanet.loader.js'
  ]),
  // https://github.com/sveltejs/eslint-plugin-svelte?tab=readme-ov-file#javascript-project
  ...svelte.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        // We recommend importing and specifying svelte.config.js.
        // By doing so, some rules in eslint-plugin-svelte will automatically read the configuration and adjust their behavior accordingly.
        // While certain Svelte settings may be statically loaded from svelte.config.js even if you don’t specify it,
        // explicitly specifying it ensures better compatibility and functionality.
        svelteConfig
      }
    }
  }
])

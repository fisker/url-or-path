import fiskerEslintConfig from '@fisker/eslint-config'

export default [
  ...fiskerEslintConfig,
  {rules: {'sonarjs/no-nested-conditional': 'off'}},
]

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'semi': ['error', 'never', {'beforeStatementContinuationChars': 'always'}], // 结尾分号规则
    'semi': ['error', 'always'],
    'comma-dangle': 'off', // 结束不强制逗号
    'arrow-parens': 'off', // 箭头函数参数不必须使用括号
    'arrow-body-style': ['error', 'as-needed', {"requireReturnForObjectLiteral": true}], // 箭头函数返回值是否需要{}
    'space-before-function-paren': 0, // 函数（）前面不空格
    'no-useless-escape': 0, // 转译字符
    'lines-between-class-members': 0,
    'no-throw-literal': 0,
    'quote-props': 0, // 对象key可以用引号
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0, // 不允许使用require关闭
  }
}

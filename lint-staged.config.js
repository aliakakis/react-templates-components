export default {
  '*.{js,ts,jsx,tsx}': [
    'prettier --write',
    'eslint --fix',
    () => 'tsc --noEmit',
  ],
  '*.{css,scss}': ['prettier --write', 'stylelint --fix'],
  '*.{json,md}': ['prettier --write'],
};

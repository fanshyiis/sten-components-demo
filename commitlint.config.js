module.exports = {
  extends: ['cz'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(.*?)\((.*?)\):\s?(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
};

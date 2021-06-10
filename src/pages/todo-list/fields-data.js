export const KEYS = ["id", "name", "age", "title", "author", "key"];

const FieldsData = data => {
  return KEYS.map(item => {
    return {
      name: [item],
      value: data[item] || null,
      errors: []
    };
  });
};

export { FieldsData };

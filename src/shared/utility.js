export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  if (rules.required && value.trim() === '') {
    return rules.required.message;
  } else if (rules.minLength && value.length < rules.minLength.ruleValue) {
    return rules.minLength.message;
  } else if (rules.maxLength && value.length > rules.maxLength.ruleValue) {
    return rules.maxLength.message;
  } else if (rules.pattern && !rules.pattern.ruleValue.test(value)) {
    return rules.pattern.message;
  }

  return null;
};
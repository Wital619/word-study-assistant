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

export const getRandomIndex = keys => keys[Math.floor(Math.random() * keys.length)];
export const getThreeRandomIndexes = keys => {
  const newKeys = [];

  while (newKeys.length < 3) {
    const randKey = keys[Math.floor(Math.random() * keys.length)];

    if (!newKeys.includes(randKey)) {
      newKeys.push(randKey);
    }
  }

  return newKeys;
};

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

export const getRandomArrayElem = keys =>
  keys[Math.floor(Math.random() * keys.length)];

export const getThreeRandomArrayElems = array => {
  const newKeys = [];

  while (newKeys.length < 3) {
    const randKey = array[Math.floor(Math.random() * array.length)];

    if (!newKeys.includes(randKey)) {
      newKeys.push(randKey);
    }
  }

  return newKeys;
};

export const getRandomNumberByRange = (min, max) => {
  return Math.round(min + Math.random() * (max - min));
};

export const localStorageFactory = () => ({
  get: function(key, withJSON = false) {
    return withJSON
      ? JSON.parse(localStorage.getItem(key))
      : localStorage.getItem(key);
  },
  set: function(key, value, withJSON = false) {
    if (withJSON) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  copyAndGet: function(from, to, withJSON) {
    const fromStorageData = this.get(from);
    this.set(to, fromStorageData);

    return withJSON ? JSON.parse(fromStorageData) : fromStorageData;
  }
});

export const getDateByAmountOfTime = seconds => {
  return new Date(new Date().getTime() + seconds * 1000);
};

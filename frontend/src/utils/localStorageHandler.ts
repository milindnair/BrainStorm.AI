export const localStorageHandler = async (data:any) => {
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const value = data[key];
          localStorage.setItem(key, JSON.stringify(value));
        }
      }
};


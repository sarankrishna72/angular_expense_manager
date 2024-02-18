 export const base64Encode = (text) => {
  const base64data = btoa(text);
  return base64data;
};

export const base64Decode = (base64data) => {
  const input = atob(base64data)
  return input;
};

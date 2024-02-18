 export const base64Encode = (text: string) => {
  const base64data = btoa(text);
  return base64data;
};

export const base64Decode = (base64data: string) => {
  const input = atob(base64data)
  return input;
};

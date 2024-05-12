export const Validation = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S+]{8,}$/,
  username: /^[a-zA-Z]+$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
};

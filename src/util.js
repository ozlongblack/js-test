export const generateKey = () => {
  return new Date().valueOf().toString();
};

export const appEvent = (name, detail, bubbles = false) => new CustomEvent(name, { bubbles, detail });

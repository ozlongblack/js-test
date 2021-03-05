import { appEvent } from './util.js';

const store = (componentRoot) => {
  let _todoItems = new Map();

  const dispatchEvent = (name, detail) => {
    const event = appEvent(`store:${name}`, detail);
    componentRoot.dispatchEvent(event);
  }

  const get = (index) => {
    const response = index ? _todoItems.get(index) : _todoItems;
    dispatchEvent('get', response);

    return response;
  }

  const values = () => {
    return _todoItems.values();
  }

  const set = (index, value) => {
    const response = _todoItems.set(index, value);
    dispatchEvent('set', response);

    return response;
  }

  const remove = (index) => {
    const response = _todoItems.delete(index);
    dispatchEvent('remove', response);

    return response;
  }

  return {
    get,
    set,
    remove,
    values,
  };
}

export default store;
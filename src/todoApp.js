import { generateKey } from './util.js';

export const componentRoot = document.querySelector('.todoapp');

const todoApp = (store, todoInput, todoList, todoStatus) => {
  
  const _filterStatusPredicate = {
    //TODO sync with todoStatus.js/filters
    all: () => true,
    completed: ({ status }) => status === 'completed',
    active: ({ status }) => status === '',
  };

  const _createTodoItem = (content, status) => {
    const todoItem = {
      index: generateKey(),
      content,
      status,
    };
    return todoItem;
  };

  const addTodoItem = (content, status = '') => {
    const todoItem = _createTodoItem(content, status);
    store.set(todoItem.index, todoItem);
    todoListHandler.addItem(todoItem);
  };

  const removeTodoItem = ({ index }) => {
    store.delete(index);
  };

  const updateTodoItem = ({ index, content, status }) => {
    const todoItem = store.get(index);
    const updatedItem = {
      ...todoItem,
      content,
      status: status ?? '',
    };

    store.set(updatedItem.index, updatedItem);
  };

  const setFilter = (filterType) => {
    const filteredItems = Array.from(store.values()).filter(
      _filterStatusPredicate[filterType]
    );

    todoListHandler.refresh(filteredItems);
    todoStatusHandler.updateCount(filteredItems.length);
  };

  const todoInputHandler = todoInput(addTodoItem);
  const todoListHandler = todoList(updateTodoItem, removeTodoItem);
  const todoStatusHandler = todoStatus(setFilter);

  const init = () => {
    todoListHandler.refresh(Array.from(store.values()));
    todoInputHandler.focus();

    componentRoot.addEventListener('store:get', event => todoStatusHandler.updateCount(event.detail.size));
    componentRoot.addEventListener('store:set', event => todoStatusHandler.updateCount(event.detail.size));
    componentRoot.addEventListener('store:delete', event => todoStatusHandler.updateCount(event.detail.size));
  };

  return {
    init,
  };
};

export default todoApp;

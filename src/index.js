import store from './store.js';
import todoApp, { componentRoot } from './todoApp.js';
import todoList from './todoList.js';
import todoStatus from './todoStatus.js';
import todoInput from './todoInput.js';

todoApp(store(componentRoot), todoInput, todoList, todoStatus).init();

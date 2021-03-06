export const filters = ['all', 'active', 'completed'];

const todoStatus = (setFilter) => {
  const $filter = document.querySelector('ul.filters');
  const $spanCount = document.querySelector('.todo-count > strong');

  const _selectFilter = ({ target }) => {
    const filterType = target.classList[0];
    if (filters.indexOf(filterType) === -1) {
      return;
    }
    $filter.querySelector('a.selected').classList.remove('selected');

    target.classList.add('selected');
    setFilter(filterType);
  };

  $filter.addEventListener('click', _selectFilter);

  const updateCount = (size) => {
    $spanCount.textContent = size;
  };

  return ({
    updateCount
  });
};

export default todoStatus;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import SearchPanel from './components/search-panel';
import AppHeader from './components/app-header';
import TodoList from './components/todo-list';
import ItemStatusFilter from './components/item-status-filter';
import Footer from './components/footer';


class App extends React.Component {

  maxId = 20;

  state = {todoData : [this.createToDoItem('Item1'),
                      this.createToDoItem('Item2'),
                      this.createToDoItem('Item3')],
          term : '',
          filter : 'all'
                  };

  deleteItem = (id) => {
    this.setState(
      ({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const arr = [...todoData.slice(0, idx),...todoData.slice(idx+1)];

        return {
          todoData: arr
        };
      }
    )
  };

  addItem = (text) => {
    const newItem = this.createToDoItem(text);
    this.setState(
       ({todoData}) => {
         const arr = [...todoData, newItem];

         return {
           todoData: arr
         };
       });
  };

  createToDoItem(label){
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId += 1
    };
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const oldItem = todoData[idx];
        const newItem = {...oldItem, important: !oldItem.important};

        const arr = [...todoData.slice(0,idx), newItem, ...todoData.slice(idx+1)];

        return{
          todoData: arr
        }
    }
  )
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const oldItem = todoData[idx];
        const newItem = {...oldItem, done: !oldItem.done};

        const arr = [...todoData.slice(0,idx), newItem, ...todoData.slice(idx+1)];

        return{
          todoData: arr
        }
    }
  )};

  search(items, term){
    if(term.length === 0){
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter){
    switch(filter){
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onSearchChange = (term) => {
    this.setState({term});
  }

  onFilterChange = (filter) => {
    this.setState({filter});
  }

  render(){

    const visibleItems = this.filter(this.search(this.state.todoData, this.state.term), this.state.filter);
    const doneCount = this.state.todoData.filter((el)=>el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return(
      <div className='todo-app'>
      <AppHeader toDo={todoCount} done={doneCount}/>
      <div className='top-panel d-flex'>
      <SearchPanel onSearchChange={this.onSearchChange}/>
      <ItemStatusFilter filter={this.state.filter} onFilterChange = {this.onFilterChange}/>
      </div>
      <TodoList todoData={visibleItems}
                onDeleted={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
                />
      <Footer addItem={this.addItem}/>
    </div>
  )
};
}


ReactDOM.render(<App/>, document.getElementById('root'));

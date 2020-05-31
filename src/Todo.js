import React, {Component} from 'react';
import Header from '../src/Header';
import Title from './Title';
import './Todo.css';


export default class Todo extends Component {
  constructor (props) {
    super (props);
    this.state = {
      items: [{text: 'do things', key: Date.now ()}],
      input: '',
      placeholder: 'enter task',
      doneItems: [{text: 'do things', key: Date.now ()}],
    };
  }
  componentDidMount () {
    let items = JSON.parse (localStorage.getItem ('items'));
    items
      ? this.setState ({items: items})
      : this.setState ({items: [{text: 'do things', key: Date.now ()}]});
    let doneItems = JSON.parse (localStorage.getItem ('doneItems'));
    doneItems
        ? this.setState ({doneItems: doneItems})
        : this.setState ({doneItems: [{text: 'do things', key: Date.now ()}]});  
  }
  
  handleChange = e => {
    this.setState ({input: e.target.value});
  };

  add = () => {
    let text = !this.state.input.length ? 'attention input vide' : 'enter task';
    this.setState ({placeholder: text});
    if (!this.state.input.length) {
      return;
    }
    let newItem = {text: this.state.input, key: Date.now ()};
    this.setState (state => ({
      items: [newItem].concat (this.state.items),
      input: '',
    }));
    localStorage.setItem (
      'items',
      JSON.stringify ([newItem].concat (this.state.items))
    );
  };

  delete = key => {
    let filtered = this.state.items.filter (item => {
      if (key !== item.key) {
        return item;
      }
    });
    this.setState ({
      items: filtered,
    });
    localStorage.setItem ('items', JSON.stringify (filtered));
  }

  remove = key => {
      let filteredDone = this.state.doneItems.filter (item => {
      if (key !== item.key) {
        return item;
      }
    });
    this.setState ({
      doneItems: filteredDone,
    });

    localStorage.setItem ('doneItems', JSON.stringify (filteredDone));
  };




  setDone = key  => {
    let done = this.state.items.find(item => item.key === key)
    this.setState ({
      doneItems: [done].concat(this.state.doneItems),
    })
    localStorage.setItem('doneItems', JSON.stringify([done].concat(this.state.doneItems)))
  }

  
  render () {
    console.log('doneItems', this.state.doneItems)
    console.log('items', this.state.items)
    return (
      <div id="container">
        <div className="todoListMain">
          <Title />
          <div className="header">
            <Header
              change={this.handleChange}
              add={this.add}
              input={this.state.input}
              placeholder={this.state.placeholder}
            />
            <div className="list-section">
              <ul className="theList">
                <h2>To do :</h2>
                {this.state.items.map (item => {
                  return (
                    <div className="list-item">
                      <li key={item.key} className="li-item">
                        {item.text}
                        <button
                          type="button"
                          id="done-btn"
                          class="btn btn-success bg-light"
                          onClick={(e) => {this.delete (item.key) ; this.setDone(item.key)}}
                        >
                          <svg
                            classname="validate-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            {' '}
                            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                            {' '}
                          </svg>
                        </button>
                      </li>
                      <p
                        type="button"
                        id="delete-btn"
                        class="btn"
                        onClick={() => this.delete(item.key)}
                      >
                        <i class="fa fa-times" />
                        x
                      </p>
                    </div>
                  );
                })}
              </ul>
            </div>
        
            <div className="list-section done-list">
              <ul className="theList">
                <h2>Done :</h2>
                {this.state.doneItems.map (doneItem => {
                  return (
                    <div className="list-item">

                      <li key={doneItem.key} className="li-item">
                          <svg
                            classname="validate-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            {' '}
                            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                            {' '}
                          </svg>
                        {doneItem.text}
                      </li>
                      <p
                        type="button"
                        id="delete-btn"
                        class="btn"
                        onClick={(e) => this.remove (doneItem.key)}
                      >
                        <i class="fa fa-times" />
                        x
                      </p>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

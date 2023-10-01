import { useEffect, useState } from 'react';
import groceryCartImg from './assets/grocery-cart.png';
import './App.css';

function App() {
  const [itemInput, setItemInput] = useState('');
  const [itemsList, setItemsList] = useState([]);
  const [isListCompleted, setIsListCompleted] = useState(false);

  function handleItemInputChange(e) {
    setItemInput(e.target.value);
  }

  function addGroceryItem(e) {
    if (e.key === 'Enter') {
      if (itemInput) {
        const updatedList = [...itemsList];
        const itemIndex = updatedList.findIndex(
          (item) => item.name.toLowerCase() === itemInput.toLowerCase()
        );
        if (itemIndex === -1) {
          updatedList.push({
            quantity: 1,
            name: itemInput,
            completed: false
          });
        } else {
          updatedList[itemIndex].quantity++;
        }
        setItemsList(updatedList);
        setItemInput('');
      }
    }
  }

  const renderItemList = () => {
    return itemsList.map((item, index) => (
      <li key={item.name}>
        <div className="container">
          <input
            type="checkbox"
            onChange={(e) => {
              toggleCompleteStatus(index, e.target.checked);
            }}
            value={item.completed}
            checked={item.completed}
          />
          <p>
            {`${item.name} `}
            {item.quantity > 1 && <span>x{item.quantity}</span>}
          </p>
        </div>
        <div>
          <button className="remove-button" onClick={removeItem(item.name)}>
            X
          </button>
        </div>
      </li>
    ));
  };

  function removeItem(name) {
    return function () {
      const updatedList = itemsList.filter((item) => item.name !== name);
      setItemsList(updatedList);
    };
  }

  function toggleCompleteStatus(index, status) {
    const updatedList = [...itemsList];
    updatedList[index].completed = status;
    setItemsList(updatedList);
  }

  function selectAllItems() {
    setItemsList(
      itemsList.map((item) => {
        return {
          ...item,
          completed: true
        };
      })
    );
  }

  function selectNone() {
    setItemsList(
      itemsList.map((item) => {
        return {
          ...item,
          completed: false
        };
      })
    );
  }

  function determineListCompletionStatus() {
    if (!itemsList.length) {
      return setIsListCompleted(false);
    }
    for (const item of itemsList) {
      if (!item.completed) {
        return setIsListCompleted(false);
      }
    }
    return setIsListCompleted(true);
  }

  useEffect(determineListCompletionStatus, [itemsList]);

  return (
    <main className="app">
      <div>
        <div>
          {isListCompleted && <h4 className="success">List Complete!</h4>}
          <div className="header">
            <h1>Shopping List</h1>
            <img src={groceryCartImg} />
            <input
              type="text"
              placeholder="Add an item"
              className="item-input"
              value={itemInput}
              onChange={handleItemInputChange}
              onKeyDown={addGroceryItem}
            />
          </div>
        </div>
        <ul>{renderItemList()}</ul>
        {itemsList.length ? (
          <div className="select-btns">
            <button onClick={selectAllItems}>Select All</button>
            <button onClick={selectNone}>Select None</button>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default App;

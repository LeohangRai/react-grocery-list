import { useState } from 'react';
import './App.css';
import groceryCartImg from './assets/grocery-cart.png';

function App() {
  const [itemInput, setItemInput] = useState('');
  const [itemsList, setItemsList] = useState([]);

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
    return itemsList.map((item) => (
      <li key={item.name}>
        <div className="container">
          <input type="checkbox" />
          <p>
            {`${item.name} `}
            {item.quantity > 1 && <span>x{item.quantity}</span>}
          </p>
        </div>
        <div>
          <button className="remove-button">X</button>
        </div>
      </li>
    ));
  };

  return (
    <main className="app">
      <div>
        <div>
          <h4 className="success">List Complete!</h4>
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
      </div>
    </main>
  );
}

export default App;

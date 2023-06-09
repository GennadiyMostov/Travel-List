import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const Logo = () => {
  return <h1>🧳 Far Away 🌴</h1>;
};

const Form = ({ onAddItem }) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!description) {
      return;
    }

    const newItem = { description, quantity, packed: false, id: uuid() };

    console.log(newItem);

    onAddItem(newItem);

    setDescription('');
    setQuantity(1);
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3> What do you need for your 😌 trip </h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={(event) => setDescription(event.target.value)}></input>
      <button>Add</button>
    </form>
  );
};

const Item = ({ item, onDeleteItem, onToggleItems }) => {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => {
          onToggleItems(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

const PackingList = ({ items, onDeleteItem, onToggleItems }) => {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
    </div>
  );
};

const Stats = () => {
  return (
    <footer className='stats'>
      <em> 💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
};

const App = () => {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const handleToggleItem = (id) => {
    setItems((currentItems) => {
      return currentItems.map((item) => {
        return item.id === id ? { ...item, packed: !item.packed } : item;
      });
    });
  };

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
      />
      <Stats />
    </div>
  );
};

export default App;

import { useState } from 'react';
import Logo from './Components/Logo';
import Form from './Components/Form';
import PackingList from './Components/PackingList';
import Stats from './Components/Stats';

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

  const handleClearList = () => {
    const confirmed = window.confirm(
      'Are You Sure You Want To Delete All Items?'
    );

    if (confirmed) {
      setItems([]);
    }
  };

  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onClearList={handleClearList}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;

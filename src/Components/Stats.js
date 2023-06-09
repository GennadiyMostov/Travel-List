const Stats = ({ items }) => {
  if (!items.length) {
    return (
      <p className='stats'>
        <em>Start Adding Some Items To Your Packing List! 🚀</em>
      </p>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => {
    return item.packed;
  }).length;
  const percentagePacked = Math.round((numPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentagePacked === 100
          ? 'You got everything! Ready to go! ✈️'
          : `💼 You Have ${numItems} ${
              numItems === 1 ? 'Item' : 'Items'
            } In Your List, You Have Packed ${numPacked} Items.
        (${percentagePacked}%)`}
      </em>
    </footer>
  );
};

export default Stats;

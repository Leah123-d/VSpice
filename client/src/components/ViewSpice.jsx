function ViewSpice({ viewSpice }) {
  console.log('in view spice component', viewSpice)

  return (
    <div>
      {viewSpice && viewSpice.map(spice => 
        <ul key={spice.id}>
          <li>{spice.name}</li>
          <li>{spice.brand}</li>
        </ul>
      )}
      
    </div>
  );
}

export default ViewSpice;

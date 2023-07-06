import { useState } from 'react';
import './styles.css';

const options = [
  'Dissatisfied (0%)', 
  'It was okay (5%)', 
  'It was good (10%)', 
  'Absolutely amazing! (20%)'
];

export default function App() {
return (
  <div>
    <TipCalculator />
  </div>
);
}

function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState('0');
  const [friendTip, setFriendTip] = useState('0');
  
  const percentTip = Number(tip.match(/\d+/)[0]);
  const percentFriendTip = Number(friendTip.match(/\d+/)[0]); 
  
  function handleReset(e) {
    e.preventDefault();
    
    setBill('');
    setTip('0');
    setFriendTip('0');
  }
  
  return (
    <div className='calc-container'>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage tip={tip} onSetTip={setTip}><span>How did you like the service?</span></SelectPercentage>
      <SelectPercentage tip={friendTip} onSetTip={setFriendTip}><span>How did your friend like the service?</span></SelectPercentage>
      
      {bill > 0 && (
        <>
        <Output bill={bill} percentTip={percentTip} percentFriendTip={percentFriendTip} />  
      <ButtonReset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({bill, onSetBill}) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input type='text' value={bill} onChange={(e) => onSetBill(Number(e.target.value))} placeholder='Bill value' />
    </div>
  );
}

function SelectPercentage({tip, onSetTip, children}) {
  return (
    <div>
        <span>{children}</span>
        <select value={tip} onChange={(e) => onSetTip(e.target.value)}>
        {options.map(option => (
          <option value={option} key={option}>{option}</option>
        ))}
        </select>
      </div>
  );
}

function Output({bill, percentTip, percentFriendTip}) {
  const avgTip = bill*(((percentTip + percentFriendTip)/2)/100);

  return <h2 className='calc-payment'>{`You pay $${bill + avgTip}($${bill} + $${avgTip} tip)`}</h2>;
}

function ButtonReset({onReset}) {
  return <button className='btn-reset' onClick={onReset}>Reset</button>;
}
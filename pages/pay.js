import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useSendTransaction } from "@usedapp/core";

const Pay = () => {
  // hooks
  const [amount, setAmount] = useState('0.00');
  const [fromAddr, setFromAddr] = useState('0x');
  const [toAddr, setToAddr] = useState('0x');
  const { sendTransaction, state } = useSendTransaction();

  useEffect(() => {
    // Status: None Mining Success Fail Exception
    if (state.status != 'Mining') {
      setAmount('0.00')
      setFromAddr('0x');
      setToAddr('0x');
    }
  }, [state]);  

  // functions
  const handleSend = () => {
    const value = ethers.utils.parseUnits(amount, 'ether');
    console.log('sending amount:', amount, value, fromAddr, toAddr);
    sendTransaction({ 'from': fromAddr, 'to': toAddr, value })
  };

  // logs
  console.log('transaction state:', state);
  // render out
  return (
    <div className="flex content-center items-center justify-center">
      <a href="#" className="w-60 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Send Money
        </h5>

        <form>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Amount
              </label>
              <input type="text" 
                id="small-input"
                value={amount}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => setAmount(e.target.value)} 
              />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                From
              </label>
              <input type="text" 
                id="small-input"
                value={fromAddr}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => setFromAddr(e.target.value)} 
              />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                To
              </label>
              <input type="text" 
                id="small-input"
                value={toAddr}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => setToAddr(e.target.value)} 
              />
          </div>
          <button type="submit" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSend}>
            Send
          </button>
        </form>

      </a> 
    </div>
  );
}

export default Pay;

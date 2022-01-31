import React, { useState } from 'react';

import { ErrorMessage } from '../components/ErrorMessage';
import { SuccessMessage } from '../components/SuccessMessage';
import { verifyMessage, getAuthKey } from '../utils/auth';
import { getItem } from '../utils/storage';

const Verify = () => {
  // hooks
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [signer, setSigner] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // functions
  const handleVerify = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    const isValid = await verifyMessage({message, signer, signature});

    if (isValid) {
      setSuccess("Signature is valid!");
    } else {
      setError("Invalid signature");
    } 
  };

  const handleVerifyAuthData = async (e) => {
    e.preventDefault();
    console.log('--- handleVerifyAuthData');

    const key = getAuthKey('swc');
    const item = getItem(key);

		const resp = await fetch('/api/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},      
      body: JSON.stringify(item),
		});
    const data = await resp.json();
    console.log('data: ', data);
  };

  // render out
  return (
    <form className="flex content-center items-center justify-center m-4" onSubmit={handleVerify}>
      <div className="w-1/2 shadow-lg mx-auto rounded-lg bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Verify messages
          </h1>
          <div className="my-3">
            <textarea
              required
              value={message}
              className="w-full h-24 border-2 focus:ring focus:outline-none"
              placeholder="Message"
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <div className="my-3">
            <textarea
              required
              value={signature}
              className="w-full h-24 border-2 focus:ring focus:outline-none"
              placeholder="Signature"
              onChange={e => setSignature(e.target.value)}
            />
          </div>
          <div className="my-3">
            <input
              required
              type="text"
              value={signer}
              className="w-full border-2 focus:ring focus:outline-none"
              placeholder="Signer address"
              onChange={e => setSigner(e.target.value)}
            />            
          </div>
        </main>
        <div className="p-4">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Verify message
          </button>
          <button
            type="button"
            className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleVerifyAuthData}
          >
            Verify stored authData
          </button>
          <ErrorMessage message={error} />
          <SuccessMessage message={success} />
        </div>
      </div>
    </form>
  );
}; 


export default Verify;

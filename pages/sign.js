import React, { useState } from 'react';
import { useEthers } from "@usedapp/core";

import { ErrorMessage } from '../components/ErrorMessage';
import { signMessage } from '../utils/auth';

const Sign = () => {
  // hooks
  const { library: connection } = useEthers();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [signatures, setSignatures] = useState([]);

  // functions
  const handleSign = async (e) => {
    e.preventDefault();

    // reset error
    setError('');
    const sig = await signMessage({message, connection});
    console.log(sig);
    if(sig.success) {
      setSignatures([...signatures, sig]);
    } else {
      setError(sig.error);
    }
  }; 
  
  // render out
  return (
    <form className="flex content-center items-center justify-center m-4" onSubmit={handleSign}>
      <div className="w-1/2 shadow-lg mx-auto rounded-lg bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Sign messages
          </h1>
          <div className="">
            <div className="my-3">
              <textarea
                required
                value={message}
                className="w-full h-24 border-2 focus:ring focus:outline-none"
                placeholder="Message"
                onChange={e => setMessage(e.target.value)}
              />
            </div>
          </div>
        </main>
        <div className="p-4">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign message
          </button>
          <ErrorMessage message={error} />
        </div>
        {signatures.map((sig, idx) => {
          return (
            <div className="p-2" key={sig}>
              <div className="my-3">
                <p>
                  Message {idx + 1}: {sig.message}
                </p>
                <p>Signer: {sig.address}</p>
                <p>Signature: {sig.signature}</p>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}; 


export default Sign;

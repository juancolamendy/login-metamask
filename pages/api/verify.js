import { verifyMessage } from '../../utils/web3auth';

export default async function handler(req, res) {
  const { authData } = req.body;
  console.log('/api/verify - authData:', authData);
  let isValid = false;
  if(authData){
    isValid = await verifyMessage({
      message: authData.message,
      signer: authData.address,
      signature: authData.signature
    });
  }
  res.status(200).json({ verify: isValid })
}

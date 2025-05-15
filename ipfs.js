// ipfs.js
import { create } from 'ipfs-http-client';

const ipfs = create({
  host: 'ipfs.infura.io', // or use localhost if you're running your own node
  port: 5001,
  protocol: 'https',
});

export async function uploadToIPFS(data) {
  const result = await ipfs.add(JSON.stringify(data));
  return result.path; // This is the IPFS hash
}

export async function getFromIPFS(hash) {
  const stream = ipfs.cat(hash);
  let data = '';

  for await (const chunk of stream) {
    data += chunk.toString();
  }

  return JSON.parse(data);
}

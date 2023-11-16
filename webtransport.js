let transport = new WebTransport('https://localhost:4433/wt');
await transport.ready;

let stream = await transport.createBidirectionalStream();
let reader = stream.readable.getReader();
let writer = stream.writable.getWriter();

await writer.write(new Uint8Array([65, 66, 67]));
let received = await reader.read();
await transport.close();

console.log('received', received);

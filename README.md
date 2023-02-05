# CA-react-test

### Install:
`npm i`

#### Run/Compile:
`npm start` 
- this will run both the `server` and `client`. 
- __server__ - http://localhost:8282/
- __client__ - http://localhost:3000/

#### Server:

Set up using Express and Socket.io as core stack. Server has events on `subscribe` and `unsubscribe` which runs and stops a timer to invoke `items` update.

#### Client:
Subscribe to the socket.io to make an initial handshake and then `subscibe` and unsubscibe` to the events fired by the server. 
- The server updates all the items with new price and random date
- The UI flashes red for a negative update (lower than previous amount) and positive for higher amount


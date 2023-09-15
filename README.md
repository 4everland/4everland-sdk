# 4everland-sdk

## Install

```shell

npm i 4everland-sdk

yarn add 4everland-sdk

```

**Esmodule**

```js
import { Client } from '4everland-sdk'

const client = new Client({
  authServiceUrl: '',
  pinningServiceUrl: '',
  endpoint: '',
  storageType: 'IPFS'
})
let address = '' // metamask address

const signMessage = await client.getSignText(address)

// Use signMessage for signing
// ....

// Verification signature
// if expiration expired, you need Verification signature again
const { expiration } = await client.verifySign(address, signature)

// upload
const task = client.upload({
  Key: file.name,
  Body: file,
  ContentType: file.type
})
task.progress((e) => {
  // loaded , total
})
const { cid } = await task.done()

const { requestid } = await client.addPin({
  cid
})
// specified pin
await clinet.getPin(requestid)

// pin list
await clinet.listPin()
```

**CommonJs**

```js
const { Client } = require('4everland-sdk')
```

**Browser**

```js
<script src="../dist/4everland-sdk.umd.min.js"></script>

<script>

  const { Client } = Clientland

</script>



```

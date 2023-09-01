# 4everland-sdk

## Install

```shell

npm i 4everland-sdk

yarn add 4everland-sdk

```

**Esmodule**

```js
import { Forever } from '4everland-sdk'

const client = new Forever({
  authServiceUrl: '',
  pinningServiceUrl: '',
  endpoint: '',
  storageType: 'IPFS'
})
let address = '' // metamask address

const signMessage = await client.getSignMessage(address)

// Use signMessage for signing
// ....

// Verification signature
// if expiration expired, you need Verification signature again
const { expiration } = await client.validSign(address, signature)

// upload
const task = client.upload({
  Key: file.name,
  Body: file,
  ContentType: file.type
})
task.progress((e) => {
  // loaded , total
})
await task.done()
```

**CommonJs**

```js
const { Forever } = require('4everland-sdk')
```

**Browser**

```js
<script src="../dist/4everland-sdk.umd.min.js"></script>

<script>

  const { Forever } = foreverland

</script>



```

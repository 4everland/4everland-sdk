# Install

```shell

npm i @4everland/upload-pin

yarn add @4everland/upload-pin

```

**Esmodule**

```js
import { AuthClient, BucketClient, PinningClient } from '@4everland/upload-pin'

const authClient = new AuthClient(AUTH_URL)
let address = '' // metamask address

const signMessage = await authClient.getSignText(address)

// Use signMessage for signing
// ....

// Verification signature
// if expiration expired, you need Verification signature again
const authInfo = await authClient.verifySign(address, signature)

const bucketClient = new BucketClient({
  accessKeyId: authInfo.accessKeyId,
  secretAccessKey: authInfo.secretAccessKey,
  sessionToken: authInfo.sessionToken,
  endpoint: ENDPOINT_URL
})

const pinningClient = new PinningClient({
  baseURL: PINNING_URL,
  accessToken: authInfo.token
})
// upload
const task = bucketClient.upload({
  Key: file.name,
  Body: file,
  ContentType: file.type
})
task.progress((e) => {
  // loaded , total
})
const { cid } = await task.done()

const { requestid } = await pinningClient.addPin({
  cid
})
// specified pin
const result = await pinningClient.getPin(requestid)

// pin list
const pinList = await pinningClient.listPin()
```

**CommonJs**

```js
const { AuthClient, BucketClient, PinningClient } = require('@4everland/upload-pin')
```

**Browser**

```js
<script src="../dist/uploadPin.umd.min.js"></script>

<script>

  const { AuthClient, BucketClient, PinningClient } = uploadPin

</script>



```

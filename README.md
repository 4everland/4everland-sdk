# Install

```shell

npm i @4everland/upload-pin

yarn add @4everland/upload-pin

```

## ESModule

```js
import { AuthClient, BucketClient, PinningClient } from '@4everland/upload-pin'

// create Auth Client
const authClient = new AuthClient(AUTH_URL)
let address = '' // metamask address

const signMessage = await authClient.getSignText(address)
// Use signMessage for signing
// ....

// Verification signature
// if expiration expired, you need Verification signature again
const { accessKeyId, secretAccessKey, sessionToken } = await authClient.verifySign(
  address,
  signature
)

// Create Bucket Client
const bucketClient = new BucketClient({
  accessKeyId,
  secretAccessKey,
  sessionToken,
  endpoint: ENDPOINT_URL
})

// Create Pinning Client
const pinningClient = new PinningClient({
  baseURL: PINNING_URL,
  accessToken: authInfo.token
})
// Upload File
const task = bucketClient.upload({
  Key: file.name,
  Body: file,
  ContentType: file.type
})
// Upload Progress
task.progress((e) => {
  // e.loaded , e.total
})

const { cid } = await task.done()

// pin cid
const { requestid } = await pinningClient.addPin({
  cid
})
// specified pin
const result = await pinningClient.getPin(requestid)

// pin list
const pinList = await pinningClient.listPin()
```

## CommonJs

```js
const { AuthClient, BucketClient, PinningClient } = require('@4everland/upload-pin')
```

## Browser

```js
<script src="../dist/uploadPin.umd.min.js"></script>
<script>
  const { AuthClient, BucketClient, PinningClient } = uploadPin
</script>
```

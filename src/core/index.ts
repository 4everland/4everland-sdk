// import AuthService from './auth'
// import BucketService from './bucket'
// import { verifySignResult, ClientConfig, ClientUploadParams, PinParams, AddPinParams } from './type'
// import PinningService from './pinning'
// class Client {
//   auth: AuthService
//   bucket?: BucketService
//   verifySignResult?: verifySignResult
//   config: ClientConfig
//   pinningService?: PinningService
//   constructor(config: ClientConfig) {
//     this.config = config
//     this.auth = new AuthService(this.config.authServiceUrl)
//   }

//   getSignText(address: string) {
//     return this.auth.getSignText(address)
//   }
//   async verifySign(address: string, signature: string) {
//     return new Promise<{ expiration: number }>((resolve, reject) => {
//       this.auth
//         .verifySign<verifySignResult>(address, signature)
//         .then((res) => {
//           this.verifySignResult = res
//           const { accessKeyId, secretAccessKey, sessionToken, token } = this.verifySignResult
//           this.bucket = new BucketService(
//             {
//               accessKeyId,
//               secretAccessKey,
//               sessionToken
//             },
//             this.config.endpoint
//           )
//           this.pinningService = new PinningService(this.config.pinningServiceUrl, token)

//           resolve({
//             expiration: this.verifySignResult.expiration
//           })
//         })
//         .catch(reject)
//     })
//   }
//   upload(params: ClientUploadParams) {
//     if (!this.verifySignResult || !this.bucket) {
//       throw new Error('execution error')
//     }
//     return this.bucket.uploadObject({
//       ...params,
//       Bucket: this.verifySignResult.accessBucket,
//       Key: this.verifySignResult.folderPath
//         ? this.verifySignResult.folderPath + '/' + params.Key
//         : params.Key
//     })
//   }
//   addPin(addPin: AddPinParams) {
//     if (!this.verifySignResult || !this.pinningService) {
//       throw new Error('execution error')
//     }
//     return this.pinningService.addPin(addPin)
//   }
//   getPin(requestid: string) {
//     if (!this.verifySignResult || !this.pinningService) {
//       throw new Error('execution error')
//     }
//     return this.pinningService.getPin(requestid)
//   }
//   listPin(params: PinParams) {
//     if (!this.verifySignResult || !this.pinningService) {
//       throw new Error('execution error')
//     }
//     return this.pinningService.listPin(params)
//   }
// }

// export default Client

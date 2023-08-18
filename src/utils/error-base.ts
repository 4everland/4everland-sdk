export class ErrorBase<T extends string> extends Error {
  name: T
  code: number
  message: string
  constructor(name: T, code: number, message: string) {
    super()
    this.name = name
    this.code = code
    this.message = message
  }
}

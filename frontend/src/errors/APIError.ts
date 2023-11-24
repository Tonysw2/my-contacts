export class APIError extends Error {
  response: Response
  body: any

  constructor(response: Response, body: any) {
    super()

    this.body = body
    this.name = 'APIError'
    this.response = response
    this.message = body?.error || `${response.status} - ${response.statusText}`
  }

  getContentType() {
    return this.response.headers.get('Content-Type')
  }
}

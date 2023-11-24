import { APIError } from '../../errors/APIError'
import { delay } from '../../utils/delay'

export class HttpClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get(path: string) {
    await delay(500)

    const res = await fetch(`${this.baseUrl}${path}`)

    let body = null
    const contentType = res.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      body = await res.json()
    }

    if (res.ok) {
      return body
    }

    throw new APIError(res, body)
  }
}

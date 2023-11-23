import { delay } from '../../utils/delay'

export class HttpClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get(path: string) {
    const res = await fetch(`${this.baseUrl}${path}`)
    await delay(500)
    return res.json()
  }
}

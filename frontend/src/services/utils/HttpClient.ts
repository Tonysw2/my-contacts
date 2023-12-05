import { APIError } from '../../errors/APIError'

type HttpClientParams = {
  path: string
  options?: RequestInit
}

export class HttpClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async makeRequest({
    path,
    options,
  }: {
    path: string
    options: RequestInit
  }) {
    const headers = new Headers()

    if (options.body) {
      headers.append('Content-Type', 'application/json')
    }

    if (options.headers && typeof options.headers === 'object') {
      Object.entries(options.headers).forEach(([name, value]) =>
        headers.append(name, value),
      )
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    })

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

  get({ path, options }: HttpClientParams) {
    return this.makeRequest({
      path,
      options: { method: 'GET', ...options },
    })
  }

  post({ path, options }: HttpClientParams) {
    return this.makeRequest({ path, options: { method: 'POST', ...options } })
  }

  put({ path, options }: HttpClientParams) {
    return this.makeRequest({ path, options: { method: 'PUT', ...options } })
  }

  delete({ path, options }: HttpClientParams) {
    return this.makeRequest({ path, options: { method: 'DELETE', ...options } })
  }
}

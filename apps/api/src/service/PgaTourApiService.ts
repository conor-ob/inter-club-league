import fetch from 'sync-fetch'

export class PgaTourApiService {
  private uri: string
  private apiKey: string

  constructor(uri: string, apiKey: string) {
    this.uri = uri
    this.apiKey = apiKey
  }

  public post(data: string): any {
    const response = fetch(this.uri, {
      method: 'POST',
      body: data,
      headers: {
        'X-Api-Key': this.apiKey
      }
    })

    const json = response.json() as any
    return json.data
  }
}

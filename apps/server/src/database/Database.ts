import { idFromPath } from '@inter-club-league/utils'
import { sync } from 'globby'
import path from 'path'
import { FileReader } from './FileReader'

export class Database {
  private fileReader: FileReader

  constructor(fileReader: FileReader) {
    this.fileReader = fileReader
  }

  public getById<T>(table: string, id: string): T {
    const json = this.fileReader.readFile(`database/${table}/${id}.json`)
    return JSON.parse(json) as T
  }

  public getAll<T>(table: string): T[] {
    const paths = sync(path.resolve(process.cwd(), `database/${table}/*`))
    return paths.map((it) => {
      const json = this.fileReader.readFile(it)
      return JSON.parse(json) as T
    })
  }

  public get<T>(table: string, filter: (value: string) => boolean): T[] {
    const paths = sync(path.resolve(process.cwd(), `database/${table}/*`))
    return paths
      .filter((it) => filter(it))
      .map((it) => {
        const json = this.fileReader.readFile(it)
        return JSON.parse(json) as T
      })
  }

  public getAllIds(table: string): string[] {
    const paths = sync(path.resolve(process.cwd(), `database/${table}/*`))
    return paths.map((it) => idFromPath(it))
  }

  public getIds(table: string, filter: (value: string) => boolean): string[] {
    const paths = sync(path.resolve(process.cwd(), `database/${table}/*`))
    return paths.filter((it) => filter(it)).map((it) => idFromPath(it))
  }
}

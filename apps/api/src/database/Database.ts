import { sync } from 'globby'
import path from 'path'
import { seasonIdFromStageId, stageNumberFromStageId } from '../utils/ids'
import { FileReader } from './FileReader'
import { Table } from './Table'

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

  public get<T>(table: string, filter: (id: string) => boolean): T[] {
    const paths = sync(path.resolve(process.cwd(), `database/${table}/*`))
    return paths
      .filter((it) => filter(it))
      .map((it) => {
        const json = this.fileReader.readFile(it)
        return JSON.parse(json) as T
      })
  }

  public getCurrentSeasonId(): string {
    const stageIds = this.getAllIds(Table.STAGES).sort((a, b) => {
      const aSort =
        Number(stageNumberFromStageId(a)) < 10
          ? `${seasonIdFromStageId(a)}-0${stageNumberFromStageId(a)}`
          : a
      const bSort =
        Number(stageNumberFromStageId(b)) < 10
          ? `${seasonIdFromStageId(b)}-0${stageNumberFromStageId(b)}`
          : b
      return aSort.localeCompare(bSort)
    })
    return seasonIdFromStageId(stageIds[stageIds.length - 1]!) // TODO !
  }

  public getCurrentStageId(): string {
    const stageIds = this.getAllIds(Table.RESULTS).sort((a, b) => {
      const aSort =
        Number(stageNumberFromStageId(a)) < 10
          ? `${seasonIdFromStageId(a)}-0${stageNumberFromStageId(a)}`
          : a
      const bSort =
        Number(stageNumberFromStageId(b)) < 10
          ? `${seasonIdFromStageId(b)}-0${stageNumberFromStageId(b)}`
          : b
      return aSort.localeCompare(bSort)
    })
    return stageIds[stageIds.length - 1]! // TODO !
  }

  private getAllIds(table: string): string[] {
    const paths = sync(path.resolve(process.cwd(), `database/${table}/*`))
    return paths.map((it) =>
      it.substring(it.lastIndexOf('/') + 1, it.lastIndexOf('.'))
    )
  }
}

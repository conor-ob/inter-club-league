import _ from 'lodash'
import Papa from 'papaparse'
import { StageResultEntity } from './src/entity/StageResultEntity'

const csvString = ``

function convertCsvToJson() {
  const parseResult = Papa.parse<CsvRow>(csvString, {
    header: true,
    delimiter: ',',
    dynamicTyping: true,
    fastMode: true,
    transformHeader(header, _) {
      switch (header) {
        case 'Category':
        case 'Group':
          return 'category'
        case 'Club':
          return 'club'
        case 'Name':
          return 'name'
        default:
          return header
      }
    },
    transform(value, field) {
      switch (field) {
        case 'category':
          return parseCategory(value)
        case 'club':
          return parseClub(value)
        case 'name':
          return parseName(value)
        default:
          return value
      }
    }
  })

  if (parseResult.errors.length > 0) {
    throw new Error(
      `Errors while parsing. Make sure the \` characters are not on new lines: ${JSON.stringify(
        parseResult.errors,
        null,
        2
      )})`
    )
  } else {
    const data = parseResult.data
    const results: StageResultEntity[] = data.map((it) => {
      const seasonPoints = calculateSeasonPoints(it)
      const riderId = createId(it.name)
      return {
        categoryId: it.category,
        clubId: it.club,
        riderId: createId(it.name),
        riderInitials: createInitials(riderId),
        riderName: it.name,
        seasonPoints: seasonPoints,
        stagePoints: seasonPoints[seasonPoints.length - 1]!
      }
    })
    console.log(JSON.stringify(results))
  }
}

function calculateSeasonPoints(csvRow: CsvRow): number[] {
  const entries = Object.entries(csvRow)

  let numberOfStages = 0
  for (const entry of entries) {
    if (isStagePointsKey(entry[0])) {
      numberOfStages = numberOfStages + 1
    }
  }

  const seasonPoints = new Array(numberOfStages)
  for (const entry of entries) {
    const stringKey = entry[0]
    const stringValue = entry[1]
    if (isStagePointsKey(stringKey)) {
      const key = Number(stringKey)
      let points = 0
      if (stringValue !== null) {
        points = Number(stringValue)
      }
      seasonPoints[key - 1] = points
    }
  }
  return seasonPoints
}

function isStagePointsKey(key: string): boolean {
  return /^\d+$/.test(key)
}

function createId(value: string): string {
  return deburrString(value).replaceAll(/[^a-zA-Z0-9]/g, '-')
}

function deburrString(value: string): string {
  return _.deburr(value.toLowerCase().trim())
}

function createInitials(value: string): string {
  return value
    .split('-')
    .map((it) => it.substring(0, 1).toUpperCase())
    .join('')
}

function parseCategory(value: string): string {
  switch (value) {
    case 'S':
    case 'Scratch':
      return 'scratch'
    case 'SS':
    case 'Semi Scratch':
      return 'semi-scratch'
    case 'SL':
    case 'Semi Limit':
      return 'semi-limit'
    case 'L':
    case 'Limit':
      return 'limit'
    default:
      throw new Error(`Unknown value for category: ${value}`)
  }
}

function parseClub(value: string): string {
  switch (value) {
    case 'BWCC':
      return 'bwcc'
    case 'LCRC':
      return 'lcrc'
    case 'OWCC':
      return 'owcc'
    case 'SDCC':
      return 'sdcc'
    case 'STCC':
      return 'stcc'
    case 'STT':
      return 'stt'
    case 'UIRC':
      return 'uirc'
    default:
      throw new Error(`Unknown value for club: ${value}`)
  }
}

function parseName(value: string): string {
  return value
    .replaceAll(' Mac ', ' Mac')
    .replaceAll(' Mc ', ' Mc')
    .replaceAll(' O He', " O'hE")
    .replaceAll(' O ', " O'")
}

type CsvRow = {
  name: string
  category: string
  club: string
}

convertCsvToJson()

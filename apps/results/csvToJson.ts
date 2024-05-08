import _ from 'lodash'
import Papa from 'papaparse'
import { StageResultEntity } from '../server/src/entity/StageResultEntity'

// https://www.youpdf.com/pdf-to-excel.html

const csvString = `Club,Name,Group,1,2,3,4
Sundrive,George Sevastopulo,Semi Scratch,8,11,11,8
LCRC,Pierce O Leary,Scratch,10,10,8,9
STCC,Adam Greally,Scratch,7,11,10,5
STCC,Bryan Geary,Scratch,5,7,7,10
STCC,Terence Mc Cartan,Semi Limit,5,11,11,
Clondalkin CC,Daniel Mc Guinness,Semi Scratch,11,5,5,6
South Dublin,Brian Reynolds,Limit,5,5,11,5
LCRC,Adriaan Pretorius,Scratch,5,5,11,5
Orwell,Cesar Lopes,Semi Scratch,5,5,9,7
Orwell,Ilie Gabuja,Semi Limit,6,9,5,5
LCRC,Ed Kelly,Semi Scratch,11,9,,5
LCRC,Sean Oleary,Scratch,9,5,6,5
Orwell,Michael Hickey,Limit,5,9,10,
Clondalkin CC,Bob Hall,Scratch,5,5,9,5
LCRC,Ronan Conway,Semi Limit,8,,9,5
Blanch Wheelies,Oleksandr Konkolevsky,Limit,5,6,5,5
Orwell,Gavin Dodd,Semi Scratch,5,6,5,5
Orwell,Matthew Broadstock,Limit,5,10,,5
Usher IRC,Paul Needham,Limit,5,5,5,5
Orwell,Stephen O Shea,Limit,5,5,5,5
LCRC,Filippo Lin,Semi Limit,5,5,5,5
Orwell,Luke Keaney,Semi Limit,10,,5,5
Orwell,Owen O Flaherty,Semi Limit,5,10,5,
Orwell,Connor Fennell,Semi Scratch,5,5,5,5
Orwell,Dick  O Brien,Semi Scratch,5,5,5,5
Orwell,Harry Rochford,Semi Limit,,5,8,5
Blanch Wheelies,Brian Nolan,Limit,5,7,,5
Orwell,David Cahill,Semi Limit,9,8,,
Blanch Wheelies,Gareth Jones,Semi Limit,,7,5,5
Clondalkin CC,Brendan Ward,Semi Scratch,,7,5,5
Usher IRC,Samuel Curtis,Limit,,11,,5
Orwell,Cahir O Higgins,Scratch,6,5,5,
Blanch Wheelies,Kieran Sweeney,Semi Limit,5,6,,5
Orwell,Colum Bradley,Limit,5,5,,5
LCRC,Peter Gibbons,Limit,,5,5,5
Blanch Wheelies,Des,Scratch,,5,5,5
Orwell,Diarmuid Collins,Scratch,,5,5,5
LCRC,Mark Donnelly-Orr,Scratch,,10,,5
STCC,Martin Casey,Scratch,5,5,,5
LCRC,Pawel Rybak,Scratch,5,5,,5
Orwell,Alan O Dowd,Semi Limit,5,5,,5
Orwell,Daragh Boyd,Semi Limit,5,5,5,
LCRC,Eamon Quigley,Semi Limit,,5,5,5
STCC,Louis Twomey,Semi Limit,5,,5,5
LCRC,Anthony Dunne,Semi Scratch,,5,5,5
LCRC,Callum Byrne,Semi Scratch,5,5,,5
Sundrive,Colm Sevastopulo,Semi Scratch,5,5,5,
LCRC,John Mc Gettigan,Semi Scratch,5,5,,5
LCRC,Luke Keogh,Semi Scratch,,5,5,5
LCRC,Rob Jennings,Semi Scratch,5,5,,5
STCC,Robert Bowen,Semi Scratch,5,,5,5
LCRC,Clinton Slowey,Semi Limit,,,9,5
Orwell,Aimhirghin O Brannagain,Scratch,,9,,5
STCC,David Ryan,Scratch,5,8,,
Orwell,Alan Clarke,Semi Scratch,,8,,5
STCC,John Sheridan,Scratch,,6,5,
STCC,Abily Tudal,Limit,5,,,5
LCRC,Aishling Barry,Limit,,5,,5
STCC,Brendan Bonnie,Limit,,5,,5
Clondalkin CC,Brian  Stafford,Limit,,5,,5
STCC,Daragh O'Toole,Limit,,5,,5
Orwell,Hannah Roche,Limit,,,5,5
Blanch Wheelies,John Mc Auliffe,Limit,,5,,5
LCRC,Michael Leonard,Limit,,,5,5
Blanch Wheelies,Simon Crowe,Limit,,,5,5
LCRC,Andy Grehan,Semi Scratch,,,5,5
Sundrive,Sean Curtis,Scratch,,5,5,
STCC,Alan Dempsey,Semi Limit,5,,,5
Orwell,Andrew Lomax,Semi Limit,5,,,5
Orwell,Barry Fennell,Semi Limit,5,,,5
Clondalkin CC,Gareth Muldowney,Semi Limit,5,5,,
Orwell,Jim Carey,Semi Limit,5,,,5
LCRC,Joshua Chambers,Semi Limit,5,,,5
Clondalkin CC,Mark Dillon,Semi Limit,,5,,5
Blanch Wheelies,Mark O Connor,Semi Limit,,5,,5
LCRC,Martin Mc Namara,Semi Limit,,,5,5
LCRC,Matthew Broughton,Semi Limit,,,5,5
Orwell,Nigel Burke,Semi Limit,,,5,5
Orwell,Paul Kane,Semi Limit,5,5,,
Clondalkin CC,Peter Bates,Semi Limit,5,,,5
Orwell,Sean O Kane,Semi Limit,,,5,5
Clondalkin CC,Stephen Seagrave,Semi Limit,5,5,,
Usher IRC,Adam Nelson,Semi Scratch,,5,5,
LCRC,Andrew Keogh,Semi Scratch,,5,5,
Orwell,Barry Greene,Semi Scratch,,,5,5
Clondalkin CC,Davi Silva,Semi Scratch,5,,5,
LCRC,Declan Brassil,Semi Scratch,,,5,5
Orwell,Jonathan O Brien,Semi Scratch,5,5,,
Orwell,Ken O Neill,Semi Scratch,5,5,,
LCRC,Mark Nicholls,Semi Scratch,,5,,5
Sundrive,Mark Stewart,Semi Scratch,,5,,5
Blanch Wheelies,Owen Kennedy,Semi Scratch,,,5,5
LCRC,Paul Rogers,Semi Scratch,5,,,5
LCRC,Rich Matthew Walls,Semi Scratch,,,10,
STCC,Ronan Flannery,Semi Scratch,,5,,5
LCRC,Sean Ward,Semi Scratch,5,5,,
Orwell,Shane O Neill,Semi Scratch,,,5,5
LCRC,Simon Ward,Semi Scratch,,,5,5
Orwell,Peadar Corbally,Limit,,8,,
Orwell,Shane Burke,Semi Limit,7,,,
LCRC,Ryan Dunne,Semi Limit,,,6,
Blanch Wheelies,Alan Waters,Semi Scratch,,,,5
Orwell,Bart Wijn,Limit,5,,,
STCC,Cormac O Connor,Limit,,,,5
Orwell,Danya El Gahzel,Limit,,5,,
LCRC,Federico Argento,Limit,,,5,
Orwell,Isabelle Cairns,Limit,,,,5
STCC,Padraig Donohoe,Limit,5,,,
STCC,Richard Magnier,Limit,,5,,
Orwell,Ronan Simms,Limit,,5,,
Orwell,Ysabella Huele,Limit,5,,,
STCC,Eoin Farrell,Scratch,5,,,
LCRC,Gavin Hendley,Scratch,,5,,
STCC,James Kelly,Scratch,5,,,
LCRC,Robert Farrell,Scratch,,,,5
LCRC,Ronan Killeen,Scratch,,,,5
STCC,Tiit Talumaa,Scratch,,5,,
Orwell,David Maher,Semi Limit,5,,,
STCC,Fergal May,Semi Limit,,,,5
Clondalkin CC,Jennifer Bates,Limit,,,,5
Usher IRC,John Lalor,Semi Limit,,,,5
Orwell,Jonathan Hudson,Semi Limit,,5,,
STCC,Marc  Farrelly,Semi Limit,5,,,
LCRC,Paul Heynen,Semi Limit,,,,5
Orwell,Paul O Brien,Semi Limit,5,,,
Clondalkin CC,Pierce Oconnor,Semi Limit,,5,,
Orwell,Werner Otto,Semi Limit,,,5,
Orwell,Adam Mc Connell,Semi Scratch,5,,,
STCC,Conor O Brien,Semi Scratch,,,5,
Orwell,Darran Kearney,Semi Scratch,,,,5
Orwell,Dave Smyth,Semi Scratch,,5,,
Clondalkin CC,Derek Daly,Semi Scratch,,,,5
Usher IRC,Eoin Rheinisch,Semi Scratch,,,,5
STCC,Frederick Roberts,Semi Scratch,5,,,
LCRC,Ian O Hara,Semi Scratch,,,,5
STCC,Niall Kelly,Semi Scratch,,5,,
Orwell,Niall Kieran,Semi Scratch,,5,,
Sundrive,Oscar Sevastopulo,Semi Scratch,5,,,
Blanch Wheelies,Pat Beere,Semi Scratch,,,,5
Orwell,Yvonne Doran,Semi Scratch,,,,5`

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
        riderShortName: createShortName(it.name),
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

function createShortName(value: string): string {
  const parts = value.split(' ')
  if (parts.length > 1) {
    return `${parts[0]?.substring(0, 1)}. ${parts.slice(1).join(' ')}`
  } else {
    return value
  }
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
    case 'Blanch Wheelies':
    case 'Blanch Wheelies CC':
      return 'bwcc'
    case 'CCC':
    case 'Clondalkin CC':
      return 'ccc'
    case 'LCRC':
    case 'Lucan Cycling Road Club':
      return 'lcrc'
    case 'OWCC':
    case 'Orwell':
    case 'Orwell Wheelers Cycling Club':
      return 'owcc'
    case 'SDCC':
    case 'South Dublin':
    case 'South Dublin Cycling Club':
      return 'sdcc'
    case 'STCC':
    case 'St Tiernans Cycling Club':
      return 'stcc'
    case 'STT':
    case 'Sundrive':
    case 'Sundrive Track Team':
      return 'stt'
    case 'UIRC':
    case 'Usher IRC':
    case 'Usher Irish Road Club':
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
    .replaceAll('Oleary', "O'Leary")
}

type CsvRow = {
  name: string
  category: string
  club: string
}

convertCsvToJson()

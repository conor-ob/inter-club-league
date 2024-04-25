import _ from 'lodash'
import Papa from 'papaparse'
import { StageResultEntity } from '../server/src/entity/StageResultEntity'

const csvString = `Name,Club,Group,1,2
Ed Kelly,LCRC,Semi Scratch,11,9
Pierce O Leary,LCRC,Semi Scratch,10,10
George Sevastopulo,Sundrive,Semi Scratch,8,11
Adam Greally,STCC,Scratch,7,11
David Cahill,Orwell,Semi Limit,9,8
Terence Mc Cartan,STCC,Semi Limit,5,11
Ilie Gabuja,Orwell,Semi Limit,6,9
Owen O Flaherty,Orwell,Semi Limit,5,10
Michael Hickey,Orwell,Limit,5,9
Sean Oleary,LCRC,Semi Scratch,9,5
David Ryan,STCC,Scratch,5,8
Brian Nolan,Blanch Wheelies,Limit,5,7
Bryan Geary,STCC,Scratch,5,7
Samuel Curtis,Usher IRC,Limit,,11
Kieran Sweeney,Blanch Wheelies,Semi Limit,5,6
Oleksandr Konkolevsky,Blanch Wheelies,Limit,5,6
Daniel Mc Guinness,Clondalkin CC,Semi Scratch,11,
Gavin Dodd,Orwell,Semi Scratch,5,6
Cahir O Higgins,Orwell,Scratch,6,5
Brian Reynolds,South Dublin,Limit,5,5
Colum Bradley,Orwell,Limit,5,5
Matthew Broadstock,Orwell,Limit,,10
Paul Needham,Usher IRC,Limit,5,5
Stephen O Shea,Orwell,Limit,5,5
Alan O Dowd,Orwell,Semi Limit,5,5
Daragh Boyd,Orwell,Semi Limit,5,5
Filippo Lin,LCRC,Semi Limit,5,5
Gareth Muldowney,Clondalkin CC,Semi Limit,5,5
Luke Keaney,Orwell,Semi Limit,10,
Paul Kane,Orwell,Semi Limit,5,5
Stephen Seagrave,Clondalkin CC,Semi Limit,5,5
Callum Byrne,LCRC,Semi Scratch,5,5
Cesar Lopes,Orwell,Semi Scratch,5,5
Colm Sevastopulo,Sundrive,Semi Scratch,5,5
Connor Fennell,Orwell,Semi Scratch,5,5
Dick O Brien,Orwell,Semi Scratch,5,5
John Mc Gettigan,LCRC,Semi Scratch,5,5
Jonathan O Brien,Orwell,Semi Scratch,5,5
Ken O Neill,Orwell,Semi Scratch,5,5
Rob Jennings,LCRC,Semi Scratch,5,5
Sean Ward,LCRC,Semi Scratch,5,5
Adriaan Pretorius,LCRC,Scratch,5,5
Bob Hall,Clondalkin CC,Scratch,5,5
Mark Donnelly-Orr,LCRC,Scratch,,10
Martin Casey,STCC,Scratch,5,5
Aimhirghin O Brannagain,Orwell,Scratch,,9
Peadar Corbally,Orwell,Limit,,8
Ronan Conway,LCRC,Semi Limit,8,
Alan Clarke,Orwell,Semi Scratch,,8
Gareth Jones,Blanch Wheelies,Semi Limit,,7
Shane Burke,Orwell,Semi Limit,7,
Brendan Ward,Clondalkin CC,Semi Scratch,,7
John Sheridan,STCC,Scratch,,6
Abily Tudal,STCC,Limit,5,
Aishling Barry,LCRC,Limit,,5
Alan Dempsey,STCC,Semi Limit,5,
Bart Wijn,Orwell,Limit,5,
Brendan Bonnie,STCC,Limit,,5
Brian Stafford,Clondalkin CC,Limit,,5
Danya El Gahzel,Orwell,Limit,,5
Daragh O'Toole,STCC,Limit,,5
Eamon Quigley,LCRC,Semi Limit,,5
John Mc Auliffe,Blanch Wheelies,Limit,,5
Mark O Connor,Blanch Wheelies,Limit,,5
Padraig Donohoe,STCC,Limit,5,
Peter Gibbons,LCRC,Limit,,5
Richard Magnier,STCC,Limit,,5
Ronan Simms,Orwell,Limit,,5
Ysabella Huele,Orwell,Limit,5,
Andrew Lomax,Orwell,Semi Limit,5,
Barry Fennell,Orwell,Semi Limit,5,
David Maher,Orwell,Semi Limit,5,
Harry Rochford,Orwell,Semi Limit,,5
Jim Carey,Orwell,Semi Limit,5,
Jonathan Hudson,Orwell,Semi Limit,,5
Joshua Chambers,LCRC,Semi Limit,5,
Louis Twomey,STCC,Semi Limit,5,
Marc Farrelly,STCC,Semi Limit,5,
Mark Dillon,Clondalkin CC,Semi Limit,,5
Paul O Brien,Orwell,Semi Limit,5,
Peter Bates,Clondalkin CC,Semi Limit,5,
Pierce Oconnor,Clondalkin CC,Semi Limit,,5
Adam Mc Connell,Orwell,Semi Scratch,5,
Adam Nelson,Usher IRC,Semi Scratch,,5
Andrew Keogh,LCRC,Semi Scratch,,5
Anthony Dunne,LCRC,Semi Scratch,,5
Dave Smyth,Orwell,Semi Scratch,,5
Davi Silva,Clondalkin CC,Semi Scratch,5,
Frederick Roberts,STCC,Semi Scratch,5,
Luke Keogh,LCRC,Semi Scratch,,5
Mark Nicholls,LCRC,Semi Scratch,,5
Niall Kelly,STCC,Semi Scratch,,5
Oscar Sevastopulo,Sundrive,Semi Scratch,5,
Paul Rogers,LCRC,Semi Scratch,5,
Robert Bowen,STCC,Semi Scratch,5,
Ronan Flannery,STCC,Semi Scratch,,5
Des,Blanch Wheelies,Scratch,,5
Eoin Farrell,STCC,Scratch,5,
Gavin Hendley,LCRC,Scratch,,5
James Kelly,STCC,Scratch,5,
Pawel Rybak,LCRC,Scratch,5,
Tiit Talumaa,STCC,Scratch,,5`

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
}

type CsvRow = {
  name: string
  category: string
  club: string
}

convertCsvToJson()

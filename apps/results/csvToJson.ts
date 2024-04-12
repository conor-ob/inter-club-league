import _ from 'lodash'
import Papa from 'papaparse'
import { StageResultEntity } from '../server/src/entity/StageResultEntity'

const csvString = `Name,Club,Group,1
Adam Greally,St Tiernans Cycling Club,Scratch,7
Adriaan Pretorius,Lucan Cycling Road Club,Scratch,0
Aimhirghin O Brannagain,Orwell Wheelers Cycling Club,Scratch,0
Andy Grehan,Lucan Cycling Road Club,Scratch,0
Bob Hall,Clondalkin CC,Scratch,0
Bryan Geary,St Tiernans Cycling Club,Scratch,0
Cahir O Higgins,Orwell Wheelers Cycling Club,Scratch,6
Colm Sevastopulo,Sundrive Track Team,Scratch,0
David Ryan,St Tiernans Cycling Club,Scratch,0
Des Smyth,Blanch Wheelies CC,Scratch,0
Diarmuid Collins,Orwell Wheelers Cycling Club,Scratch,0
Dick O Brien,Orwell Wheelers Cycling Club,Scratch,0
Eoin Farrell,St Tiernans Cycling Club,Scratch,0
Eugene Murtagh,Lucan Cycling Road Club,Scratch,0
Gavin Hendley,Lucan Cycling Road Club,Scratch,0
James Kelly,St Tiernans Cycling Club,Scratch,0
John Sheridan,St Tiernans Cycling Club,Scratch,0
John Mc Cormack,St Tiernans Cycling Club,Scratch,0
Josh Callaly,Lucan Cycling Road Club,Scratch,0
Mark Stewart,Sundrive Track Team,Scratch,0
Mark Donnelly-Orr,Lucan Cycling Road Club,Scratch,0
Martin Casey,St Tiernans Cycling Club,Scratch,0
Pawel Rybak,Lucan Cycling Road Club,Scratch,0
Robert Farrell,Lucan Cycling Road Club,Scratch,0
Ronan Killeen,Lucan Cycling Road Club,Scratch,0
Sean Curtis,Sundrive Track Team,Scratch,0
Tiit Talumaa,St Tiernans Cycling Club,Scratch,0
Adam Nelson,Usher Irish Road Club,Semi Scratch,0
Adam Mc Connell,Orwell Wheelers Cycling Club,Semi Scratch,0
Aidan Collins,Orwell Wheelers Cycling Club,Semi Scratch,0
Andrew Keogh,Lucan Cycling Road Club,Semi Scratch,0
Anthony Dunne,Lucan Cycling Road Club,Semi Scratch,0
Barry Greene,Orwell Wheelers Cycling Club,Semi Scratch,0
Barry Cronin,Orwell Wheelers Cycling Club,Semi Scratch,0
Brendan Ward,Clondalkin CC,Semi Scratch,0
Brian Mc Nally,Orwell Wheelers Cycling Club,Semi Scratch,0
Callum Byrne,Lucan Cycling Road Club,Semi Scratch,0
Cesar Lopes,Orwell Wheelers Cycling Club,Semi Scratch,0
Colly Murray,St Tiernans Cycling Club,Semi Scratch,0
Connor Fennell,Orwell Wheelers Cycling Club,Semi Scratch,0
Conor O Brien,St Tiernans Cycling Club,Semi Scratch,0
Conor Brennan,St Tiernans Cycling Club,Semi Scratch,0
Daniel Mc Guinness,Clondalkin CC,Semi Scratch,11
Darran Kearney,Orwell Wheelers Cycling Club,Semi Scratch,0
Davi Silva,Clondalkin CC,Semi Scratch,0
Declan Brassil,Lucan Cycling Road Club,Semi Scratch,0
Derek Daly,Clondalkin CC,Semi Scratch,0
Dermot Cooney,St Tiernans Cycling Club,Semi Scratch,0
Eoin Rheinisch,Usher Irish Road Club,Semi Scratch,0
Frederick Roberts,St Tiernans Cycling Club,Semi Scratch,0
Gavin Dodd,Orwell Wheelers Cycling Club,Semi Scratch,0
Ian O Hara,Lucan Cycling Road Club,Semi Scratch,0
Ian Devlin,Orwell Wheelers Cycling Club,Semi Scratch,0
John Mc Gettigan,Lucan Cycling Road Club,Semi Scratch,0
Jonathan O Brien,Orwell Wheelers Cycling Club,Semi Scratch,0
Ken O Neill,Orwell Wheelers Cycling Club,Semi Scratch,0
Luke Keogh,Lucan Cycling Road Club,Semi Scratch,0
Mark Nicholls,Lucan Cycling Road Club,Semi Scratch,0
Mark Leonard,St Tiernans Cycling Club,Semi Scratch,0
Mathieu Fragniere,Orwell Wheelers Cycling Club,Semi Scratch,0
Niall Kieran,Orwell Wheelers Cycling Club,Semi Scratch,0
Niall Kelly,St Tiernans Cycling Club,Semi Scratch,0
Oisin Purcell,St Tiernans Cycling Club,Semi Scratch,0
Owen Kennedy,Blanch Wheelies CC,Semi Scratch,0
Pat Beere,Blanch Wheelies CC,Semi Scratch,0
Paul Rogers,Lucan Cycling Road Club,Semi Scratch,0
Pierce O Leary,Lucan Cycling Road Club,Semi Scratch,10
Rich Matthew Walls,Lucan Cycling Road Club,Semi Scratch,0
Rob Jennings,Lucan Cycling Road Club,Semi Scratch,0
Robert Bowen,St Tiernans Cycling Club,Semi Scratch,0
Ronan Flannery,St Tiernans Cycling Club,Semi Scratch,0
Sean Ward,Lucan Cycling Road Club,Semi Scratch,0
Sean O Leary,Lucan Cycling Road Club,Semi Scratch,9
Sean Flynn,Lucan Cycling Road Club,Semi Scratch,0
Shane O Neill,Orwell Wheelers Cycling Club,Semi Scratch,0
Shaun Kelly,Orwell Wheelers Cycling Club,Semi Scratch,0
Simon Ward,Lucan Cycling Road Club,Semi Scratch,0
Stephen Oglesby,Clondalkin CC,Semi Scratch,0
Yvonne Doran,Orwell Wheelers Cycling Club,Semi Scratch,0
Alan O Dowd,Orwell Wheelers Cycling Club,Semi Limit,0
Alan Clarke,Orwell Wheelers Cycling Club,Semi Limit,0
Andrew Lomax,Orwell Wheelers Cycling Club,Semi Limit,0
Barry Fennell,Orwell Wheelers Cycling Club,Semi Limit,0
Conor Brophy,St Tiernans Cycling Club,Semi Limit,0
Daragh Boyd,Orwell Wheelers Cycling Club,Semi Limit,0
Darragh Murphy,Orwell Wheelers Cycling Club,Semi Limit,0
David Maher,Orwell Wheelers Cycling Club,Semi Limit,0
David Fox,Orwell Wheelers Cycling Club,Semi Limit,0
Edward Kelly,Lucan Cycling Road Club,Semi Limit,11
Federico Argento,Lucan Cycling Road Club,Semi Limit,0
Fergal May,St Tiernans Cycling Club,Semi Limit,0
Filippo Lin,Lucan Cycling Road Club,Semi Limit,0
Gareth Muldowney,Clondalkin CC,Semi Limit,0
Gareth Jones,Blanch Wheelies CC,Semi Limit,0
Garrett Greene,Orwell Wheelers Cycling Club,Semi Limit,0
George Sevastopulo,Sundrive Track Team,Semi Scratch,8
Harry Rochford,Orwell Wheelers Cycling Club,Semi Limit,0
Ivan Casey,Lucan Cycling Road Club,Semi Limit,0
Jennifer Bates,Clondalkin CC,Semi Limit,0
Jim Carey,Orwell Wheelers Cycling Club,Semi Limit,0
John Lalor,Usher Irish Road Club,Semi Limit,0
Jonathan Hudson,Orwell Wheelers Cycling Club,Semi Limit,0
Joshua Chambers,Lucan Cycling Road Club,Semi Limit,0
Jules De Meester,Orwell Wheelers Cycling Club,Semi Limit,0
Kieran Sweeney,Blanch Wheelies CC,Semi Limit,0
Kilian Doyle,Orwell Wheelers Cycling Club,Semi Limit,0
Leonardo De Llamas,Blanch Wheelies CC,Semi Limit,0
Louis Twomey,St Tiernans Cycling Club,Semi Limit,0
Mark Dillon,Clondalkin CC,Semi Limit,0
Mark Mearns,Lucan Cycling Road Club,Semi Limit,0
Martin Mc Namara,Lucan Cycling Road Club,Semi Limit,0
Martyn Holmes,Orwell Wheelers Cycling Club,Semi Limit,0
Nigel Burke,Orwell Wheelers Cycling Club,Semi Limit,0
Oleksandr Konkolevsky,Blanch Wheelies CC,Semi Limit,0
Oscar Sevastopulo,Sundrive Track Team,Semi Limit,0
Owen O Flaherty,Orwell Wheelers Cycling Club,Semi Limit,0
Paul Kane,Orwell Wheelers Cycling Club,Semi Limit,0
Paul Needham,Usher Irish Road Club,Semi Limit,0
Paul Heynen,Lucan Cycling Road Club,Semi Limit,0
Paul O Brien,Orwell Wheelers Cycling Club,Semi Limit,0
Peter Bates,Clondalkin CC,Semi Limit,0
Pierce Oconnor,Clondalkin CC,Semi Limit,0
Ronan Conway,Lucan Cycling Road Club,Semi Limit,8
Ryan Dunne,Lucan Cycling Road Club,Semi Limit,0
Stephen Seagrave,Clondalkin CC,Semi Limit,0
Terence Mc Cartan,St Tiernans Cycling Club,Semi Limit,0
Abily Tudal,St Tiernans Cycling Club,Limit,0
Aishling Barry,Lucan Cycling Road Club,Limit,0
Alan Dempsey,St Tiernans Cycling Club,Limit,0
Alan Waters,Blanch Wheelies CC,Limit,0
Bart Wijn,Orwell Wheelers Cycling Club,Limit,0
Billy Harney,Blanch Wheelies CC,Limit,0
Brendan Bonnie,St Tiernans Cycling Club,Limit,0
Brian Reynolds,South Dublin Cycling Club,Limit,0
Brian Hammond,Lucan Cycling Road Club,Limit,0
Brian Nolan,Blanch Wheelies CC,Limit,0
Brian Stafford,Clondalkin CC,Limit,0
Clinton Slowey,Lucan Cycling Road Club,Limit,0
Colm Thomas Dunne,Lucan Cycling Road Club,Limit,0
Colum Bradley,Orwell Wheelers Cycling Club,Limit,0
Cormac O Connor,St Tiernans Cycling Club,Limit,0
Danya El Gahzel,Orwell Wheelers Cycling Club,Limit,0
Daragh O'Toole,St Tiernans Cycling Club,Limit,0
Dave Smyth,Orwell Wheelers Cycling Club,Limit,0
David Cahill,Orwell Wheelers Cycling Club,Limit,9
Eamon Peregrine,St Tiernans Cycling Club,Limit,0
Eamon Quigley,Lucan Cycling Road Club,Limit,0
Eric Wilson,Orwell Wheelers Cycling Club,Limit,0
Gary Hanlon,Orwell Wheelers Cycling Club,Limit,0
Hannah Roche,Orwell Wheelers Cycling Club,Limit,0
Ilie Gabuja,Orwell Wheelers Cycling Club,Limit,6
Isabelle Cairns,Orwell Wheelers Cycling Club,Limit,0
John Mc Auliffe,Blanch Wheelies CC,Limit,0
John Anslow,Orwell Wheelers Cycling Club,Limit,0
Ken Nelson,Usher Irish Road Club,Limit,0
Lorraine Mc Gill,Blanch Wheelies CC,Limit,0
Luke Keaney,Orwell Wheelers Cycling Club,Limit,10
Luke Potter,Orwell Wheelers Cycling Club,Limit,0
Marc Farrelly,St Tiernans Cycling Club,Limit,0
Mark O Connor,Blanch Wheelies CC,Limit,0
Matthew Broadstock,Orwell Wheelers Cycling Club,Limit,0
Matthew Lane,Orwell Wheelers Cycling Club,Limit,0
Michael Hickey,Orwell Wheelers Cycling Club,Limit,0
Michael Leonard,Lucan Cycling Road Club,Limit,0
Niall Connaughton,Clondalkin CC,Limit,0
Padraig Donohoe,St Tiernans Cycling Club,Limit,0
Peadar Corbally,Orwell Wheelers Cycling Club,Limit,0
Peter Gibbons,Lucan Cycling Road Club,Limit,0
Richard Hart,Lucan Cycling Road Club,Limit,0
Richard Magnier,St Tiernans Cycling Club,Limit,0
Ronan Simms,Orwell Wheelers Cycling Club,Limit,0
Samuel Curtis,Usher Irish Road Club,Limit,0
Sean O Kane,Orwell Wheelers Cycling Club,Limit,0
Shane Burke,Orwell Wheelers Cycling Club,Limit,7
Simon Crowe,Blanch Wheelies CC,Limit,0
Stephen O Shea,Orwell Wheelers Cycling Club,Limit,0
Stephen Finnegan,Clondalkin CC,Limit,0
Trevor Duffy,St Tiernans Cycling Club,Limit,0
Ysabella Huele,Orwell Wheelers Cycling Club,Limit,0
Zoe Greene,Orwell Wheelers Cycling Club,Limit,0
Brendan Bonnie,St Tiernans Cycling Club,Limit,0`

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
    case 'Blanch Wheelies CC':
      return 'bwcc'
    case 'CCC':
    case 'Clondalkin CC':
      return 'ccc'
    case 'LCRC':
    case 'Lucan Cycling Road Club':
      return 'lcrc'
    case 'OWCC':
    case 'Orwell Wheelers Cycling Club':
      return 'owcc'
    case 'SDCC':
    case 'South Dublin Cycling Club':
      return 'sdcc'
    case 'STCC':
    case 'St Tiernans Cycling Club':
      return 'stcc'
    case 'STT':
    case 'Sundrive Track Team':
      return 'stt'
    case 'UIRC':
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

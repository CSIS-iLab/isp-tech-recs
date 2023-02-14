const googleAPIKey = 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4'
const googleSpreadsheetKey = '18X7CU49YzbIa-KWJJR1Xz-mmINOdix9tGh7eMjXoXvM'
const googleSpreadsheet = 'data-v2'

const dataURL = `https://content-sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetKey}/values/${googleSpreadsheet}?key=${googleAPIKey}&majorDimension=ROWS`
const dataset = {}
let test

export default async function getNewData() {
  const response = await fetch( dataURL )
  const data = await response.json()
  // dataset = formatDataset( data.values )
  // return dataset
  return formatDataset(data.values)

}

function formatDataset( data ) {
  const columnNames = data.shift()
  let technologies = []
  let actors = []
  let recommendationCategory = []
  let recommendationType = []
  let recommendationStatus = []

  // Grabs all the actors
  columnNames.forEach( (element, index) => {
    if (index > 4 && index < 12) {
      actors.push(element)
    }
  })

  //Grabs all the technologies and recommendation types
  data.forEach(element => {
    if ( element[0] ) {
      technologies.push( element[0] )
      // technologies.push(element[0].replaceAll(' ', '-'))
    }
    if ( element[4] ) {
      recommendationType.push( element[4] )
    }
    if ( element[12] ) {
      recommendationStatus.push( element[12] )
    }
  })

  technologies = [...new Set(technologies)]
  recommendationType = [...new Set(recommendationType)]
  actors = [...new Set(actors)]
  recommendationStatus = [...new Set(recommendationStatus)]


  // todo:
  // check with Harshana if is category or type?
  // write a function get all the actors when the flag is on 1
  const dataFormmated = data.map( ( row, index ) => {
    // console.log(row)
    return {
      id: index,
      technology: row[0],
      recommendation: {
        title: row[2],
        description: row[3],
        link: row[1]
      },
      actors: actors.filter( actor => row[actor] ),
      recommendationType: row[4],
      recommendationStatus: row[12]
    }
  } )

  return {
    columnNames: columnNames,
    technologies: technologies,
    recommendationType: recommendationType,
    recommendationStatus: recommendationStatus,
    actors: actors,
    data: data.filter((row, index) => row.length !== 0 && row[0] !== ''),
    dataFormmated: dataFormmated
  }
}

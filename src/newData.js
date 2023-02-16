import * as d3Fetch from 'd3-fetch'

const googleAPIKey = 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4'
const googleSpreadsheetKey = '18X7CU49YzbIa-KWJJR1Xz-mmINOdix9tGh7eMjXoXvM'
const googleSpreadsheet = 'data-v2'

const dataURL = `https://content-sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetKey}/values/${googleSpreadsheet}?key=${googleAPIKey}&majorDimension=ROWS`
const dataURLNew =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLjXKbo0h4ef1Jde8EnQSaJK5Lb5hIRyIVvcl3vQE4u5GntGfgLLeGl7-h3rJAoRf1RhaAs9nifnkw/pub?output=csv'
// const URL =
  // 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRAWqEOfyQi5rqdsQ-ssGUe08fdB8AczK6_sUwf-deKITfbLlqSTYpOzO4yG5u_B5O68_tB595NjPDU/pub?output=csv'

const dataset = {}
const actors = ["Congress","ODNI","CIA","NSA","NGA","NRO","DOD"]

export default async function getNewData() {
  console.log(await fetchData())
  const response = await fetch(dataURL)
  const data = await response.json()
  const dataset = await fetchData()
  // dataset = formatDataset( data.values )
  // return dataset
  return dataset
  // return formatDataset(data.values)
}

async function fetchData() {
  const dataPromise = d3Fetch.csv(dataURLNew).then( res => {
    const data = res.map((row, index) => {
      // console.log(row)
      return {
        id: index,
        technology: row.technology.split(' ').join('_'),
        recommendation: {
          title: row.title,
          description: row.description,
          link: row.url
        },
        actors: actors.filter( actor => row[actor] ),
        status: row.status,
        type: row.type_of_recommendation
      }
    })
    return {
      data: data,
      actors: actors,
      technologies: formatTechnologies(data),
      types: formatTypes(data),
      status: formatStatus(data)
    }
  })
  return dataPromise
}

function formatTechnologies( array ) {
  return [...new Set( array.map( el => el.technology ) )]
}

function formatTypes( array ) {
  return [...new Set( array.map( el => el.type ) )]
}

function formatStatus( array ) {
  return [...new Set( array.map( el => el.status ) )]
}
function formatDataset( data ) {
  const columnNames = data.shift()
  let technologies = []
  let actors = []
  let recommendationCategory = []
  let recommendationType = []
  let recommendationStatus = []

  // Grabs all the actors
  columnNames.forEach((element, index) => {
    if (index > 4 && index < 12) {
      actors.push(element)
    }
  })

  //Grabs all the technologies and recommendation types
  data.forEach((element) => {
    if (element[0]) {
      technologies.push(element[0])
      // technologies.push(element[0].replaceAll(' ', '-'))
    }
    if (element[4]) {
      recommendationType.push(element[4])
    }
    if (element[12]) {
      recommendationStatus.push(element[12])
    }
  })

  technologies = [...new Set(technologies)]
  recommendationType = [...new Set(recommendationType)]
  actors = [...new Set(actors)]
  recommendationStatus = [...new Set(recommendationStatus)]

  function getActor(row) {
    for (let index = 5; index < 12; index++) {
      const element = row[index]
      console.log('row: ', element)
    }
  }
  // todo:
  // write a function get all the actors when the flag is on 1
  const dataFormmated = data.map((row, index) => {
    // console.log(row)
    return {
      id: index,
      technology: row[0],
      recommendation: {
        title: row[2],
        description: row[3],
        link: row[1]
      },
      // actors: getActor(row),
      recommendationType: row[4],
      recommendationStatus: row[12]
    }
  })

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

import * as d3Fetch from 'd3-fetch'

const googleAPIKey = 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4'
const googleSpreadsheetKey = '18X7CU49YzbIa-KWJJR1Xz-mmINOdix9tGh7eMjXoXvM'
const googleSpreadsheetContent = 'content'
const uURL = `https://content-sheets.googleapis.com/v4/spreadsheets/1H5JH0nsefgXAkGE6VRLUi1H50d0m4IeZBfJNZ-avEaI/values/channels-to-deliver-G2P?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`

const contentURL = `https://content-sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetKey}/values/${googleSpreadsheetContent}?key=${googleAPIKey}&majorDimension=ROWS`
let content = {}

export default async function getContent() {
  const response = await fetch( contentURL )
  const data = await response.json()
  content = formatContentData( data.values )
  return content
}

function formatContentData( data ) {
  console.log(data)
  const columnNames = data.shift()
  const dataFormatted = data.map( ( row, index ) => {
    // const test = columnNames[index]
    return {
      id: index,
      overline_small: row[0],
      overline_regular: row[1],
      intro_content_title: row[2],
      intro_content_introduction: row[3],
      intro_content_more: row[4],
      report_block: {
        title: row[5],
        description: row[6],
        image: row[7],
        imageAlt: row[8]
      }
    }
  })
  return {
    dataFormatted: dataFormatted,
    // columnNames: columnNames
    // columnNames: formatColumnNames( columnNames )
  }
}

function formatColumnNames( columnNames ) {
  return columnNames.map( name => formatName( name ) )
}

function formatName( name ) {
  return name.replaceAll( '_', ' ' )
}

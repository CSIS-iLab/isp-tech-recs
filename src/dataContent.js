// import * as d3Fetch from 'd3-fetch'

const googleAPIKey = 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4'
const googleSpreadsheetKey = '18X7CU49YzbIa-KWJJR1Xz-mmINOdix9tGh7eMjXoXvM'
const googleSpreadsheetContent = 'content'

const contentURL = `https://content-sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetKey}/values/${googleSpreadsheetContent}?key=${googleAPIKey}&majorDimension=ROWS`
let content = {}

export default async function getContent() {
  const response = await fetch( contentURL )
  const data = await response.json()
  content = formatContentData( data.values )
  return content
}

function formatContentData( data ) {
  const columnNames = data.shift()
  const dataFormatted = data.map( ( row, index ) => {
    return {
      id: index,
      overline_small: row[0],
      overline_regular: row[1],
      intro_content: {
        title: row[2],
        introduction: row[3],
        more: row[4],
        extra: row[5]
      },
      report_block: {
        title: row[5],
        description: row[6],
        image: row[7],
        imageAlt: row[8],
        url: row[9]
      }
    }
  })
  return {
    dataFormatted: dataFormatted
  }
}

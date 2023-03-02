// import * as d3Fetch from 'd3-fetch'

const googleAPIKey = 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4'
const googleSpreadsheetKey = '18X7CU49YzbIa-KWJJR1Xz-mmINOdix9tGh7eMjXoXvM'
const googleSpreadsheetContent = 'social-media-links'

const contentURL = `https://content-sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetKey}/values/${googleSpreadsheetContent}?key=${googleAPIKey}&majorDimension=ROWS`
let content = {}

export default async function getSocialMedia() {
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
      platform: row[0],
      link: row[1]
    }
  })
  return {
    socialMedia: dataFormatted
  }
}

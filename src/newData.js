import * as d3Fetch from 'd3-fetch'

const googleAPIKey = 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4'
const googleSpreadsheetKey = '18X7CU49YzbIa-KWJJR1Xz-mmINOdix9tGh7eMjXoXvM'
const googleSpreadsheet = 'data-v2'

const dataURL = `https://content-sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetKey}/values/${googleSpreadsheet}?key=${googleAPIKey}&majorDimension=ROWS`
const dataset = {}

export default async function getNewData() {
  const response = await fetch( dataURL )
  const data = await response.json()
  dataset = formatDataset( data.values )
  return data
}

function formatDataset( data ) {
  console.log( data )
  const columnNames = data.shift()
}

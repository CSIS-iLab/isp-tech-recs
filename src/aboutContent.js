const googleAPIKey = 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4'
const googleSpreadsheetKey = '18X7CU49YzbIa-KWJJR1Xz-mmINOdix9tGh7eMjXoXvM'
const googleSpreadsheetContent = 'about'

const url = `https://content-sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetKey}/values/${googleSpreadsheetContent}?key=${googleAPIKey}&majorDimension=ROWS`

export default async function getAboutContent() {
  const response = await fetch(url)
  const data = await response.json()
  return formatContentData(data.values)
}

function formatContentData(data) {
  const columnNames = data.shift()
  const dataFormatted = data.map((row, index) => {
    return {
      id: index,
      description: row[0],
      acknowledgement: row[1]
    }
  })
  return {
    about: dataFormatted
  }
}

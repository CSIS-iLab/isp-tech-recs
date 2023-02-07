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
  data.forEach(element => {
    if (element[0]) {
      technologies.push(element[0])
      // technologies.push(element[0].replaceAll(' ', '-'))
    }
  })
  // for (let index = 1; index < data.length; index++) {
  //   const element = data[index]
  //   if (element[0]) {
  //     technologies.push(element[0])
  //     // technologies.push(element[0].replaceAll(' ', '-'))
  //   }
  // }

  technologies = [...new Set(technologies)]
  return {
    columnNames: columnNames,
    technologies: technologies,
  }
}

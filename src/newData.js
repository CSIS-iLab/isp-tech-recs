import * as d3Fetch from 'd3-fetch'

const actors = ['Congress', 'ODNI', 'CIA', 'NSA', 'NGA', 'NRO', 'DOD']

export default async function getNewData() {
  const URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLjXKbo0h4ef1Jde8EnQSaJK5Lb5hIRyIVvcl3vQE4u5GntGfgLLeGl7-h3rJAoRf1RhaAs9nifnkw/pub?output=csv'
  return await fetchData(URL)
}

async function fetchData(URL) {
  const dataPromise = d3Fetch.csv(URL).then((res) => {
    const data = res
      .filter((row) => row.title !== '')
      .map((row, index) => {
        return {
          id: index,
          technology: row.technology.split(' ').join('_'),
          recommendation: {
            title: row.title,
            description: row.description,
            link: row.url
          },
          actors: actors.filter((actor) => row[actor]),
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

function formatTechnologies(array) {
  return [...new Set(array.map((el) => el.technology))]
}

function formatTypes(array) {
  return [...new Set(array.map((el) => el.type))]
}

function formatStatus(array) {
  return [...new Set(array.map((el) => el.status))]
}

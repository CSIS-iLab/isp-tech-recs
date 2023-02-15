import * as d3Fetch from 'd3-fetch'

const googleAPIKey = 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg'
const googleAPIKeyTest = 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4'
const googleSpreadsheetKey = '18X7CU49YzbIa-KWJJR1Xz-mmINOdix9tGh7eMjXoXvM'
const googleSpreadsheetContent = 'content'
const googleSpreadsheetData = 'data'
const uURL = `https://content-sheets.googleapis.com/v4/spreadsheets/1H5JH0nsefgXAkGE6VRLUi1H50d0m4IeZBfJNZ-avEaI/values/channels-to-deliver-G2P?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`

const contentURL = `https://content-sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetKey}/values/${googleSpreadsheetContent}?key=${googleAPIKeyTest}&majorDimension=ROWS`
const dataURL = `https://content-sheets.googleapis.com/v4/spreadsheets/${googleSpreadsheetKey}/values/${googleSpreadsheetData}?key=${googleAPIKeyTest}&majorDimension=ROWS`
// const contentURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLjXKbo0h4ef1Jde8EnQSaJK5Lb5hIRyIVvcl3vQE4u5GntGfgLLeGl7-h3rJAoRf1RhaAs9nifnkw/pub?output=csv'
const URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZbsWyNWxgbsJJd2AuaoNIJ2KkEplWSNK77gxcS_WndRrj1rNnPoxtPNl60HjlmdvQo4UvxBUMEi1S/pub?output=csv'

const policyGoals = [
  'Emissions_Reduction',
  'Economic_Development',
  'Resilience'
]
const tags = [
  'Anticipating_Climate_Impacts',
  'Comprehensive_Planning_Grid_Modernization',
  'Data_Transparency_or_Visualization',
  'Electric_Vehicles',
  'Energy_Storage',
  'Environmental_Justice',
  'Innovation_and_Clusters',
  'Local-Level_Planning_or_Support',
  'Microgrids',
  'Distributed_Energy_Resources_(DERs)',
  'Technology_or_System_Standards',
  'Workforce_Development'
]

export async function getContent() {
  const obj = {}
  const response = await fetch( contentURL )
  const data = await response.json()
  // const dataFormatted = data.forEach(element => {
  //   obj[`$element`] = element
  // })
  // console.log(obj)
  return data
}

export async function getNewData() {
  const response = await fetch( dataURL )
  const data = await response.json()
  return data
}

export function getData() {
  const dataPromise = d3Fetch.csv(URL).then((res) => {
    const data = res.map((row, index) => {
      // console.log(row)
      return {
        id: index,
        policy_goals: policyGoals.filter((goalName) => row[goalName]),
        tags: tags
          .filter((tagName) => row[tagName])
          .map((tagName) => tagName.split('_').join(' ')),
        activity: {
          title: row.title,
          description: row.description,
          link: row.URL
        },
        state: row.state,
        state_name: row.state_name,
        authority: row.authority,
        type_of_resource: row.type_of_resource
      }
    })

    const authority = formatAuthority(data)

    const resourceTypes = formatResourceType(data)

    const states = formatStates(data)

    return {
      data: data,
      states: states,
      tags: tags.map((tagName) => tagName.split('_').join(' ')),
      authority: authority,
      resourceTypes: resourceTypes,
      policyGoals: policyGoals
    }
  })
  return dataPromise
}

export default { getData, getNewData }

function formatAuthority(array) {
  return [...new Set(array.map((el) => el.authority))]
}

function formatResourceType(array) {
  return [...new Set(array.map((el) => el.type_of_resource))]
}

function formatStates(row) {
  return [...new Set(row.map((r) => r.state))].map((state) => {
    return {
      name: row.find((r) => r.state === state).state_name,
      value: row.find((r) => r.state === state).state
    }
  })
}

<script>
  import { onMount } from 'svelte'
  import Icon from './Icons.svelte'

  export let filteredData
  export let row

  $: sortClass = 'inactive'

  const sortByColumns = ['recommendation', 'technology', 'type']

  function handleClick(e) {
    let title = undefined
    let currentRow = undefined
    let extraContent = undefined

    if (e.target.parentNode.classList.contains('title')) {
      title = e.target.parentNode
      currentRow = title.nextElementSibling
      extraContent = e.target.parentNode.nextElementSibling
    } else {
      title = e.target.parentNode.parentNode
      currentRow = title.nextElementSibling
      extraContent = e.target.parentNode.parentNode.nextElementSibling
    }

    title.classList.toggle('title--active')
    title.classList.toggle('table__body__cell--border')
    currentRow.classList.toggle('table__body__cell--border')
    // Show/Hide extraContent
    extraContent.classList.toggle('active')
    extraContent.classList.toggle('hide')
    row.isOpen ? (row.isOpen = true) : (row.isOpen = !row.isOpen)
  }

  const headerNames = [
    'Recommendation',
    'Technology',
    'Actor',
    'Type',
    'Status'
  ]

  $: sortBy = { col: 'recommendation', ascending: true }

  $: sort = (e, column) => {
    column = column.toLowerCase().replace(/\s/g, '_') // replace spaces using regex with undesrscore
    column = column === 'type' ? 'type' : column // add this to sort by recommendation type
    const iconsActive = document.querySelectorAll('.sort-icon--active')
    iconsActive.forEach((icon) => {
      icon.classList.remove('sort-icon--active')
    })
    if (sortBy.col == column) {
      sortBy.ascending = !sortBy.ascending
      sortClass = sortBy.ascending ? 'active' : 'inactive'
    } else {
      sortClass = 'inactive'
      sortBy.col = column
      sortBy.ascending = true
    }

    // Modifier to sort by ascending or descending
    let sortModifier = sortBy.ascending ? 1 : -1

    // Sort by activity title
    if (column == 'recommendation') {
      return (filteredData = filteredData.sort((a, b) => {
        if (a.recommendation.title < b.recommendation.title) {
          return -1 * sortModifier
        } else if (a.recommendation.title > b.recommendation.title) {
          return 1 * sortModifier
        } else {
          return 0
        }
      }))
    }

    let sort = (a, b) =>
      a[column] < b[column]
        ? -1 * sortModifier
        : a[column] > b[column]
        ? 1 * sortModifier
        : 0

    filteredData = filteredData.sort(sort)
  }

  onMount(() => {
    const iconsActive = document.querySelectorAll('.sort-icon--active')
    iconsActive.forEach((icon) => {
      icon.classList.remove('sort-icon--active')
    })
    const divActivity = document.querySelector(
      '.table__cell--header__container__activity'
    )
    if (divActivity) {
      divActivity.children[1].children[1].classList.add('sort-icon--active')
    }
    // Sync horizontal scroll of table header and table body
    // Inspired by https://codepen.io/Goweb/pen/rgrjWx
    const scrollSync = () => {
      const tableHeader = document.querySelector('#table-header')
      const tableBody = document.querySelector('#table-body')

      const bindSyncScrolling = (one, two) => {
        let echo = false
        const sync = (elOne, elTwo) => () =>
          (echo = !echo) &&
          ((elOne.scrollTop = elTwo.scrollTop),
          (elOne.scrollLeft = elTwo.scrollLeft))
        two.onscroll = sync(one, two)
        one.onscroll = sync(two, one)
      }
      bindSyncScrolling(tableHeader, tableBody)
    }
    scrollSync()
  })
</script>

<div class="table__wrapper">
  <div class="table__container table__container--sticky" id="table-header">
    <table class="table">
      <thead>
        <tr class="table__header-row">
          {#each headerNames as name}
            <th class="table__cell--header" scope="col">
              <div
                role="presentation"
                class="table__cell--header__container table__cell--header__container__{name
                  .toLowerCase()
                  .split(' ')
                  .join('-')}"
                on:click={sortByColumns.includes(name.toLowerCase())
                  ? (e) => sort(e, name)
                  : ''}
              >
                <span>{name}</span>
                {#if sortByColumns.includes(name.toLowerCase())}
                  <div
                    role="presentation"
                    class="sort-icons-container"
                    on:click={(e) => sort(e, name)}
                  >
                    <button
                      class="sort-icon sort-icon--{sortBy.col ==
                        name.toLowerCase().split(' ').join('_') &&
                      sortBy.ascending
                        ? 'inactive'
                        : 'active'}">▲</button
                    >
                    <button
                      class="sort-icon sort-icon--{sortBy.col ==
                        name.toLowerCase().split(' ').join('_') &&
                      sortBy.ascending
                        ? 'active'
                        : 'inactive'}">▼</button
                    >
                  </div>
                {/if}
              </div>
            </th>
          {/each}
        </tr>
      </thead>
    </table>
  </div>
  <div class="table__container" id="table-body">
    <table class="table table__body">
      <tbody>
        {#each filteredData as rows}
          {#if rows.recommendation.title}
            <tr
              on:click={(e) => handleClick(e)}
              class="title table__body__cell--border"
            >
              <td class="table__body__cell table__body__cell--data"
                ><div class="table__body__cell__title-container">
                  <span class="icon-container" />{rows.recommendation.title}
                </div></td
              >
              <td
                class="table__body__cell table__body__cell--data table__body__cell--bold"
                >{rows.technology.split('_').join(' ')}
              </td>
              <td class="table__body__cell table__body__cell--data">
                <div class="table__body__cell__policy-goal-container">
                  <span
                    class="table__body__cell__policy-goal table__body__cell__policy-goal"
                  >
                    {rows.actors.join(', ')}
                  </span>
                </div>
              </td>
              <td class="table__body__cell table__body__cell--data"
                >{rows.type}</td
              >
              <td class="table__body__cell table__body__cell--data">
                <div class="table__body__cell__policy-goal-container">
                  <span
                    class="table__body__cell__policy-goal table__body__cell__policy-goal--{rows.status
                      .toLowerCase()
                      .split(' ')
                      .join('-')}">{rows.status}</span
                  >
                </div>
              </td>
            </tr>
            <tr class="extra-content hide">
              <td class="table__body__cell" colspan="6">
                <div class="extra-content__container">
                  <div class="description">
                    {rows.recommendation.description}
                  </div>
                  <div class="link">
                    <a
                      href={rows.recommendation.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      >See Full Report<span class="icon-container"
                        ><Icon name="Icon-open-blank" class="icon" /></span
                      ></a
                    >
                  </div>
                </div>
              </td>
            </tr>
          {/if}
        {:else}
          <tr>
            <td class="table__body__cell table__body__cell--no-data" colspan="6"
              ><p class="table__body__cell__no-data__title">0 entries found.</p>
              <p class="table__body__cell__no-data__desc">
                Try changing or removing filters to adjust the results.
              </p>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style lang="scss">
  @use '../scss/abstracts/' as *;
  @use '../scss/components/table';
</style>

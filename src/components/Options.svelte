<script>
  import { onMount } from 'svelte'
  import Search from './Search.svelte'
  import Select from 'svelte-select'
  import Icon from './Icons.svelte'

  export let newDataset
  export let filteredData
  export let selectedActor
  export let selectedType
  export let selectedTechnology
  export let selectedStatus
  export let searchText = ''
  export let row

  $: totalEntries = filteredData.length

  const technologiesTotal = newDataset.data.filter(
    (row) => row.length !== 0
  ).length

  function getTechnologyCount(technology) {
    return newDataset.data.filter((row) => row.technology.includes(technology))
      .length
  }

  const optionIdentifier = 'value'
  const labelIdentifier = 'label'

  function updateActiveTab(val) {
    const value = val ? val.split('_').join('-') : 'all'
    const spanCountActive = document.querySelector(`.options__count--active`)
    const spanCount = document.querySelector(
      `.options__count[data-count="${value}"]`
    )
    spanCountActive.classList.remove('options__count--active')
    spanCount.classList.add(`options__count--active`)

    const activeTab = document.querySelector(`.options__btn--tab--active`)
    const tabActivate = document.querySelector(
      `.options__btn--tab[data-tab="${value}"]`
    )
    activeTab.classList.remove(
      'options__btn--tab--active',
      'options__btn--tab--Resilience--active',
      'options__btn--tab--Economic-Development--active',
      'options__btn--tab--Emissions-Reduction--active',
      'options__btn--tab--all--active'
    )
    tabActivate.classList.add(
      'options__btn--tab--active',
      `options__btn--tab--${value}--active`
    )
  }

  function removeRowActiveTitleStyle() {
    const title = document.querySelectorAll('.title--active')
    title.forEach((item) => {
      item.classList.remove('title--active')
    })
  }

  function removeExtraContentStyle() {
    const extraContent = document.querySelectorAll('.extra-content')
    extraContent.forEach((content) => {
      if (content.classList.contains('active')) {
        content.classList.remove('active')
        content.classList.add('hide')
      }
    })
  }

  function switchRowBottomLine() {
    const rowTitle = document.querySelectorAll('.title')
    const extraContent = document.querySelectorAll('.extra-content')
    extraContent.forEach((item) => {
      if (item.classList.contains('table__body__cell--border')) {
        item.classList.remove('table__body__cell--border')
      }
    })
    rowTitle.forEach((item) => {
      if (!item.classList.contains('table__body__cell--border')) {
        item.classList.add('table__body__cell--border')
      }
    })
  }

  function handleSelect(event, selectName) {
    if (row.isOpen) {
      row.isOpen = !row.isOpen
      removeRowActiveTitleStyle()
      removeExtraContentStyle()
      switchRowBottomLine()
    }
    if (selectName === 'Actor') {
      selectedActor = event.detail.value
    } else if (selectName === 'Type') {
      selectedType = event.detail.value
    } else if (selectName === 'Status') {
      selectedStatus = event.detail.value
    } else if (selectName === 'Technology-Select') {
      selectedTechnology = event.detail.value
    } else if (selectName === 'Technology') {
      updateActiveTab(event.target.value)
      selectedTechnology = event.target.value
    } else {
      selectedResourceType = event.detail.value
    }
  }

  function handleClear(selectName) {
    if (row.isOpen) {
      row.isOpen = !row.isOpen
      removeRowActiveTitleStyle()
      removeExtraContentStyle()
      switchRowBottomLine()
    }
    if (selectName === 'Actor') {
      selectedActor = ''
    } else if (selectName === 'Type') {
      selectedType = ''
    } else if (selectName === 'Status') {
      selectedStatus = ''
    } else if (selectName === 'Technology-Select') {
      selectedTechnology = ''
    } else {
      selectedTechnology = ''
    }
  }

  // handle the icon
  const chevronUp =
    '<svg class="iconUp" width="16" height="10" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M28 15 14 0 0 15h28z" fill="#000"/></svg>'
  const chevronDown =
    '<svg class="iconDown" width="16" height="10" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m0 0 14 15L28 0H0z" fill="#000"/></svg>'
  let chevron = chevronDown
  let isListOpen = false
  let listStateOpen = false

  $: chevron = isListOpen ? chevronUp : chevronDown

  function handleScrollLeft() {
    const tableContainer = document.getElementById('table-body')
    const btnIconLeft = document.querySelector('#icon-scroll-left')
    const btnIconRight = document.querySelector('#icon-scroll-right')

    tableContainer.scrollLeft -= 100
    if (btnIconRight.classList.contains('inactive')) {
      btnIconRight.classList.remove('inactive')
    }
    if (tableContainer.scrollLeft === 0) {
      btnIconLeft.classList.add('inactive')
    }
  }

  function handleScrollRight() {
    const tableContainer = document.getElementById('table-body')
    const table = document.getElementsByClassName('table')[0]
    const btnIconLeft = document.querySelector('#icon-scroll-left')
    const btnIconRight = document.querySelector('#icon-scroll-right')
    tableContainer.scrollLeft += 100
    if (btnIconLeft.classList.contains('inactive')) {
      btnIconLeft.classList.remove('inactive')
    }
    if (
      Math.ceil(tableContainer.scrollLeft) + tableContainer.offsetWidth >=
      table.offsetWidth
    ) {
      btnIconRight.classList.add('inactive')
    }
  }

  onMount(() => {
    isListOpen = false
    const tableContainer = document.getElementById('table-body')
    const table = document.getElementsByClassName('table')[0]
    const btnIconLeft = document.querySelector('#icon-scroll-left')
    const btnIconRight = document.querySelector('#icon-scroll-right')
    tableContainer.addEventListener('scroll', () => {
      const left = tableContainer.scrollLeft
      if (left > 0) {
        btnIconLeft.classList.remove('inactive')
      }
      if (
        Math.ceil(tableContainer.scrollLeft) + tableContainer.offsetWidth + 2 >=
        table.offsetWidth
      ) {
        btnIconRight.classList.add('inactive')
      }
      if (
        Math.ceil(tableContainer.scrollLeft) + tableContainer.offsetWidth + 2 <=
        table.offsetWidth
      ) {
        btnIconRight.classList.remove('inactive')
      }
      if (left === 0) {
        btnIconLeft.classList.add('inactive')
      }
    })
  })
</script>

<section class="table-container__header">
  <h2 class="table-container__subtitle">
    Explore Technology Policy Recommendations
  </h2>
</section>

<section class="options__container">
  <div class="options__header">
    <button
      class="options__btn options__btn--tab options__btn--tab--all options__btn--tab--active options__btn--tab--all--active"
      data-tab={'all'}
      on:click={(event) => handleSelect(event, 'Technology')}
      >All <span
        data-count={'all'}
        class="options__count options__count--active">{technologiesTotal}</span
      >
    </button>
    {#each newDataset.technologies as technology}
      <button
        class="options__btn options__btn--tab options__btn--tab--{technology
          .split('_')
          .join('-')} "
        data-tab={technology.split('_').join('-')}
        value={technology}
        on:click={(event) => handleSelect(event, 'Technology')}
        >{technology.split('_').join(' ')}
        <span
          data-count={technology.split('_').join('-')}
          class="options__count options__count--{technology
            .split('_')
            .join('-')}">{getTechnologyCount(technology)}</span
        >
      </button>
    {/each}
  </div>
</section>
<div class="selects">
  <div class="select-container select-technology">
    <div class="label">Technologies</div>
    <Select
      indicatorSvg={chevron}
      showChevron={true}
      {optionIdentifier}
      {labelIdentifier}
      items={newDataset.technologies}
      placeholder="Select a Technology"
      on:select={(event) => handleSelect(event, 'Technology-Select')}
      on:clear={() => handleClear('Technology-Select')}
    />
  </div>

  <div class="select-container">
    <div class="label">Actor</div>
    <Select
      indicatorSvg={chevron}
      showChevron={true}
      {optionIdentifier}
      {labelIdentifier}
      items={newDataset.actors}
      placeholder="Select an actor"
      on:select={(event) => handleSelect(event, 'Actor')}
      on:clear={() => handleClear('Actor')}
    />
  </div>

  <div class="select-container">
    <div class="label">Recommendation Type</div>
    <Select
      indicatorSvg={chevron}
      showChevron={true}
      {optionIdentifier}
      {labelIdentifier}
      items={newDataset.types}
      placeholder="Select a type"
      on:select={(event) => handleSelect(event, 'Type')}
      on:clear={() => handleClear('Type')}
    />
  </div>

  <div class="select-container">
    <div class="label">Recommendation Status</div>
    <Select
      indicatorSvg={chevron}
      showChevron={true}
      {optionIdentifier}
      {labelIdentifier}
      items={newDataset.status}
      placeholder="Select status"
      on:select={(event) => handleSelect(event, 'Status')}
      on:clear={() => handleClear('Status')}
    />
  </div>
</div>
<div class="options options__container options__container--sticky">
  <section class="options__navigation">
    <Search bind:searchText />
    <div class="options__navigation-inner">
      <span class="options__table-total-entries"
        >Showing {totalEntries} {totalEntries > 1 ? 'entries' : 'entry'}</span
      >
      <button
        id="btn-scroll-left"
        class="btn btn--scroll btn--scroll--left inactive"
        aria-label="Scroll table to the left"
        on:click={handleScrollLeft}
        ><Icon
          id="icon-scroll-left"
          name="Icon-left"
          class="icon inactive"
        /></button
      >
      <button
        id="btn-scroll-right"
        class="btn btn--scroll btn--scroll--right"
        aria-label="Scroll table to the right"
        on:click={handleScrollRight}
        ><Icon id="icon-scroll-right" name="Icon-right" class="icon" /></button
      >
    </div>
  </section>
</div>

<style lang="scss">
  @use '../scss/abstracts/' as *;
  @use '../scss/components/table-container';
  @use '../scss/components/button';
  @use '../scss/components/label';
  @use '../scss/components/select';
  @use '../scss/components/options';

  :global(.selectContainer) {
    &:hover {
      --borderRadius: 0;
      --background: #{$color-background-gray-100};
    }
  }

  :global(.selectContainer .item.active) {
    position: relative;
    --itemIsActiveBG: transparent;
    --itemIsActiveColor: $color-text-gray-500;
    --itemHoverBG: $color-background-gray-100;

    &::before {
      content: 'L';
      font-family: arial;
      -ms-transform: scaleX(-1) rotate(-35deg); /* IE 9 */
      -webkit-transform: scaleX(-1) rotate(-35deg); /* Chrome, Safari, Opera */
      transform: scaleX(-1) rotate(-35deg);
      display: inline-block;
      line-height: 1rem;
      color: $color-brand-blue-600;
      text-align: center;
      font-size: 14px;
      position: absolute;
      left: 16px;
      top: 10px;
    }
  }

  :global(.selectContainer) {
    --internalPadding: 0 4px !important;
    --itemFirstBorderRadius: 2px;
  }

  :global(.selectContainer .item) {
    --itemPadding: #{rem(8)} #{rem(40)} #{rem(12)};
    text-overflow: unset !important;
    overflow: unset !important;
    white-space: unset !important;
  }
  :global(.listContainer) {
    --listBorderRadius: rem(2);
    --listZIndex: 15;
    --listMaxHeight: #{rem(450)};
    --height: 1.2;
    min-width: 250px !important;
  }

  :global(.iconDown) {
    pointer-events: none;
    filter: invert(29%) sepia(13%) saturate(765%) hue-rotate(181deg)
      brightness(95%) contrast(89%);

    &:hover,
    &:focus {
      // color brand blue 600
      filter: invert(39%) sepia(72%) saturate(6596%) hue-rotate(200deg)
        brightness(100%) contrast(84%);
    }
  }

  :global(.iconUp) {
    pointer-events: none;
    filter: invert(29%) sepia(13%) saturate(765%) hue-rotate(181deg)
      brightness(95%) contrast(89%);

    &:hover,
    &:focus {
      // color brand blue 600
      filter: invert(39%) sepia(72%) saturate(6596%) hue-rotate(200deg)
        brightness(100%) contrast(84%);
    }
  }

  :global(.clearSelect) {
    width: rem(16);
    height: rem(16);
  }

  :global(.selectContainer > input) {
    --inputPadding: 0 28px 0 4px;
  }

  :global(.indicator) {
    --indicatorRight: 4px;
    top: auto !important;
  }

  :global(.selectedItem) {
    color: $color-brand-blue-600;
  }
  .select-container :global(.selectContainer:hover .indicator) {
    // color brand blue 600
    filter: invert(39%) sepia(72%) saturate(6596%) hue-rotate(200deg)
      brightness(100%) contrast(84%);
  }

  .select-container :global(.selectContainer:focus-within .indicator) {
    // color brand blue 600
    filter: invert(39%) sepia(72%) saturate(6596%) hue-rotate(200deg)
      brightness(100%) contrast(84%);
  }
</style>

<script>
  import Icon from './Icons.svelte'
  import ReportBlock from './ReportBlock.svelte';

  export let filteredData, contentDataset
  let authorities = []
  let tags = []
  const totalEntries = filteredData.length

  function getMostReferencedAuthorities() {
    filteredData.forEach((element) => {
      authorities.push(element.authority)
    })
    return countOccurences(authorities)
  }

  function getTopTags() {
    filteredData.forEach((element) => {
      element.tags.forEach((tag) => {
        tags.push(tag)
      })
    })
    return countOccurences(tags)
  }

  function countOccurences(array) {
    const counts = {}
    array.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1
    })
    return getTopThree(counts)
  }

  function getTopThree(obj) {
    const sortable = Object.fromEntries(
      Object.entries(obj).sort(([, a], [, b]) => b - a)
    )

    let topThree = []
    let objNames = Object.keys(sortable)

    objNames.forEach((name, i) => {
      if (i < 3) {
        topThree.push({ [name]: sortable[name] })
      }
    })
    return topThree
  }

  // const topTags = getTopTags()
  // const mostReferencedAuhorities = getMostReferencedAuthorities()
</script>

<div class="wrapper">
  <main class="container intro-content">
    {#if contentDataset }
      <!-- <p class="intro-content__overline--small">
          {contentDataset.overline_small}
      </p> -->
      <p class="intro-content__overline--regular">
        {contentDataset.overline_regular}
      </p>
      <h1 class="intro-content__title">
        {contentDataset.intro_content.title}
      </h1>
      <p class="intro-content__introduction">
        {contentDataset.intro_content.introduction}
      </p>
      <p class="intro-content__more">
        {contentDataset.intro_content.more}
      </p>
      <p class="intro-content__extra">
        {contentDataset.intro_content.extra}
      </p>
      <!-- <ReportBlock reportBlockContent = { contentDataset.report_block} /> -->
    {:else}
      <p>No content found.</p>
    {/if}
  </main>
</div>

<style lang="scss">
  @use '../scss/components/intro-content'
</style>

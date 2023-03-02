<script>
  import Header from './Header.svelte'
  import IntroContent from './IntroContent.svelte'
  import Options from './Options.svelte'
  import Table from './Table.svelte'
  import About from './About.svelte'
  import Footer from './Footer.svelte'

  export let contentDataset, newDataset, socialMediaDataset, reportsDataset
  let selectedActor = ''
  let selectedType = ''
  let selectedStatus = ''
  let selectedTechnology = ''
  let searchText
  $: row = { isOpen: false }
  $: filteredData = () => {
    return newDataset.data
      .filter( row => {
        const filteredRecommendation = searchText ? searchText : row.recommendation.title
        const filteredActor = selectedActor ? row.actors.includes(selectedActor) : row.actors
        const filteredType = selectedType ? selectedType : row.type
        const filteredStatus = selectedStatus ? selectedStatus : row.status
        const filteredTechnology = selectedTechnology ? selectedTechnology : row.technology
        return (
          (row.recommendation.title
            .toLowerCase()
            .includes(filteredRecommendation.toLowerCase()) ||
            row.actors.includes(filteredRecommendation.toLowerCase()) ||
            row.status
              .toLowerCase()
              .includes(filteredRecommendation.toLowerCase()) ||
            row.technology.toLowerCase().includes(filteredRecommendation.toLowerCase()) ||
            row.type
              .toLowerCase()
              .includes(filteredRecommendation.toLowerCase())
          ) &&
          row.type === filteredType &&
          row.technology === filteredTechnology &&
          row.status === filteredStatus &&
          filteredActor
        )
      })
      .sort((a, b) => {
        if (a.recommendation.title < b.recommendation.title) {
          return -1
        } else if (a.recommendation.title > b.recommendation.title) {
          return 1
        } else {
          return 0
        }
      })
  }
</script>

<div id="site-content">
  <Header {socialMediaDataset}/>

  <IntroContent filteredData={filteredData()} {contentDataset} />

  <section class="table-container">
    <Options
      {newDataset}
      filteredData={filteredData()}
      bind:row
      bind:selectedActor
      bind:selectedType
      bind:selectedStatus
      bind:selectedTechnology
      bind:searchText
    />

    <Table filteredData={filteredData()} bind:row />
  </section>
  <About {reportsDataset}/>
  <Footer {socialMediaDataset}/>
</div>

<style lang="scss">
  @use '../scss/components/table-container'
</style>

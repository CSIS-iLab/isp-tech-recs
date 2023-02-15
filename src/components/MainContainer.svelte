<script>
  import Header from './Header.svelte'
  import IntroContent from './IntroContent.svelte'
  import Options from './Options.svelte'
  import Table from './Table.svelte'
  import About from './About.svelte'
  import Footer from './Footer.svelte'

  export let dataset, contentDataset, newDataset
  let selectedActor = ''
  let selectedType = ''
  let selectedStatus = ''
  let selectedState = ''
  let selectedResourceType = ''
  let selectedAuthority = ''
  let selectedTags = []
  let selectedPolicyGoal = ''
  let searchText
  $: row = { isOpen: false }

  $: filteredData = () => {
    // return dataset.data
    // console.log(selectedActor)
    // console.log(newDataset.data)
    return newDataset.data
      .filter( row => {
        const filteredRecommendation = searchText ? searchText : row.recommendation.title
        // const filteredActor = selectedActor ? selectedActor : row.actors
        // const filteredActivity = searchText ? searchText : row.activity.title
        // const filteredState = selectedState ? selectedState : row.state
        // const filteredResource = selectedResourceType
          // ? selectedResourceType
          // : row.type_of_resource
        // const filteredAuthority = selectedAuthority
        //   ? selectedAuthority
        //   : row.authority
        // const filteredTags =
        //   selectedTags.length > 0
        //     ? row.tags.some((tag) => selectedTags.includes(tag))
        //     : row.tags
        // const filteredPolicyGoal = selectedPolicyGoal
        //   ? row.policy_goals.some((policy) =>
        //       selectedPolicyGoal.includes(policy)
        //     )
        //   : row.policy_goals
        // console.log(row)
        return (
          (row.recommendation.title
            .toLowerCase()
            .includes(filteredRecommendation.toLowerCase()) ||
            // row.actors.toLowerCase().includes(filteredRecommendation.toLowerCase()) ||
            row.status
              .toLowerCase()
              .includes(filteredRecommendation.toLowerCase()) ||
            row.type
              .toLowerCase()
              .includes(filteredRecommendation.toLowerCase())) 
              // .includes(filteredRecommendation.toLowerCase())) &&
          // row.actors === selectedActor
          // row.actor === selectedActor &&
          // row.type_of_resource === filteredResource &&
          // row.authority === filteredAuthority &&
          // filteredPolicyGoal &&
          // filteredTags
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
  <Header />

  <IntroContent filteredData={filteredData()} {contentDataset} />

  <section class="table-container">
    <Options
      {dataset}
      {newDataset}
      filteredData={filteredData()}
      bind:row
      bind:selectedActor
      bind:selectedAuthority
      bind:selectedResourceType
      bind:selectedState
      bind:selectedTags
      bind:selectedPolicyGoal
      bind:searchText
    />

    <Table filteredData={filteredData()} bind:row />
  </section>
  <About />
  <Footer />
</div>

<style lang="scss">
  @use '../scss/components/table-container'
</style>

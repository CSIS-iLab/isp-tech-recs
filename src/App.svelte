<script>
  import { onMount } from 'svelte'
  import { getData } from './data'
  import getNewData from './newData'
  import getContent from './dataContent'
  import MainContainer from './components/MainContainer.svelte'

  let dataset = {}
  let contentDataset = {}
  let newDataset = {}

  onMount(async () => {
    const res = await getData()
    const resContent = await getContent()
    const resNewData = await getNewData()
    dataset = res
    newDataset = resNewData
    contentDataset = resContent

    // if (contentDataset) {
    //   console.log(contentDataset)
    // }
    // if (dataset) {
    //   console.log(dataset)
    // }
    
    if (newDataset) {
      console.log(newDataset)
    }

  })
</script>

{#if dataset.data && dataset.data.length > 0 &&
  contentDataset.dataFormatted && contentDataset.dataFormatted.length > 0 &&
  newDataset.technologies && newDataset.technologies.length > 0
}
  <MainContainer {dataset} contentDataset = {contentDataset.dataFormatted[0]} {newDataset} />
{:else}
  <div class="loading-container">
    <div class="loading" />
  </div>
{/if}

<style lang="scss" global>
  @use './scss/main.scss';
</style>

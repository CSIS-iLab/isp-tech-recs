<script>
  import { onMount } from 'svelte'
  import getNewData from './newData'
  import getContent from './dataContent'
  import MainContainer from './components/MainContainer.svelte'

  // let dataset = {}
  let contentDataset = {}
  let newDataset = {}

  onMount(async () => {
    const resContent = await getContent()
    const resNewData = await getNewData()
    newDataset = resNewData
    contentDataset = resContent
    
    if (newDataset) {
      console.log(newDataset)
    }

  })
</script>

{#if contentDataset.dataFormatted && contentDataset.dataFormatted.length > 0 &&
  newDataset.technologies && newDataset.technologies.length > 0
}
  <MainContainer contentDataset = {contentDataset.dataFormatted[0]} {newDataset} />
{:else}
  <div class="loading-container">
    <div class="loading" />
  </div>
{/if}

<style lang="scss" global>
  @use './scss/main.scss';
</style>

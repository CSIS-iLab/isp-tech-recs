<script>
  import { onMount } from 'svelte'
  import getData from './data'
  import getContent from './data'
  import MainContainer from './components/MainContainer.svelte'

  let dataset = {}
  let contentDataset = {}

  onMount(async () => {
    const res = await getData()
    const resContent = await getContent()
    dataset = res
    contentDataset = resContent
    if (contentDataset) {
      console.log(contentDataset.data)
    }
  })
</script>

{#if dataset.data && dataset.data.length > 0}
  <MainContainer {dataset} />
{:else}
  <div class="loading-container">
    <div class="loading" />
  </div>
{/if}

<style lang="scss" global>
  @use './scss/main.scss';
</style>

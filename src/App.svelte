<script>
  import { onMount } from 'svelte'
  import getNewData from './newData'
  import getContent from './dataContent'
  import getSocialMedia from './socialMediaLinks'
  import getReports from './reportsLinks'
  import MainContainer from './components/MainContainer.svelte'

  // let dataset = {}
  let contentDataset = {}
  let newDataset = {}
  let socialMediaDataset = {}
  let reportsDataset = {}

  onMount(async () => {
    const resContent = await getContent()
    contentDataset = resContent

    const resNewData = await getNewData()
    newDataset = resNewData

    const resSocialMediaData = await getSocialMedia()
    socialMediaDataset = resSocialMediaData

    const resReports = await getReports()
    reportsDataset = resReports

    if (reportsDataset) {
      // console.log(newDataset)
      // console.log(socialMediaDataset)
      // console.log(reportsDataset)
    }

  })
</script>

{#if contentDataset.dataFormatted && contentDataset.dataFormatted.length > 0 &&
  newDataset.technologies && newDataset.technologies.length > 0 &&
  reportsDataset.reports && reportsDataset.reports.length > 0

}
  <MainContainer contentDataset = {contentDataset.dataFormatted[0]} {newDataset} {socialMediaDataset} {reportsDataset}/>
{:else}
  <div class="loading-container">
    <div class="loading" />
  </div>
{/if}

<style lang="scss" global>
  @use './scss/main.scss';
</style>

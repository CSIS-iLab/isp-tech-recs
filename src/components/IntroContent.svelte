<script>
  // import Icon from './Icons.svelte'
  // import ReportBlock from './ReportBlock.svelte';

  export let contentDataset
</script>

<div class="intro-content__background">
  <div class="container intro-content">
    {#if contentDataset }
      <p class="intro-content__overline--regular">
        {contentDataset.overline_regular}
      </p>
      <h1 class="intro-content__title">
        {contentDataset.intro_content.title}
      </h1>
      <p class="intro-content__introduction">
        {contentDataset.intro_content.introduction}
      </p>
    {:else}
      <p>No content found.</p>
    {/if}
  </div>
</div>
<div class="wrapper">
  <main class="container intro-content--extra">
    {#if contentDataset }
    <!-- <p class="intro-content__overline--small">
      {contentDataset.overline_small}
    </p> -->
      <!-- <p class="intro-content__overline--regular">
        {contentDataset.overline_regular}
      </p>
      <h1 class="intro-content__title">
        {contentDataset.intro_content.title}
      </h1> -->
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

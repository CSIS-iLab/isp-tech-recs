<script>
  import Button from "./Button.svelte"
  import Icon from "./Icons.svelte"
  export let reportBlockContent
</script>

{#if reportBlockContent}
  <div class="report-block">
    <div class="report-block__text">
      <p class="report-block__text--title">{reportBlockContent.title}</p>
      <p class="report-block__text--description">{reportBlockContent.description}</p>
      <Button id="download-report" text="Read Report" classes="btn btn--outline" ariaLabel="Read Report"/>
      <a class="btn btn--outline" href={reportBlockContent.url} target="_blank" rel="noreferrer">Read Report</a>
    </div>
    <div class="report-block__img">
      <img src={reportBlockContent.image} alt={reportBlockContent.imageAlt} class="report-block__image">
    </div>
  </div>
{/if}
<style lang="scss">
  @use '../scss/components/report-block'
</style>

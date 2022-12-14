<script>
  import Button from "./Button.svelte"
  export let reportBlockContent
</script>

{#if reportBlockContent}
  <div class="report-block">
    <p>{reportBlockContent.title}</p>
    <p>{reportBlockContent.description}</p>
    <img src={reportBlockContent.image} alt={reportBlockContent.imageAlt} class="report-block__image">
    <Button id="Icon-info" text="Read Report" classes="btn"/>
  </div>
{/if}
<style lang="scss">
  @use '../scss/components/report-block'
</style>

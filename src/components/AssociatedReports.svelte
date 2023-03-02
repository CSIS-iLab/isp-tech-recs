<script>
  import Icon from "./Icons.svelte"

  export let reportsDataset
</script>

<div class="reports">
  <p class="reports__title">Associated Reports</p>
  <ul>
    {#each reportsDataset.reports as report}
      <li>
        <a
          class="reports__link"
          href={report.link}
          target="_blank"
          rel="noreferrer"
          >{report.title}<span class="icon-container"
            ><Icon class="icon__report" name="Icon-open-blank" /></span
          ></a
        >
      </li>{/each}
  </ul>
</div>
<style lang="scss">
  @use '../scss/components/associated-reports';
</style>
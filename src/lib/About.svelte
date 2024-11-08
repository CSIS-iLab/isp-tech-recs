<script>
  import Icon from './Icons.svelte'
  import DevelopmentTeam from './DevelopmentTeam.svelte'
  import AssociatedReports from './AssociatedReports.svelte'

  export let reportsDataset, about
</script>

<section class="about" id="about">
  <div class="about__container">
    <h2 class="about__subtitle">About</h2>
    <div class="about__description">
      <p id="description">
        {about.description}
      </p>
      <p id="acknowledgement">
        {about.acknowledgement}
      </p>
    </div>

    <AssociatedReports {reportsDataset} />

    <DevelopmentTeam />

    <div class="back-top-container">
      <a class="back-top-container__link" href="#top"
        ><span>Back to Top</span><span
          class="back-top-container__icon-container back-top__icon-container"
        >
          <Icon class="icon__back-top" name="Icon-arrow-up" />
        </span>
      </a>
    </div>
  </div>
</section>

<style lang="scss">
  @use '../scss/components/about';
</style>

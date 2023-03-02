<script>
  import Icon from './Icons.svelte'
  import DevelopmentTeam from './DevelopmentTeam.svelte'
  import AssociatedReports from './AssociatedReports.svelte'

  export let reportsDataset
</script>

<section class="about" id="about">
  <div class="about__container">
    <h2 class="about__subtitle">About</h2>
    <div class="about__description">
      <p>
        The CSIS International Security Program (ISP) is a constant source of reliable analysis on the
        international security and defense landscape. Our resident experts come to CSIS with extensive
        backgrounds from the Department of Defense, National Security Council, Department of State,
        U.S. intelligence community, defense industry, and academia.
      </p>
      <p>
        This website is made possible by support from Amazon Web Services.
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

<script>
  import Icon from './Icons.svelte'
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
    <div class="about__reports">
      <p class="about__reports__title">Associated Reports</p>
      <ul>
        <li>
          <a
            class="about__reports__link"
            href="https://www.csis.org/"
            target="_blank"
            rel="noreferrer"
            >Report Title<span
              class="icon-container"
              ><Icon class="icon__report" name="Icon-open-blank" /></span
            ></a
          >
        </li>
        <li>
          <a
            class="about__reports__link"
            href="https://www.csis.org/"
            target="_blank"
            rel="noreferrer"
            >Report 2<span
              class="icon-container"
              ><Icon class="icon__report" name="Icon-open-blank" /></span
            ></a
          >
        </li>
        <li>
          <a
            class="about__reports__link"
            href="https://www.csis.org/"
            target="_blank"
            rel="noreferrer"
            >Report 3<span class="icon-container"
              ><Icon class="icon__report" name="Icon-open-blank" /></span
            ></a
          >
        </li>
      </ul>
    </div>
    <!-- <div class="about__initiative">
      <p>
        The <a
          class="about__initiative__link"
          href="https://www.csis.org/programs/energy-security-and-climate-change-program/projects/clean-resilient-states-initiative"
          target="_blank"
          rel="noreferrer">Technology Policy Recommendations Initiative</a
        > is a project developed by the CSIS International Security Program
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
    </div> -->
    <div class="about__development">
      <h3 class="about__development__title">Development Team</h3>
      <p class="about__development__description">
        The Technology Policy Recommendations database is a product of the <a
          class="about__development__link"
          href="https://www.csis.org/programs/dracopoulos-ideas-lab"
          target="_blank"
          rel="noreferrer">Andreas C. Dracopoulos iDeas Lab</a
        >, the in-house digital, multimedia, and design agency at the Center for
        Strategic and International Studies.
      </p>
      <p class="about__development__description">
        Produced by Christina Hamm, Tucker Harris, Serven Maraghi, José Romero.
      </p>
    </div>
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

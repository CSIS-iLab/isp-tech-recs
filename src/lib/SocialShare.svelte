<script>
  import Icon from './Icons.svelte'

  export let socialMediaDataset

  function copyURL(e) {
    e.preventDefault()
    const url = window.location.href
    //Use the clipboard's writeText method to pass the inputs text to the clipboard
    navigator.clipboard.writeText(url).then((res) => {})
  }
  function getEmail(array) {
    return array.find((element) => element.platform === 'email').link
  }
</script>

<ul class="share">
  <li class="share__item">
    <a
      href="https://www.facebook.com/sharer.php?u={window.location.href}"
      class="share__link"
      target="_blank"
      aria-label="Share on Facebook"
      rel="noreferrer"
    >
      <Icon class="icon__share" name="Icon-facebook" />
    </a>
  </li>
  <li class="share__item">
    <a
      href="https://twitter.com/intent/tweet?url={window.location
        .href}&amp;via=CSIS&amp;related=CSIS"
      class="share__link"
      target="_blank"
      aria-label="Share on Twitter"
      rel="noreferrer"
    >
      <Icon class="icon__share" name="Icon-twitter" />
    </a>
  </li>
  <li class="share__item">
    <a
      href="https://www.linkedin.com/shareArticle?mini=true&url={window.location
        .href}&source=CSIS"
      class="share__link"
      target="_blank"
      aria-label="Share on Linkedin"
      rel="noreferrer"
    >
      <Icon class="icon__share" name="Icon-linkedin" />
    </a>
  </li>
  <li class="share__item">
    <a
      href="mailto:{getEmail(socialMediaDataset.socialMedia)}?subject=Tech Recs"
      class="share__link"
      aria-label="Share via email"
    >
      <Icon class="icon__share" name="Icon-email" />
    </a>
  </li>
  <li class="share__item">
    <button class="share__link" aria-label="Copy URL" on:click={copyURL}>
      <Icon class="icon__share" name="Icon-link-chain" />
    </button>
  </li>
</ul>

<style lang="scss">
  @use '../scss/components/social-share';
</style>

<script>
  import Icon from './Icons.svelte'

  export let socialMediaDataset
  const socialMedia = socialMediaDataset.socialMedia.filter( social => social.platform != 'email')
</script>

<ul class="social">
  {#each socialMedia as social}
    <li class="social__item">
      <a
        href="{social.link}"
        class="social__link"
        target="_blank"
        aria-label="Visit the ISP {social.platform} page"
        rel="noreferrer"
      >
        <Icon class="icon__social" name="Icon-{social.platform.toLowerCase()}" />
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  @use '../scss/components/social-share';
</style>

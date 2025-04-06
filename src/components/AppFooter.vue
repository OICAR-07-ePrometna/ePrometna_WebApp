<template>
  <v-footer height="40" app>
    <div
      class="text-caption text-disabled"
      style="position: absolute; left: 16px;"
    >
    <v-icon icon="$vuetify" size="16" />
      <a
        class="text-decoration-none on-surface"
        href="https://github.com/OICAR-07-ePrometn"
        rel="noopener noreferrer"
        target="_blank"
        title="Organisation GitHub"
      >
        <v-icon icon="mdi-github" size="16" />
        <span class="d-none d-sm-inline-block">Visit our GitHub organisation page</span>
      </a>
    </div>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      &copy; 2025 <span class="d-none d-sm-inline-block">Algebra, OICAR</span>
      —
      <a
        class="text-decoration-none on-surface"
        href="https://www.apache.org/licenses/LICENSE-2.0"
        rel="noopener noreferrer"
        target="_blank"
      >
      Apache 2.0 Licence
      </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)

  .small-text
    font-size: 0.8rem // Adjust font size for smaller text
    color: rgba(var(--v-theme-on-background), 0.7) // Optional: Adjust color for better visibility
</style>

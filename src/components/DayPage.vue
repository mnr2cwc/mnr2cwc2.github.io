<template>
  <div class="day-page" v-if="day">
    <!-- Day Hero Banner -->
    <div class="day-banner">
      <div class="banner-inner">
        <div class="banner-text">
          <span class="banner-eyebrow">
            <span class="day-num-label">{{ day.label }}</span>
            <span class="sep">·</span>
            <span class="location-label">{{ day.location }}</span>
          </span>
          <h2 class="banner-title">{{ day.title }}</h2>
          <p class="banner-desc">{{ day.description }}</p>
        </div>
        <div class="banner-meta">
          <div class="meta-item">
            <span class="meta-icon">📍</span>
            <span>{{ day.location }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">🗓</span>
            <span>{{ day.label }} of 9</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Photo Grid -->
    <div class="photos-section">
      <div class="photos-header">
        <h3 class="photos-title">Photos</h3>
        <span class="photos-count">10 images</span>
      </div>

      <div class="photo-grid">
        <div
          v-for="n in 10"
          :key="n"
          class="photo-slot"
          :class="{ featured: n === 1 }"
          @click="openLightbox(n)"
        >
          <img :src="photoSrc" :alt="`Photo ${n}`" class="photo-img" />
          <!-- <div class="photo-placeholder">
            <div class="placeholder-inner">
              <svg class="placeholder-icon" viewBox="0 0 48 48" fill="none">
                <rect x="4" y="8" width="40" height="32" rx="3" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="16" cy="20" r="4" stroke="currentColor" stroke-width="1.5"/>
                <path d="M4 34 L14 24 L22 32 L30 22 L44 34" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
              <span class="placeholder-text">Photo {{ n }}</span>
              <span class="placeholder-sub">Click to add image</span>
            </div>
          </div> -->
          <div class="photo-overlay">
            <span class="photo-num">{{ String(n).padStart(2, "0") }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">✕</button>
        <button
          class="lightbox-prev"
          @click="prevPhoto"
          :disabled="lightboxIndex <= 1"
        >
          ‹
        </button>
        <div class="lightbox-content">
          <div class="lightbox-placeholder">
            <svg viewBox="0 0 80 60" fill="none" class="lb-icon">
              <rect
                x="2"
                y="2"
                width="76"
                height="56"
                rx="4"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <circle
                cx="24"
                cy="22"
                r="8"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M2 50L20 32L34 46L50 28L78 50"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
            <p>Photo {{ lightboxIndex }}</p>
            <p class="lb-sub">{{ day.label }} · {{ day.location }}</p>
          </div>
        </div>
        <button
          class="lightbox-next"
          @click="nextPhoto"
          :disabled="lightboxIndex >= 10"
        >
          ›
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  const photoSrc = "/images/IMG_1387.JPG";
  const props = defineProps({
    day: {
      type: Object,
      required: true,
    },
  });

  const lightboxOpen = ref(false);
  const lightboxIndex = ref(1);

  function openLightbox(n) {
    lightboxIndex.value = n;
    lightboxOpen.value = true;
  }

  function closeLightbox() {
    lightboxOpen.value = false;
  }

  function prevPhoto() {
    if (lightboxIndex.value > 1) lightboxIndex.value--;
  }

  function nextPhoto() {
    if (lightboxIndex.value < 10) lightboxIndex.value++;
  }
</script>

<style scoped>
  .day-page {
    min-height: calc(100vh - 64px);
  }

  /* Banner */
  .day-banner {
    background: var(--ink);
    padding: 3.5rem 2rem 3rem;
    border-bottom: 3px solid var(--terracotta);
    position: relative;
    overflow: hidden;
  }

  .day-banner::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 70% 50%,
      rgba(196, 98, 45, 0.12) 0%,
      transparent 65%
    );
    pointer-events: none;
  }

  .banner-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2rem;
    align-items: start;
  }

  .banner-eyebrow {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .day-num-label {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--terracotta);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .sep {
    color: #4a3f35;
  }

  .location-label {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--inca-gold);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .banner-title {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 3rem);
    font-weight: 700;
    color: var(--sand);
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  .banner-desc {
    font-size: 0.92rem;
    color: #9c8e80;
    line-height: 1.75;
    max-width: 60ch;
  }

  .banner-meta {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.5rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: #6b5b45;
    letter-spacing: 0.06em;
  }

  .meta-icon {
    font-size: 1rem;
  }

  /* Photos Section */
  .photos-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2.5rem 2rem 4rem;
  }

  .photos-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e0d5c5;
  }

  .photos-title {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--ink);
  }

  .photos-count {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--stone);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* Photo Grid — first image is featured (spans 2 cols + 2 rows) */
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }

  .photo-slot {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    background: white;
    border: 1px solid #e0d5c5;
    aspect-ratio: 4 / 3;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .photo-slot.featured {
    grid-column: span 2;
    grid-row: span 2;
    aspect-ratio: unset;
  }

  .photo-slot:hover {
    transform: scale(1.015);
    box-shadow: 0 6px 20px rgba(26, 21, 16, 0.15);
    z-index: 2;
  }

  .photo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f0e8dc 0%, #e8dcc8 100%);
    min-height: 160px;
  }

  .photo-slot.featured .photo-placeholder {
    min-height: 340px;
  }

  .placeholder-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #b8a898;
  }

  .placeholder-icon {
    width: 36px;
    height: 36px;
    color: #c4a882;
  }

  .photo-slot.featured .placeholder-icon {
    width: 52px;
    height: 52px;
  }

  .placeholder-text {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    color: #a09080;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .placeholder-sub {
    font-size: 0.62rem;
    color: #c4b4a0;
  }

  .photo-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem 0.75rem;
    background: linear-gradient(
      to top,
      rgba(26, 21, 16, 0.45) 0%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.15s;
  }

  .photo-slot:hover .photo-overlay {
    opacity: 1;
  }

  .photo-num {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  /* Lightbox */
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(10, 8, 6, 0.92);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 2rem;
  }

  .lightbox-content {
    max-width: 800px;
    width: 100%;
    aspect-ratio: 4/3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lightbox-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: #1e1812;
    border-radius: 8px;
    border: 1px dashed #4a3f35;
    color: #6b5b45;
  }

  .lb-icon {
    width: 80px;
    height: 60px;
    color: #4a3f35;
  }

  .lightbox-placeholder p {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: #8a7060;
  }

  .lb-sub {
    font-family: var(--font-mono);
    font-size: 0.68rem !important;
    color: #4a3f35 !important;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .lightbox-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: 1px solid #4a3f35;
    color: #8a7060;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }

  .lightbox-close:hover {
    background: var(--terracotta);
    border-color: var(--terracotta);
    color: white;
  }

  .lightbox-prev,
  .lightbox-next {
    background: none;
    border: 1px solid #4a3f35;
    color: #8a7060;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.15s;
    line-height: 1;
  }

  .lightbox-prev:hover:not(:disabled),
  .lightbox-next:hover:not(:disabled) {
    background: var(--terracotta);
    border-color: var(--terracotta);
    color: white;
  }

  .lightbox-prev:disabled,
  .lightbox-next:disabled {
    opacity: 0.25;
    cursor: default;
  }

  @media (max-width: 900px) {
    .banner-inner {
      grid-template-columns: 1fr;
    }
    .banner-meta {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .photo-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .photo-slot.featured {
      grid-column: span 2;
    }
  }

  @media (max-width: 540px) {
    .photo-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>

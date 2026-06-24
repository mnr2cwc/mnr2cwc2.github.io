<template>
  <div class="overview">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-text">
        <p class="hero-eyebrow">A Personal Journey</p>
        <h2 class="hero-headline">Nine days across<br /><em>the heart of Peru</em></h2>
        <p class="hero-sub">From the mountaintop citadel of the Incas to the Andean cloud forests, the streets of Lima, and the desert dunes of Ica — a 9-day journey across one of the world's most extraordinary countries.</p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">9</span>
            <span class="stat-label">Days</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">3</span>
            <span class="stat-label">Regions</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">5,200m</span>
            <span class="stat-label">Highest point</span>
          </div>
        </div>
      </div>
      <div class="hero-map-wrap">
        <div id="peru-map" class="map-container" ref="mapEl"></div>
        <p class="map-caption">Click any marker to jump to that day</p>
      </div>
    </section>

    <!-- Timeline -->
    <section class="timeline-section">
      <div class="section-label">
        <span class="label-line"></span>
        <span class="label-text">Itinerary</span>
        <span class="label-line"></span>
      </div>
      <div class="timeline">
        <div
          v-for="(item, i) in timeline"
          :key="item.id"
          class="timeline-item"
          :class="item.type"
          @click="item.type === 'day' && $emit('go-to-day', item.id)"
        >
          <div v-if="item.type === 'day'" class="day-card">
            <div class="day-card-top">
              <span class="day-number">{{ item.label }}</span>
              <span class="day-location-tag">{{ item.location }}</span>
            </div>
            <h3 class="day-card-title">{{ item.title }}</h3>
            <p class="day-card-desc">{{ item.shortDesc }}</p>
            <button class="see-photos-btn">See photos →</button>
          </div>
          <div v-else class="transport-card">
            <div class="transport-icon">{{ item.icon }}</div>
            <div class="transport-text">
              <span class="transport-route">{{ item.from }} → {{ item.to }}</span>
              <span class="transport-detail">{{ item.detail }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['go-to-day'])
const mapEl = ref(null)
let mapInstance = null

const days = [
  { id: 'day1', label: 'Day 1', location: 'Cusco',         title: 'Arrival in Cusco',           shortDesc: 'Landing at Alejandro Velasco Astete Airport. First glimpse of cobblestone streets and colonial architecture built atop Inca stonework.',   coords: [-13.5319, -71.9675] },
  { id: 'day2', label: 'Day 2', location: 'Cusco',         title: 'Sacred Valley',              shortDesc: 'Pisac ruins and market, Ollantaytambo fortress — a full day in the Sacred Valley of the Incas.',                                          coords: [-13.4162, -72.0666] },
  { id: 'day3', label: 'Day 3', location: 'Machu Picchu',  title: 'Machu Picchu',               shortDesc: 'Train to Aguas Calientes, then ascending into the clouds to walk the ancient citadel.',                                                    coords: [-13.1631, -72.5450] },
  { id: 'day4', label: 'Day 4', location: 'Cusco',         title: 'City of Cusco',              shortDesc: 'Plaza de Armas, the Cathedral, Sacsayhuamán fortress, and the artisan quarter of San Blas.',                                               coords: [-13.5170, -71.9784] },
  { id: 'day5', label: 'Day 5', location: 'Cusco',         title: 'Peruvian Cuisine & Markets', shortDesc: 'Cooking class, San Pedro Market, and a long dinner of ceviche and lomo saltado.',                                                          coords: [-13.5236, -71.9724] },
  { id: 'day6', label: 'Day 6', location: 'Cusco',         title: 'Moray & Maras Salt Mines',   shortDesc: 'Circular Inca terraces at Moray and the shimmering pink salt pans of Maras.',                                                              coords: [-13.3370, -72.1929] },
  { id: 'day7', label: 'Day 7', location: 'Cusco',         title: 'Rainbow Mountain',           shortDesc: 'The trek to Vinicunca at 5,200m — striped mineral ridgelines rippling across the high Andes.',                                             coords: [-13.7210, -71.3312] },
  { id: 'day8', label: 'Day 8', location: 'Lima',          title: 'Lima: Miraflores & Barranco',shortDesc: 'Flying to the Pacific capital. Afternoon in Miraflores, evening in the bohemian arts district of Barranco.',                               coords: [-12.1211, -77.0302] },
  { id: 'day9', label: 'Day 9', location: 'Paracas & Ica', title: 'Desert & Ballestas Islands', shortDesc: 'Boat tour of the Ballestas Islands, then sandboarding the dunes of Huacachina.',                                                           coords: [-13.8417, -76.2503] },
]

const timeline = [
  { type: 'transport', icon: '✈️', from: 'Indianapolis', to: 'Cusco', detail: 'Via connecting flight — 18 hrs travel' },
  ...days.flatMap((day, i) => {
    const items = [{ type: 'day', ...day }]
    if (i === 6) items.push({ type: 'transport', icon: '✈️', from: 'Cusco', to: 'Lima', detail: '~1.5 hr domestic flight' })
    if (i === 7) items.push({ type: 'transport', icon: '🚌', from: 'Lima', to: 'Paracas & Ica', detail: '~4 hrs by bus south' })
    return items
  }),
  { type: 'transport', icon: '✈️', from: 'Lima', to: 'Indianapolis', detail: 'Return flight home' },
]

onMounted(async () => {
  const L = await import('leaflet')

  mapInstance = L.map(mapEl.value, {
    center: [-13.5, -73.0],
    zoom: 6,
    zoomControl: true,
    scrollWheelZoom: false,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(mapInstance)

  // Draw route line
  const routeCoords = days.map(d => d.coords)
  L.polyline(routeCoords, {
    color: '#C4622D',
    weight: 2.5,
    opacity: 0.7,
    dashArray: '6, 6',
  }).addTo(mapInstance)

  // Add markers
  days.forEach((day, i) => {
    const icon = L.divIcon({
      className: '',
      html: `<div style="
        width:32px;height:32px;
        background:#C4622D;
        border:2.5px solid #F5F0E8;
        border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        font-family:'Space Mono',monospace;
        font-size:10px;font-weight:700;
        color:white;
        box-shadow:0 2px 8px rgba(0,0,0,0.35);
        cursor:pointer;
      ">${i + 1}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    const marker = L.marker(day.coords, { icon }).addTo(mapInstance)
    marker.bindPopup(`
      <div style="font-family:'Inter',sans-serif;min-width:160px;">
        <div style="font-size:10px;color:#C4622D;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:2px;">${day.label} · ${day.location}</div>
        <div style="font-size:13px;font-weight:600;color:#1A1510;">${day.title}</div>
      </div>
    `, { maxWidth: 220 })
    marker.on('click', () => {
      emit('go-to-day', day.id)
    })
  })
})

onUnmounted(() => {
  if (mapInstance) mapInstance.remove()
})
</script>

<style scoped>
.overview {
  background: var(--mist);
}

/* Hero */
.hero {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 3rem;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  align-items: start;
}

.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-bottom: 1rem;
}

.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 700;
  color: var(--ink);
  line-height: 1.15;
  margin-bottom: 1.25rem;
}

.hero-headline em {
  color: var(--terracotta);
  font-style: italic;
}

.hero-sub {
  font-size: 0.95rem;
  color: var(--stone);
  line-height: 1.75;
  max-width: 42ch;
  margin-bottom: 2rem;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--deep-green);
  line-height: 1;
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--stone);
  margin-top: 0.25rem;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: #D5C9BA;
}

.hero-map-wrap {
  position: relative;
}

.map-container {
  width: 100%;
  height: 480px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(26, 21, 16, 0.15);
  border: 1px solid #D5C9BA;
}

.map-caption {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--stone);
  text-align: center;
  margin-top: 0.6rem;
  letter-spacing: 0.06em;
}

/* Timeline */
.timeline-section {
  padding: 3rem 2rem 5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.label-line {
  flex: 1;
  height: 1px;
  background: #D5C9BA;
}

.label-text {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--stone);
  white-space: nowrap;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  position: relative;
}

/* Day cards */
.day-card {
  background: white;
  border: 1px solid #E0D5C5;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.timeline-item.day:hover .day-card {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(196, 98, 45, 0.15);
}

.day-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.day-number {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--terracotta);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.day-location-tag {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  background: var(--deep-green);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  letter-spacing: 0.04em;
}

.day-card-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
}

.day-card-desc {
  font-size: 0.82rem;
  color: var(--stone);
  line-height: 1.6;
  flex: 1;
}

.see-photos-btn {
  background: none;
  border: none;
  color: var(--terracotta);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  cursor: pointer;
  padding: 0;
  text-align: left;
  margin-top: 0.25rem;
  transition: color 0.15s;
}

.see-photos-btn:hover {
  color: var(--deep-green);
}

/* Transport cards */
.transport-card {
  background: none;
  border: 1px dashed #D0C4B4;
  border-radius: 8px;
  padding: 0.9rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  grid-column: span 1;
}

.transport-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.transport-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.transport-route {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--ink);
}

.transport-detail {
  font-size: 0.75rem;
  color: var(--stone);
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2.5rem 1.25rem 2rem;
  }
  .map-container {
    height: 320px;
  }
  .timeline {
    grid-template-columns: 1fr;
  }
}
</style>

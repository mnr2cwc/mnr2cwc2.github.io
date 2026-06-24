<template>
  <div class="app">
    <!-- Header -->
    <header class="site-header">
      <div class="header-inner">
        <div class="header-title" @click="activePage = 'overview'">
          <span class="header-eyebrow">9 Days in</span>
          <h1 class="header-name">Perú</h1>
        </div>
        <nav class="main-nav">
          <button
            class="nav-btn"
            :class="{ active: activePage === 'overview' }"
            @click="activePage = 'overview'"
          >Overview</button>
          <button
            v-for="day in days"
            :key="day.id"
            class="nav-btn nav-day"
            :class="{ active: activePage === day.id }"
            @click="activePage = day.id"
          >{{ day.shortLabel }}</button>
        </nav>
      </div>
    </header>

    <!-- Page Views -->
    <main class="main-content">
      <OverviewPage v-if="activePage === 'overview'" @go-to-day="activePage = $event" />
      <DayPage v-else :day="currentDay" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import OverviewPage from './components/OverviewPage.vue'
import DayPage from './components/DayPage.vue'

const activePage = ref('overview')

const days = [
  { id: 'day1',  label: 'Day 1',  shortLabel: 'D1',  location: 'Cusco',   title: 'Arrival in Cusco',              description: 'Landing at Alejandro Velasco Astete Airport and settling into the ancient capital of the Inca Empire. First impressions of cobblestone streets and colonial architecture layered over Inca stonework.', coords: [-13.5319, -71.9675] },
  { id: 'day2',  label: 'Day 2',  shortLabel: 'D2',  location: 'Cusco',   title: 'Sacred Valley',                 description: 'A full day in the Sacred Valley of the Incas — exploring the Pisac ruins and market, and the fortress of Ollantaytambo perched above the valley floor.', coords: [-13.4162, -72.0666] },
  { id: 'day3',  label: 'Day 3',  shortLabel: 'D3',  location: 'Cusco',   title: 'Machu Picchu',                  description: 'The iconic day: taking the train to Aguas Calientes and ascending to Machu Picchu. Walking among the cloud-shrouded citadel at the top of the world.', coords: [-13.1631, -72.5450] },
  { id: 'day4',  label: 'Day 4',  shortLabel: 'D4',  location: 'Cusco',   title: 'City of Cusco',                 description: 'Exploring the Plaza de Armas, the Cathedral of Cusco, Sacsayhuamán fortress, and wandering through the San Blas neighborhood of artisan workshops.', coords: [-13.5170, -71.9784] },
  { id: 'day5',  label: 'Day 5',  shortLabel: 'D5',  location: 'Cusco',   title: 'Peruvian Cuisine & Markets',    description: 'A day dedicated to food culture — a cooking class, the San Pedro Market, and a dinner of ceviche and lomo saltado in a local chicha restaurant.', coords: [-13.5236, -71.9724] },
  { id: 'day6',  label: 'Day 6',  shortLabel: 'D6',  location: 'Cusco',   title: 'Moray & Maras Salt Mines',      description: 'Visiting the remarkable circular Inca terraces of Moray and the shimmering pink salt pans of Maras, two of the lesser-known but most visually striking Inca sites.', coords: [-13.3370, -72.1929] },
  { id: 'day7',  label: 'Day 7',  shortLabel: 'D7',  location: 'Cusco',   title: 'Rainbow Mountain',              description: 'An early start for the trek to Vinicunca — the Rainbow Mountain — at over 5,000 meters. Striped mineral formations rippling across the high Andes.', coords: [-13.7210, -71.3312] },
  { id: 'day8',  label: 'Day 8',  shortLabel: 'D8',  location: 'Lima',    title: 'Lima: Miraflores & Barranco',   description: 'Flying into the capital on the Pacific coast. Afternoon in Miraflores, evening in Barranco — Lima\'s bohemian arts district, with dinner in one of the world\'s top-ranked restaurants.', coords: [-12.1211, -77.0302] },
  { id: 'day9',  label: 'Day 9',  shortLabel: 'D9',  location: 'Paracas & Ica', title: 'Desert & Ballestas Islands', description: 'A day trip south of Lima to the Paracas Reserve and a boat tour of the Ballestas Islands — sea lions, penguins, and pelicans. Afternoon in Ica with a sandboarding excursion on the dunes of Huacachina.', coords: [-13.8417, -76.2503] },
]

const currentDay = computed(() => days.find(d => d.id === activePage.value))
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--ink);
  border-bottom: 2px solid var(--terracotta);
}

.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 64px;
}

.header-title {
  cursor: pointer;
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-shrink: 0;
}

.header-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--inca-gold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.header-name {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--sand);
  letter-spacing: 0.02em;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  overflow-x: auto;
  scrollbar-width: none;
  flex: 1;
}

.main-nav::-webkit-scrollbar {
  display: none;
}

.nav-btn {
  background: none;
  border: 1px solid transparent;
  color: #8A7E72;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.nav-btn:hover {
  color: var(--sand);
  border-color: #3A3028;
}

.nav-btn.active {
  background: var(--terracotta);
  color: white;
  border-color: var(--terracotta);
}

.nav-day {
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.main-content {
  flex: 1;
}
</style>

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
          >
            Overview
          </button>
          <button
            v-for="day in days"
            :key="day.id"
            class="nav-btn nav-day"
            :class="{ active: activePage === day.id }"
            @click="activePage = day.id"
          >
            {{ day.shortLabel }}
          </button>
        </nav>
      </div>
    </header>

    <!-- Page Views -->
    <main class="main-content">
      <OverviewPage
        v-if="activePage === 'overview'"
        @go-to-day="activePage = $event"
      />
      <DayPage v-else :day="currentDay" />
    </main>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import OverviewPage from "./components/OverviewPage.vue";
  import DayPage from "./components/DayPage.vue";

  const activePage = ref("overview");

  // const days = [
  //   {
  //     id: "day1",
  //     label: "Day 1",
  //     shortLabel: "D1",
  //     location: "Cusco",
  //     title: "Arrival in Cusco",
  //     description:
  //       "Landing at Alejandro Velasco Astete Airport and settling into the ancient capital of the Inca Empire. First impressions of cobblestone streets and colonial architecture layered over Inca stonework.",
  //     coords: [-13.5319, -71.9675],
  //   },
  //   {
  //     id: "day2",
  //     label: "Day 2",
  //     shortLabel: "D2",
  //     location: "Cusco",
  //     title: "Sacred Valley",
  //     description:
  //       "A full day in the Sacred Valley of the Incas — exploring the Pisac ruins and market, and the fortress of Ollantaytambo perched above the valley floor.",
  //     coords: [-13.4162, -72.0666],
  //   },
  //   {
  //     id: "day3",
  //     label: "Day 3",
  //     shortLabel: "D3",
  //     location: "Cusco",
  //     title: "San Jeronimo Cooking Class",
  //     description:
  //       "Learn to cook traditional Peruvian dishes in the historic San Jeronimo neighborhood and hike up to Acient Ruins.",
  //     coords: [-13.1631, -72.545],
  //   },
  //   {
  //     id: "day4",
  //     label: "Day 4",
  //     shortLabel: "D4",
  //     location: "Cusco",
  //     title: "City of Cusco",
  //     description:
  //       "Exploring the Plaza de Armas, the Cathedral of Cusco, Sacsayhuamán fortress, and wandering through the San Blas neighborhood of artisan workshops.",
  //     coords: [-13.517, -71.9784],
  //   },
  //   {
  //     id: "day5",
  //     label: "Day 5",
  //     shortLabel: "D5",
  //     location: "Cusco",
  //     title: "Peruvian Cuisine & Markets",
  //     description:
  //       "A day dedicated to food culture — a cooking class, the San Pedro Market, and a dinner of ceviche and lomo saltado in a local chicha restaurant.",
  //     coords: [-13.5236, -71.9724],
  //   },
  //   {
  //     id: "day6",
  //     label: "Day 6",
  //     shortLabel: "D6",
  //     location: "Cusco",
  //     title: "Moray & Maras Salt Mines",
  //     description:
  //       "Visiting the remarkable circular Inca terraces of Moray and the shimmering pink salt pans of Maras, two of the lesser-known but most visually striking Inca sites.",
  //     coords: [-13.337, -72.1929],
  //   },
  //   {
  //     id: "day7",
  //     label: "Day 7",
  //     shortLabel: "D7",
  //     location: "Cusco",
  //     title: "Rainbow Mountain",
  //     description:
  //       "An early start for the trek to Vinicunca — the Rainbow Mountain — at over 5,000 meters. Striped mineral formations rippling across the high Andes.",
  //     coords: [-13.721, -71.3312],
  //   },
  //   {
  //     id: "day8",
  //     label: "Day 8",
  //     shortLabel: "D8",
  //     location: "Lima",
  //     title: "Lima: Miraflores & Barranco",
  //     description:
  //       "Flying into the capital on the Pacific coast. Afternoon in Miraflores, evening in Barranco — Lima's bohemian arts district, with dinner in one of the world's top-ranked restaurants.",
  //     coords: [-12.1211, -77.0302],
  //   },
  //   {
  //     id: "day9",
  //     label: "Day 9",
  //     shortLabel: "D9",
  //     location: "Paracas & Ica",
  //     title: "Desert & Ballestas Islands",
  //     description:
  //       "A day trip south of Lima to the Paracas Reserve and a boat tour of the Ballestas Islands — sea lions, penguins, and pelicans. Afternoon in Ica with a sandboarding excursion on the dunes of Huacachina.",
  //     coords: [-13.8417, -76.2503],
  //   },
  // ];
  const days = [
    {
      id: "day1",
      label: "Day 1",
      shortLabel: "D1",
      location: "Cusco",
      title: "Arrival in Cusco",
      description:
        "Landing at Alejandro Velasco Astete Airport. First glimpse of cobblestone streets and colonial architecture built atop Inca stonework.",
      coords: [-13.5319, -71.9675],
    },
    {
      id: "day2",
      label: "Day 2",
      shortLabel: "D2",
      location: "Cusco",
      title: "San Jeronimo Cooking Class",
      description:
        "Learn to cook traditional Peruvian dishes in the historic San Jeronimo neighborhood and hike up to Acient Ruins.",
      coords: [-13.32237, -71.53042],
    },
    {
      id: "day3",
      label: "Day 3",
      shortLabel: "D3",
      location: "Sacred Valley",
      title: "Day 1 of Trek",
      description:
        "Drive through the sacred valley to the top of a mountain pass, then mountain bike down to the river to go white water rafting",
      coords: [-13.1631, -72.545],
    },
    {
      id: "day4",
      label: "Day 4",
      shortLabel: "D4",
      location: "Santa Teresa",
      title: "Day 2 of Trek",
      description:
        "Start the day of backpacking along the inca trail to the hot springs of Santa Teresa.",
      coords: [-13.517, -71.9784],
    },
    {
      id: "day5",
      label: "Day 5",
      shortLabel: "D5",
      location: "Aguas Calientes",
      title: "Day 3 of Trek",
      description:
        "Start the day out with ziplineing over the valley and then hike to Aguas Calientes.",
      coords: [-13.5236, -71.9724],
    },
    {
      id: "day6",
      label: "Day 6",
      shortLabel: "D6",
      location: "Machu Picchu",
      title: "Day 4 of Trek: Machu Picchu",
      description:
        "Wake up explore Aguas Calientes and play some soccer. Then take the bus up to Machu Picchu to explore the ancient citadel and learn about the history of the Inca civilization.",
      coords: [-13.337, -72.1929],
    },
    {
      id: "day7",
      label: "Day 7",
      shortLabel: "D7",
      location: "Cusco",
      title: "Free Day in Cusco",
      description:
        "The group has a free day aimlessly exploring Cusco. Accidently end up in the middle of a massive festival and have lunch overlooking the city of Cusco. Afterwards they trek to the top of the hills to Cristo Blanco.Meanwhile, Libby has the time of her life",
      coords: [-13.721, -71.3312],
    },
    {
      id: "day8",
      label: "Day 8",
      shortLabel: "D8",
      location: "Lima",
      title: "Lima: Miraflores",
      description:
        "Flying to the Pacific capital. Walk through the Miraflores park overlooking the beach. Then get dinner in the shopping mall overlooking the Ocean",
      coords: [-12.1211, -77.0302],
    },
    {
      id: "day9",
      label: "Day 9",
      shortLabel: "D9",
      location: "Paracas & Ica",
      title: "Desert & Ballestas Islands",
      description:
        "Boat tour of the Ballestas Islands, then sandboarding the dunes of Huacachina.",
      coords: [-13.8417, -76.2503],
    },
  ];

  const currentDay = computed(() =>
    days.find((d) => d.id === activePage.value),
  );
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
    color: #8a7e72;
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
    border-color: #3a3028;
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

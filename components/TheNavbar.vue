<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <NuxtLink to="/job-description-generator">
              Job description generator
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/questions">
              Question
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/interview">
              Interview
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/interview-ml">
              ML
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/chat">
              Chat
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/ui">
              UI
            </NuxtLink>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-xl">
        <NuxtLink to="/"> Hackaton </NuxtLink>
      </a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <NuxtLink to="/job-description-generator">
            Job description generator
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/questions">
            Question
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/interview">
            Interview
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/interview-ml">
            ML
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/chat">
            Chat
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/ui">
            UI
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <VSwap v-model="swap">
        <template #on>
          <IconsMoon />
        </template>
        <template #off>
          <IconsSun />
        </template>
      </VSwap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme } from '~~/types/theme'
const swap = ref(false)

watch(swap, (value: Boolean) => {
  const theme = value ? Theme.CUPCAKE : Theme.DARK
  document.querySelector('html')!.setAttribute('data-theme', theme)
})
</script>

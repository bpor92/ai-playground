<template>
  <Navbar/>
  <div class="md:container md:mx-auto">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div class="max-w-full w-[900px] m-auto p-5">
    <NuxtErrorBoundary>
      <ChatWidget/>
      <template #error>
        <div>
          dsadsadasd
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

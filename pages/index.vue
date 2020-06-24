<template>
  <div class="container bg-blue">
    <h1 class="text-4xl font-semibold text-gray-800">
      Nuxt Apollo
    </h1>

    <div class="flex">
      <ul class="w-64 px-2 text-gray-600">
        <li v-for="character in characters.results" :key="character.id">
          <nuxt-link
            :to="character.id"
            class="hover:font-bold hover:text-gray-900 leading-loose"
          >
            {{ character.name }}
          </nuxt-link>
        </li>
      </ul>
      <div class="flex-grow bg-aqua min-h-full ">
        <nuxt-child :key="$route.params.id"> </nuxt-child>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      characterId: 1
    };
  },
  fetch({redirect,route}){
    if(!route.params.id)
     redirect('/1')
  }, 
  apollo: {
    characters: gql`
      query getCharacters {
        characters {
          results {
            id
            name
            status
          }
        }
      }
    `
  }
};
</script>

<style></style>

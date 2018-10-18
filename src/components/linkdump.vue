<template lang="pug" src="./linkdump.pug"></template>

<script>
/* eslint-disable */
import Disclaimer from './common/Disclaimer';
import { readLocalStorage,
         updateLocalStorage,
         clearLocalStorage,
         getTitle } from '../helpers';
export default {
  name:'linkdump',
  components: { Disclaimer },
  data() {
    return {
      categoryCurrent: 0,
      newLinkToggle: false,
      newLink: '',
      newLinkDescription: '',

      storage: [
        // A category
        {
          name: 'Anime',
          edit: false,
          links: [
            // A link
            {
              url: 'http://glinskiy.net',
              description: 'Glinskiy.net'
            },
            {
              url: 'http://google.com',
              description: 'Google'
            }
          ]
        }
      ]
    }
  },

  // on Mounted
  mounted() {
    // clearLocalStorage('myLinks');
    if (readLocalStorage('myLinks')) {
      this.storage = readLocalStorage('myLinks');
    } else {
      this.storage = [{ name: 'Anime', edit: false }];
      this.updateAll();
    }
  },

  // Computed
  computed: {
    currentCategory: function () {
      return this.storage[1].name;
    }
  },

  // Methods
  methods: {
    addCategory () {
      let newCategory = {
        name: 'New Category',
        edit: false
      };
      this.storage.push(newCategory);
      this.updateAll();
    },

    addLink () {
      let newItem = {
        url: this.newLink,
        description: this.newLinkDescription
      };
      if (this.storage[this.categoryCurrent].links) {
        this.storage[this.categoryCurrent].links.push(newItem);
      } else {
        this.storage[this.categoryCurrent].links = [newItem];
      }
      this.updateAll();
    },

    editLink () {

    },

    removeLink (categoryID, linkID) {
      this.storage[categoryID].links.splice(linkID, 1);
      this.updateAll();
    },
    
    updateAll () {
      updateLocalStorage(this.storage, 'myLinks');
    },

    toggleCategoryRename (catIndex) {
      this.storage[catIndex].edit = !this.storage[catIndex].edit;
      this.updateAll();
    }
  }
}
</script>

<style></style>

<template lang="pug">
  #app.container
    .md-layout.header Link Tracker
    .md-layout.new-link-toggle
      a(@click = 'newLinkToggle = !newLinkToggle') New Link {{ newLinkToggle ? '⮝' : '⮟' }}

    .md-layout.bg-gray
      .new-link(:class = "{ closed: !newLinkToggle }")
        .category-toggle
          | Add to Category: 
          .category-link(:class = "{ current: catIndex == categoryCurrent }" 
                        v-for = "(category, catIndex) in storage"
                        @click = "categoryCurrent = catIndex") {{ category.name }}
          |  [ 
          a.new-category(@click = "addCategory") +
          |  ]

        md-field(:md-counter = "false")
          md-input(v-model = "newLink"
                  placeholder = "http://link.my"
                  maxlength = "300")

        md-field(:md-counter = "false")
          md-input(v-model = "newLinkDescription"
                  placeholder = "Watch Later"
                  maxlength = "300")
        
        .new-link-button
          md-button.md-primary.md-raised(@click = "addLink()"
                                        :disabled = "!newLinkDescription || !newLink") Commit
    
    .md-layout
      .link-lists
        .link-list(v-for = "(category, catIndex) in storage")
          .link-list-title
            span(v-if = "!storage[catIndex].edit") {{ category.name }}
            .edit-catname-toggle(@click = "toggleCategoryRename(catIndex)") ✎

            .link-list-title-editor(v-if = "storage[catIndex].edit") 
              md-field(:md-counter = "false")
                md-input(v-model = "storage[catIndex].name" 
                        maxlength = "30" 
                        @blur = "toggleCategoryRename(catIndex)")

          .link-list-item(v-for = "(link, linkIndex) in category.links")
            a(:href = "link.url" target = "_blank") {{ link.description }}
            span(@click = "removeLink(catIndex, linkIndex)") ✖

    .disclaimer 
      | Made by 
      a.roll-link(href="http://glinskiy.net" target="_blank") Dmitry Glinskiy
      | , feel free to use, modify and distribute: 
      a.roll-link(href="https://github.com/ponypharmacist/links-homepage" target="_blank") GitHub repo
</template>

<script>
/* eslint-disable */
export default {
  name:'app',
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
            }
          ]
        }
      ]
    }
  },

  // on Mounted
  mounted() {
    // this.clearLocalStorage('myLinks');
    if (this.readLocalStorage('myLinks')) {
      this.storage = this.readLocalStorage('myLinks');
    } else {
      this.storage = [{ 
        name: 'Anime', edit: false, links: [{ url: 'http://glinskiy.net', description: 'Glinskiy.net' }]
      }];
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
    readLocalStorage (localName) {
      return JSON.parse(localStorage.getItem(localName))
    },

    updateLocalStorage (data, localName) {
      localStorage.setItem(localName, JSON.stringify(data))
    },

    clearLocalStorage (localName) {
      localStorage.removeItem(localName)
    },

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
      this.updateLocalStorage(this.storage, 'myLinks');
      this.storage = this.readLocalStorage('myLinks');
    },

    toggleCategoryRename (catIndex) {
      this.storage[catIndex].edit = !this.storage[catIndex].edit;
      this.updateAll();
    }
  }
}
</script>

<style src="./app.sass" lang="sass"></style>

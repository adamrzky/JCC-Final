<template>
    <v-flex 
      sm6 
      xs12 
      5 
      :class="`px-1 py-2 md md${md} `" 
    >
      <v-card 
        hover 
        flat
        tile 
        color="transparent" 
        class="pa-3" 
        :to="`/blog/${blog.id}`"
      >
        <v-img
          :src="
            blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/300/300'
          "
          class="white--text"
          height="250px"
        >
        </v-img>
        
              <v-card-actions>
                  <h3 
                    class="title font-weight-regular text-capitalize" 
                    :title="blog.title"
                  >
                      {{ (blog.title.length > titleLength ) ? `${blog.title.substring(0, titleLength)}...` : blog.title}}
                    </h3>
                </v-card-actions>
        <v-card-actions>
          <span 
            class="subtitle-1 font-weight-light text-wrap">
              {{ (blog.description.length > descriptionLength ) ? `${blog.description.substring(0, descriptionLength)}...` : blog.description }}
          </span>
        </v-card-actions>

        <v-card-actions>
            <span class="text-decoration-underline subtitle-2 font-weight-light">
              Read More
            </span>
            <v-icon>mdi-chevron-right</v-icon>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>

<script>
export default {
  data: () => ({
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  props: ["blog","md","titleLength","descriptionLength"],
};
</script>
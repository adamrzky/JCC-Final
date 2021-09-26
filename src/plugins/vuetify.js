import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: { 
        options: {
            customProperties: true,
        },
        dark: false,
        themes:{

            light:{
                secondary: '#F97736',
                accent: '#121212',
            }
        } 
    },
});

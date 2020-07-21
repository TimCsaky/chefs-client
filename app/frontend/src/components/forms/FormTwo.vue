<template>
  <v-container>
    <BaseSecure>
      <h2>Secure Form (Form2)</h2>
      <formio :src="formUrl" v-on:submit="onSubmitMethod" />
    </BaseSecure>
  </v-container>
</template>

<script>
import { Form } from 'vue-formio';

export default {

  name: 'FormTwo',

  components: {
    formio: Form
  },

  data: () => ({
    // Load these from vuex or some other state store system.
    formUrl: 'http://host.docker.internal:4001/dev-qnkbnmhxpcgkvdi/form2'
  }),

  methods: {
    onSubmitMethod: function(submission) {
      console.log(submission);
    }
  },

  created(){
  }


};
</script>

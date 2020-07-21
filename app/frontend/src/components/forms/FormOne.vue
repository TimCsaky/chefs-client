
<template>
  <v-container>
    <h2>Public Form (Form1)</h2>
    <formio :src="formUrl" v-on:submit="onSubmitMethod" />
  </v-container>
</template>
<script>
import { Form } from 'vue-formio';

export default {

  name: 'FormOne',

  components: {
    formio: Form
  },

  data: () => ({
    // Load these from vuex or some other state store system.
    formUrl: 'http://host.docker.internal:4001/dev-qnkbnmhxpcgkvdi/form1'
  }),

  methods: {
    onSubmitMethod: function(submission) {
      console.log(submission);
    }
  }


};
</script>

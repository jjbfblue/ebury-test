<template>
  <section class="container">
    <box title="Send E-mail">
      <div class="send-email-output" v-if="sending">
        Sending Email...
      </div>

      <div class="send-email-output" v-if="sent">
        Email Sent!!!
      </div>

      <form method="post" @submit.prevent="submitForm" v-if="!sending && !sent">
        <form-field
          placeholder="To"
          name="to"
          :value="to.value"
          :error="getError('to', to.error)"
          @input.native="updateField({ to: $event.target.value })"
        />

        <form-field
          placeholder="CC"
          name="cc"
          :value="cc.value"
          :error="getError('cc', cc.error)"
          @input.native="updateField({ cc: $event.target.value })"
        />

        <form-field
          placeholder="BCC"
          name="bcc"
          :value="bcc.value"
          :error="getError('bcc', bcc.error)"
          @input.native="updateField({ bcc: $event.target.value })"
        />

        <form-field
          placeholder="Subject"
          name="subject"
          :maxlength="100"
          :value="subject.value"
          :error="getError('subject', subject.error)"
          @input.native="updateField({ subject: $event.target.value })"
        />

        <form-field
          placeholder="Message"
          name="message"
          :lines="8"
          :value="message.value"
          :error="getError('message', message.error)"
          @input.native="updateField({ message: $event.target.value })"
        />

        <div class="form-footer">
          <attach-files
            :files="attachedFiles.value"
            @change="updateField({ attachedFiles: $event })"
          />

          <form-btn :disabled="!valid">
            <icon name="arrow-right" />
            <span>Send</span>
          </form-btn>
        </div>
      </form>
    </box>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Icon from '~/components/Icon.vue'
  import Box from '~/components/Box.vue'
  import FormField from '~/components/FormField.vue'
  import FormBtn from '~/components/FormBtn.vue'
  import AttachFiles from '~/components/AttachFiles.vue'

  export default {
    components: {
      Icon,
      Box,
      FormField,
      FormBtn,
      AttachFiles
    },

    head: {
      title: 'Ebury Test',
      meta: [
        { hid: 'description', name: 'description', content: 'Test Project for Ebury' }
      ]
    },

    computed: mapState({
      to: state => state.sendEmailForm.fields.to,
      cc: state => state.sendEmailForm.fields.cc,
      bcc: state => state.sendEmailForm.fields.bcc,
      subject: state => state.sendEmailForm.fields.subject,
      message: state => state.sendEmailForm.fields.message,
      attachedFiles: state => state.sendEmailForm.fields.attachedFiles,
      sending: state => state.sendEmailForm.sending,
      sent: state => state.sendEmailForm.sent,
      valid: state => state.sendEmailForm.valid
    }),

    methods: {
      ...mapActions({
        submitForm: 'sendEmailForm/submit',
        updateField: 'sendEmailForm/updateField'
      }),

      getError (field, error) {
        if (error === 'required') {
          return 'You must complete this field'
        }

        if ((['to', 'cc', 'bcc'].indexOf(field) !== -1) && (error === 'noValid')) {
          return 'Invalid emails'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to bottom, #0C8FB7, #65BDD8);
  }

  .send-email-output {
    padding: 5rem 0;
    text-align: center;
  }

  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  @media (max-width: 820px) {
    .container {
      padding: 0 0.5rem;
    }
  }

  @media (max-width: 480px) {
    .form-footer {
      display: block;
      overflow: hidden;

      .form-btn {
        margin-top: 1rem;
        float: right;
      }
    }
  }
</style>

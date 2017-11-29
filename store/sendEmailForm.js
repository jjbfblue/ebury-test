import { createForm } from '../utils'

const emailValidation = ({value}) => value.split(', ').every(email => /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email))

const sendEmailForm = createForm({
  fields: {
    to: {
      value: '',
      required: true,
      validations: {
        noValid: emailValidation
      }
    },

    cc: {
      value: '',
      validations: {
        noValid: emailValidation
      }
    },

    bcc: {
      value: '',
      validations: {
        noValid: emailValidation
      }
    },

    subject: {
      value: '',
      required: true
    },

    message: {
      value: '',
      required: true
    },

    attachedFiles: {
      value: []
    }
  },

  options: {
    submitFunction: async (fields) => {
      console.log('Sending email with these data...')
      console.log(fields)

      return true
    },

    afterSubmit: ({ commit }, response) => {
      setTimeout(() => { commit('submitRestart') }, 5000)
    }
  }
})

export default sendEmailForm.buildStore()

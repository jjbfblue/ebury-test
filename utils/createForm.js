const buildFormValidations = (formFields) => {
  return Object.entries(formFields).reduce((fields, [name, data]) => {
    let validations = data.validations || {}

    if (data.required) {
      validations = {
        required: ({value}) => ((value !== null) && (value !== '')),
        ...validations
      }
    } else {
      validations = Object.entries(validations).reduce((obj, [validationName, validationFn]) => {
        obj[validationName] = (validationInfo) => {
          const { value } = validationInfo

          if ((value === null) || (value === '')) {
            return true
          }

          return validationFn(validationInfo)
        }

        return obj
      }, {})
    }

    fields[name] = validations

    return fields
  }, {})
}

const validateForm = (form, formValidations) => {
  Object.entries(formValidations).forEach(([field, validations]) => {
    form.fields[field].error = null

    Object.entries(validations).forEach(([validationName, validationFn]) => {
      if (
        (form.fields[field].touched === true) &&
        (form.fields[field].error === null) &&
        (!validationFn({
          fields: form.fields,
          value: form.fields[field].value
        }))
      ) {
        form.fields[field].error = validationName
      }
    })
  })

  form.valid = Object.keys(form.fields).every(field => {
    if (formValidations[field].required) {
      return (form.fields[field].touched === true) && (form.fields[field].error === null)
    } else {
      return form.fields[field].error === null
    }
  })

  return form
}

const cleanFields = (formFields) => {
  return Object.entries(formFields).reduce((fields, [name, data]) => {
    fields[name] = {
      ...data,
      touched: false,
      value: Array.isArray(data.value) ? [] : ''
    }

    return fields
  }, {})
}

const updateField = (formState, field, value) => {
  formState.fields[field] = {
    ...formState.fields[field],
    ...{ value, touched: true }
  }

  return formState
}

const touchAllFields = (formState) => {
  Object.keys(formState.fields).forEach(field => { formState.fields[field].touched = true })

  return formState
}

const getFieldsValues = (formState) => {
  return Object.entries(formState.fields).reduce((fields, [name, data]) => {
    fields[name] = data.value
    return fields
  }, {})
}

const submitStart = (formState) => {
  formState.sending = true

  return formState
}

const submitCompleted = (formState, cleanForm = true) => {
  formState.sending = false
  formState.sent = true
  formState.valid = false
  formState.error = null

  if (cleanForm) {
    formState.fields = cleanFields(formState.fields)
  }

  return formState
}

const submitRejected = (formState, error) => {
  formState.sending = false
  formState.error = error

  return formState
}

const submitRestart = (formState) => {
  formState.sending = false
  formState.sent = false
  formState.error = null
  formState.valid = false
  formState.fields = cleanFields(formState.fields)

  return formState
}

class Form {
  constructor ({ fields, options = {} }) {
    this.fields = fields
    this.options = options
    this.validations = buildFormValidations(this.fields)
  }

  buildState () {
    const formFields = Object.entries(this.fields).reduce((fields, [name, data]) => {
      fields[name] = { value: data.value, touched: false, error: null }
      return fields
    }, {})

    return {
      sending: false,
      sent: false,
      error: null,
      valid: false,
      fields: formFields
    }
  }

  buildMutations () {
    return {
      submitStart,
      submitCompleted,
      submitRejected,
      submitRestart,

      updateField: (formState, payload) => {
        const field = Object.keys(payload)[0]
        const value = payload[field]

        if (formState.fields[field].value === value) {
          return formState
        }

        return validateForm(updateField(formState, field, value), this.validations)
      },

      touchAllFields: (formState) => {
        return validateForm(touchAllFields(formState), this.validations)
      }
    }
  }

  buildActions () {
    const { submitFunction = null, afterSubmit = null } = this.options

    return {
      updateField ({ commit }, payload) {
        commit('updateField', payload)
      },

      async submit (context) {
        const { commit, state } = context
        await commit('touchAllFields')

        if (state.valid) {
          await commit('submitStart')

          try {
            const response = (submitFunction)
              ? await submitFunction(getFieldsValues(state))
              : null

            await commit('submitCompleted')

            if ((afterSubmit) && (response)) {
              afterSubmit(context, response)
            }
          } catch (error) {
            await commit('submitRejected', error)
          }
        }
      }
    }
  }

  buildStore () {
    return {
      state: () => this.buildState(),
      mutations: this.buildMutations(),
      actions: this.buildActions()
    }
  }
}

export default (definition) => new Form(definition)

const isShowForm = state => state.isShowForm
const isShowProgress = state =>state.isShowProgress
const alert = state =>state.alert

const titleNotice = state=> state.titleNotice

const isShowSuccessNotice = state => state.isShowSuccessNotice
const isShowAlert = state => state.isShowAlert
export default {
  isShowForm,
  isShowProgress,
  alert,
  isShowAlert,
  isShowSuccessNotice,
  titleNotice
}

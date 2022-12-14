import { Notify, Loading, QSpinnerCube } from 'quasar'
import { routerInstance } from 'boot/router'
import * as storage from 'src/modules/storage'

const removeToken = () => {
  storage.deleteLocalToken()
  storage.deleteHeaderToken()
  storage.deleteUser()
  routerInstance.replace('/setset/login')
}

const notifErr = (resp) => {
  // const msg = resp ? resp.data.message : 'Ada Kesalahan, Harap ulangi!'
  // const status = resp ? resp.status : 500

  if (!resp) {
    Notify.create({
      message: 'Maaf! Server tidak merespon atau kesalahan pada jaringan anda',
      icon: 'icon-eva-message-circle-outline',
      position: 'top-right',
      color: 'negative',
      actions: [
        { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
      ]
    })
  }

  // unauthenticated
  console.log('utility', resp)
  if (resp.status === 401 || resp.statusText === 'Unauthorized' || resp.data.message === 'Unauthenticated.') {
    return removeToken()
  }

  //   if (status === 200) {

  if (status === 422) {
    const msgs = resp.data
    for (const key in msgs) {
      Notify.create({
        message: msgs[key][0],
        icon: 'icon-eva-message-circle-outline',
        position: 'top-right',
        color: 'negative',
        actions: [
          { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
        ]
      })
    }
  } else {
    Notify.create({
      message: resp.data.message,
      icon: 'icon-eva-message-circle-outline',
      position: 'top-right',
      color: 'negative',
      actions: [
        { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
      ]
    })
  }
}
const notifSuccess = (resp) => {
  const msg = resp ? resp.data.message : 'Sucees!, Wow Kerja Bagus!'
  Notify.create({
    message: msg || 'Sucees!, Wow Kerja Bagus!',
    icon: 'icon-mat-thumb_up_off_alt',
    position: 'top-right',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifErrVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-eva-message-circle-outline',
    position: 'top-right',
    color: 'negative',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifSuccessVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-mat-thumb_up_off_alt',
    position: 'top-right',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}

const waitLoad = (cond) => {
  if (cond === 'show') {
    Loading.show({
      message: 'Harap bersabar. Menunggu...',
      // boxClass: 'bg-primary text-white',
      spinner: QSpinnerCube,
      // spinnerColor: 'yellow',
      spinnerSize: 30
    })
  } else {
    Loading.hide()
  }
}

export { notifSuccess, notifErr, notifErrVue, notifSuccessVue, waitLoad, removeToken }

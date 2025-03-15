import { ref } from 'vue'

export function useMenuHandlers() {
  const menuOver = ref(false)
  const listOver = ref(false)
  const submenu = ref(false)
  const listSubmenu = ref(false)
  const subItem = ref(null)

  const checkMenu = () => {
    if (listOver.value) {
      menuOver.value = true
    } else {
      menuOver.value = false
    }
  }

  const checkItem = (val) => {
    subItem.value = val
  }

  const checkSubmenu = () => {
    submenu.value = listSubmenu.value
  }

  return {
    menuOver,
    listOver,
    submenu,
    listSubmenu,
    subItem,
    checkMenu,
    checkItem,
    checkSubmenu
  }
}

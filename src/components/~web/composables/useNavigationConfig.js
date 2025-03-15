import { ref } from 'vue'

export function useNavigationConfig(router, storeProfil, storePpid, storePokja) {
  const menus = ref([
    { name: 'beranda', url: 'beranda', title: 'Beranda', active: false },
    { name: 'berita', url: 'berita/all', title: 'Berita', active: false },
    { name: 'pelayanan', url: 'pelayanan', title: 'Pelayanan', active: false },
    { name: 'profil', url: 'profil', title: 'Profil', active: false },
    { name: 'ppid', url: 'ppid', title: 'PPID', active: false },
    { name: 'pokja', url: 'pokja', title: 'Pokja Akreditasi', active: false },
    { name: 'buku-tamu', url: 'buku-tamu', title: 'Buku Tamu', active: false }
  ])

  const gotoProfile = (item) => {
    router.push('/profil')
    storeProfil.setTab(item.nama)
  }

  const gotoPpid = (item) => {
    router.push('/ppid')
    storePpid.setTab(item.nama)
  }

  const gotoPokja = (item) => {
    router.push('/pokja')
    storePokja.setTab(item.nama)
  }

  return {
    menus,
    gotoProfile,
    gotoPpid,
    gotoPokja
  }
}

import { useAppStore } from 'src/stores/app'
import { usePelayananStore } from 'src/stores/pelayanan'
import { useProfilStore } from 'src/stores/profil'
import { usePpidStore } from 'src/stores/ppid'
import { usePokjaStore } from 'src/stores/pokja'

export function useStores() {
  const store = useAppStore()
  const storePelayanan = usePelayananStore()
  const storeProfil = useProfilStore()
  const storePpid = usePpidStore()
  const storePokja = usePokjaStore()

  return {
    store,
    storePelayanan,
    storeProfil,
    storePpid,
    storePokja
  }
}

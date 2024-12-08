declare type DrawerAtomType = {
  openDrawer : () => void,
  closeDrawer : () => void,
  confrimDialog:boolean
  confirmText?:string
}
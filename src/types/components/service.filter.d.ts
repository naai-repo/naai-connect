

declare type ServiceFilterRefType = { openSheet: () => void, closeSheet: () => void };

declare type ServiceCategoryRefType = {openSheet: () => void, closeSheet: () => void};

declare type BookingSheetType = {openSheet: () => void, closeSheet: () => void};

declare type LoginDialogRefType = {openSheet: (from?:string) => void, closeSheet: () => void };

declare type LoginUserInfoDialogType = {openDialog: () => void, closeDialog: () => void};

declare type ArtistDialgReftype = {openSheet: () => void, closeSheet: () => void};

declare type ConfirmbookingRefType = {openDialog: (text?:string) => void, closeDialog: () => void}
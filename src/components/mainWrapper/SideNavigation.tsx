"use client"
import logo from "@/assets/logo.svg";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { NavigationRoutes } from "@/constants/routesName";
import { cn } from "@/lib/utils";
import { faScissors, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import useNavigationRoutes from "@/hooks/navigationRoutes.hooks";
import { useRecoilState } from "recoil";
import { drawerSelector } from "@/recoil/drawer.atom";

type MenuType = {
  title: string,
  icon: React.JSX.Element,
  redirectUrl?: string,
  path?: string
};

const navigationMenus: MenuType[] = [
  {
    title: "Salon Profile",
    icon: <FontAwesomeIcon icon={faScissors} className="h-5 w-5" />,
    path: NavigationRoutes.editStoreScreen,
  },
  {
    title: "Artist Profile",
    icon: <FontAwesomeIcon icon={faUserPen} className="h-5 w-5" />,
    path: NavigationRoutes.editArtistDetailsScreen,
  },
]


const SideNavigation: React.FC<{ navigationMenus: MenuType[], isCollapsed: boolean }> = ({ navigationMenus, isCollapsed }) => {
  const router = useNavigationRoutes();


  return (
    <>
      <TooltipProvider>
        {
          navigationMenus.map((item, idx) => {
            let redirectPath = item?.path;
            if (redirectPath == null) redirectPath = item?.redirectUrl;
            let isSelected = router.urlPath == item.path!;

            return (
              <Fragment key={idx}>
                <Tooltip key={idx} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={redirectPath ?? "#"}
                      className={cn(
                        buttonVariants({ variant: (isSelected) ? "default" : "outline", size: "icon" }),
                        "h-8 w-full border-none shadow-none rounded-md transition-all",
                        (isCollapsed) ? "justify-center" : "justify-start p-4",
                        (isSelected) ? "bg-primary text-primary-foreground" : "text-muted-foreground transition-colors hover:text-foreground"
                        // "default" === "default" &&
                        //   "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <div className="flex flex-row gap-3">
                        {item.icon}
                        {(!isCollapsed) ? item.title : null}
                      </div>
                      {/* {(!isCollapsed) ? <span className="sr-only">{item.title}</span> : null} */}
                    </Link>
                    {/* </div> */}
                  </TooltipTrigger>
                  {/* <TooltipContent side="right">{item.title}</TooltipContent> */}
                </Tooltip>


              </Fragment>
            )
          })
        }
      </TooltipProvider>
    </>

  )
}

export const ExpandableNavigation: React.FC = () => {
  const [data, setData] = useState({ isCollapsed: true });

  return (
    <>
      <MobileDrawer></MobileDrawer>
      <aside onMouseEnter={(e) => {
        setData({ ...data, isCollapsed: false })
      }} onMouseLeave={(e) => {
        setData({ ...data, isCollapsed: true })
      }} className={cn(
        "fixed inset-y-0 left-0 z-50 hidden flex-col border-r bg-background sm:flex transition-all",
        (data.isCollapsed) ? "w-14" : "h-full shadow-lg w-48"
      )}>
        <nav className={cn(
          "flex flex-col h-full w-full transition-all",
          (data.isCollapsed) ? "items-start gap-4 px-2 sm:py-4" : "items-start gap-4 px-2 sm:py-4 overflow-y-scroll scrollbar-hide",
        )}>
          {
            <SideNavigation navigationMenus={navigationMenus} isCollapsed={data.isCollapsed}></SideNavigation>
          }
        </nav>
      </aside>
    </>
  )
}


export const MobileDrawer = memo(() => {
  const [open, setOpen] = useState(false);
  const [drawerData, setDrawerData] = useRecoilState(drawerSelector);


  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setDrawerData({ ...drawerData, openDrawer: openDrawer, closeDrawer: closeDrawer });
  }, []);

  return (
    <Sheet key={"left"} open={open}>
      <DrawerContent closeDrawer={closeDrawer}></DrawerContent>
    </Sheet>
  )
});

const DrawerContent = memo(({ closeDrawer }: { closeDrawer: () => void }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const router = useNavigationRoutes();
  const [drawerData, setDrawerData] = useRecoilState(drawerSelector);



  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        closeDrawer();
      }
    }
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SheetContent side={"left"} className="p-0 overflow-y-auto scrollbar-hide h-full" ref={sheetRef}>
      <SheetHeader className="flex flex-row justify-between items-center p-4">
        <div>
          <Image src={logo} alt="naai_logo" width={40}></Image>
        </div>
        <Button variant={"outline"} size={"icon"} onClick={closeDrawer}>
          <X size={18} />
        </Button>
      </SheetHeader>
      {
        navigationMenus.map((item, idx) => {
          let redirectPath = item?.path;
          if (redirectPath == null) redirectPath = item?.redirectUrl;
          let isSelected = router.urlPath == item.path!;

          return (
            <Fragment key={idx}><Link
              href={redirectPath ?? "#"}
              className={cn(
                buttonVariants({ variant: (isSelected) ? "default" : "outline", size: "icon" }),
                "w-full shadow-none transition-all rounded-none border-b-1",
                (false) ? "justify-center" : "justify-start px-4 py-6",
                (isSelected) ? "bg-primary text-primary-foreground" : "text-muted-foreground transition-colors hover:text-foreground"
              )}
            >
              <div className="flex flex-row gap-3">
                <div>{item.icon}</div>
                <span>{item.title}</span>
              </div>
            </Link>
            </Fragment>
          )
        })
      }
    </SheetContent>
  )
})
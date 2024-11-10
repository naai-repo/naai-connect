"use-client"
import { NavigationRoutes } from '@/constants/routesName';
import { useRouter ,usePathname} from 'next/navigation';

function useNavigationRoutes() {
  const router = useRouter();
  const urlPath = usePathname();
  const routes = NavigationRoutes;

  const push = (routeName : string) => {
      router.push(routeName);
  }
  const pushHash = (name : string) => {
    router.push(`${urlPath}#${name}`);
  }

  const replace = (routeName : string) => {
      router.replace(routeName);
  }

  const pop = () => {
      router.back();
  }
  
  return {router,urlPath,routes,push,replace,pushHash,pop};
}

export default useNavigationRoutes;
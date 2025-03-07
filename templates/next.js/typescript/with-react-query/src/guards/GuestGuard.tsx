// ** React Imports
import { ReactNode, ReactElement, useEffect } from "react";

// ** Next Import
import { usePathname, useRouter } from "next/navigation";

// ** Hooks Import
import { useAuth } from "@/hooks/useAuth";

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!router) {
      return;
    }
    if (auth?.user || window.localStorage.getItem("userData")) {
      router.replace("/");
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;

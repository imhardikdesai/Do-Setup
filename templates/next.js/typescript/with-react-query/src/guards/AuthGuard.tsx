// ** React Imports
import { ReactNode, ReactElement, useEffect, useCallback } from "react";

// ** Next Import
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// ** Hooks Import
import { useAuth } from "@/hooks/useAuth";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(
    () => {
      if (!router) {
        return;
      }
      if (auth.user === null && !window.localStorage.getItem("userData")) {
        if (pathname !== "/") {
          router.replace("/login/?" + createQueryString("returnUrl", pathname));
          router.refresh();
        } else {
          router.replace("/login");
          router.refresh();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  if (auth.loading || auth.user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;

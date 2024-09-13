"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    
    <NextUIProvider navigate={router.push}>
      <RecoilRoot>
      <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
        </NextThemesProvider>
    </RecoilRoot>
    </NextUIProvider>
  );
}

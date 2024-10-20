import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="h-screen absolute w-screen items-center  justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>}> 
      {children}
      </Suspense>
    </QueryClientProvider>
  );
}

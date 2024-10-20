import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <Suspense fallback={<div className="h-screen w-screen items-center flex justify-center">
        <div className="animate-spin rounded-full md:h-8 w-8 border border-black block"></div>
      </div>}> 
      {children}
      </Suspense>
  );
}

"use client"; // This file is a Client Component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { DataProvider } from "@/context/data-context";
import { PDFProvider } from "@/components/pdf/pdf-provider";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DataProvider>
        <PDFProvider>
          {children}
        </PDFProvider>
        </DataProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

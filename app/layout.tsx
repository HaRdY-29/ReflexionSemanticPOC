"use client";
import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import MainAppShell from "../components/Appshell/MainAppShell";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export default function RootLayout({ children }: { children: any }) {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <head>
        <title>Reflexion Semantic</title>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>
        <MantineProvider>
          <ModalsProvider>
            <QueryClientProvider client={queryClient}>
              <Notifications />
              <MainAppShell>{children}</MainAppShell>
            </QueryClientProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

import "../index.css";
import { GlobalDataProvider } from "../Helpers/GlobalDataProvider";
import AppShell from "../app-shell/AppShell";
import { api } from "../utils/api";

export const metadata = {
  verification: {
    google: "uvO57qg3JPD6_LpJM_fHldETk1ek9ntvGyfOGhHZD9w",
  },
};

export default async function RootLayout({ children }) {
  // Fetch global settings on the server
  const settings = await api.getSettings();

  return (
    <html lang="en">
      <body>
        <GlobalDataProvider initialData={settings}>
          <AppShell>{children}</AppShell>
        </GlobalDataProvider>
      </body>
    </html>
  );
}

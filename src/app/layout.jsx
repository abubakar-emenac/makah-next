import "../index.css";
import { GlobalDataProvider } from "../Helpers/GlobalDataProvider";
import AppShell from "../app-shell/AppShell";
import { api } from "../utils/api";
import { fetchGeneralSettings, getWebsiteTitle } from "../Helpers/metadata";

export async function generateMetadata() {
  const generalSettings = await fetchGeneralSettings();
  const websiteTitle = getWebsiteTitle(generalSettings);

  return {
    title: websiteTitle,
    verification: {
      google: "uvO57qg3JPD6_LpJM_fHldETk1ek9ntvGyfOGhHZD9w",
    },
    openGraph: {
      siteName: websiteTitle,
    },
  };
}

export default async function RootLayout({ children }) {
  // Fetch global settings on the server
  const settings = await api.getSettings();
  const websiteTitle = getWebsiteTitle(settings);

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

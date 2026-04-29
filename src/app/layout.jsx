import "../index.css";
import { GlobalDataProvider } from "../Helpers/GlobalDataProvider";

export const metadata = {
  verification: {
    google: "uvO57qg3JPD6_LpJM_fHldETk1ek9ntvGyfOGhHZD9w",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalDataProvider>{children}</GlobalDataProvider>
      </body>
    </html>
  );
}

import "../index.css";
import { GlobalDataProvider } from "../Helpers/GlobalDataProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalDataProvider>{children}</GlobalDataProvider>
      </body>
    </html>
  );
}

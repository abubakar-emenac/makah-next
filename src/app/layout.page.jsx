import "../index.css";

export const metadata = {
  title: "Makkah Travel",
  description: "Makkah Travel UK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

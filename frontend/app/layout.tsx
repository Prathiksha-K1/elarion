import "./globals.css";

export const metadata = {
  title: "Elarion",
  description: "A living world of ideas and people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
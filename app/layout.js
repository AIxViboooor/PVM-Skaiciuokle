import './globals.css';

export const metadata = {
  title: 'PVM Skaičiuoklė | Lietuvos PVM Kalkuliatorius',
  description: 'Nemokama Lietuvos PVM skaičiuoklė. Greitai apskaičiuokite PVM 21%, 9%, 5% tarifais. Pridėkite arba atimkite PVM nuo sumos. Procentų skaičiuoklė.',
  keywords: 'PVM skaičiuoklė, PVM kalkuliatorius, Lietuva, PVM 21%, pridėti PVM, atimti PVM, mokesčiai, procentų skaičiuoklė, VMI',
  authors: [{ name: 'PVM.lt' }],
  openGraph: {
    title: 'PVM Skaičiuoklė | Lietuvos PVM Kalkuliatorius',
    description: 'Nemokama Lietuvos PVM skaičiuoklė. Greitai apskaičiuokite PVM 21%, 9%, 5% tarifais.',
    locale: 'lt_LT',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="lt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

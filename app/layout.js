import './globals.css';

export const metadata = {
  title: 'PVM Skaičiuoklė | SkaiciuokPVM.lt',
  description: 'Nemokama Lietuvos PVM skaičiuoklė. Greitai apskaičiuokite PVM 21%, 9%, 5% tarifais. Pridėkite arba atimkite PVM nuo sumos. Procentų skaičiuoklė.',
  keywords: 'PVM skaičiuoklė, PVM kalkuliatorius, Lietuva, PVM 21%, pridėti PVM, atimti PVM, mokesčiai, procentų skaičiuoklė, VMI',
  authors: [{ name: 'SkaiciuokPVM.lt' }],
  openGraph: {
    title: 'PVM Skaičiuoklė | SkaiciuokPVM.lt',
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
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9487512376629103"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}


import GridLayout from "@/components/GridLayout";
import { StateGlobalProvider } from "@/components/StateGlobal";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { AuthProvider } from "./Provider";
import HomePanel from "@/components/layouts/HomePannel";


export const metadata = {
  title: "Ryan Florida shop",
  description: "Ryan Florida shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Ryan Shop</title>
        <link rel="icon" href="/asset/img/mainlogo.png" type="image/gif" sizes="16x16" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
        <link rel="stylesheet" href="/asset/css/grid.css" />
      </head>
      <body className="remove-scrollbar"> 
        <AuthProvider>
          <StateGlobalProvider>
            <GridLayout>
              <Header />

              {/* <div className="mt-[72px] mx-12 mb-6">
              </div> */}
                {children}

              <Footer />
            </GridLayout>
          </StateGlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

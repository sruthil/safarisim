// app/layout.tsx

import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/main.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import BootstrapClient from "./components/BootstrapClient";
import { ToastContainer } from 'react-toastify';

import { UserProvider } from "@/context/UserContext";
import { ApiProvider } from "@/context/ApiContext";

export const metadata: Metadata = {
  title: "SafariSim",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <UserProvider>
          <ApiProvider>
            <Header />
            {children}
            <Footer />
            <BootstrapClient />
            <ToastContainer position="top-right" autoClose={3000} />
          </ApiProvider>
        </UserProvider>
      </body>
    </html>
  );
}

import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow pt-12 lg:pt-20 flex flex-col [&>*:first-child]:mt-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


// import { Outlet } from "react-router";
// import { Navbar } from "./components/Navbar";
// import { Footer } from "./components/Footer";

// export function Root() {
//   return (
//     <div className="min-h-screen flex flex-col" style={{ background: "#081A04" }}>
//       <Navbar />
//       <main className="flex-1">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// }

















// frontend/src/app/Root.tsx
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export function Root() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#081A04" }}>
      <Navbar />
      <main className="flex-1 pt-24 pb-20">   {/* ← changed */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
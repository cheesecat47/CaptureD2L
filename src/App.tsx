import { Header } from "./components/header.tsx";
import { Footer } from "./components/footer.tsx";
import { Process } from "./components/process.tsx";

function App() {
  return (
    <>
      <div className="container mx-auto h-dvh w-full max-w-full overflow-hidden bg-white dark:bg-slate-700 dark:text-white">
        <Header />
        <Process />
        <Footer />
      </div>
    </>
  );
}

export default App;

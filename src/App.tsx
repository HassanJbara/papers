import { PDFPage } from "@/pages";
import { useEffect } from "react";
import { MainPage } from "@/pages";

export function App() {
  useEffect(() => {
    document.title = "Papers";
  }, []);

  return <MainPage />;
}

export default App;

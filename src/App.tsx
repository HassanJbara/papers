import { PDFPage } from "@/pages";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    document.title = "Papers";
  }, []);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <PDFPage />
    </div>
  );
}

export default App;

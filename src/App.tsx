import { PDFPage } from "@/pages";

export function App() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <PDFPage />
    </div>
  );
}

export default App;

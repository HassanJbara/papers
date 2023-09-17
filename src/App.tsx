import { PDFPage } from "@/pages";
import { useEffect } from "react";
import { MainPage } from "@/pages";
import { Route } from "wouter";

export function App() {
  useEffect(() => {
    document.title = "Papers";
  }, []);

  return (
    <div>
      <Route path="/" component={MainPage} />
      <Route path="/pdf/:id">{(params) => <PDFPage pdfId={params.id} />}</Route>
    </div>
  );
}

export default App;

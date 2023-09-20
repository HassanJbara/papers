import { PDFPage, MainPage } from "@/pages";

import { useEffect } from "react";
import { Router, Route } from "wouter";
import type { BaseLocationHook } from "wouter/use-location";
import { useLocationProperty, navigate } from "wouter/use-location";

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
const hashLocation = () => window.location.hash.replace(/^#/, "") || "/";

const hashNavigate = (to: any) => navigate("#" + to);

const useHashLocation: BaseLocationHook = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate];
};

export function App() {
  useEffect(() => {
    document.title = "Papers";
  }, []);

  return (
    <Router hook={useHashLocation}>
      <Route path="/" component={MainPage} />
      <Route path="/pdf/:id">{(params) => <PDFPage pdfId={params.id} />}</Route>
    </Router>
  );
}

export default App;

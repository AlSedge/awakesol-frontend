import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Temporary redirects for the missing pages so the site doesn't crash! */}
        <Route path="/learning/languages" element={<Index />} />
        <Route path="/learning/music" element={<Index />} />
        <Route path="/learning/dogs" element={<Index />} />
        <Route path="/learning/ai" element={<Index />} />
        <Route path="/health/living-well" element={<Index />} />
        <Route path="/health/brain-health" element={<Index />} />
        <Route path="/health/books" element={<Index />} />
        <Route path="/nature/gardening" element={<Index />} />
        
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

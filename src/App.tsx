import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AI from "./pages/AI";
import AiArticleView from "./pages/AiArticleView";
import Languages from "./pages/Languages";
import Music from "./pages/Music";
import DogTraining from "./pages/DogTraining";
import Books from "./pages/Books";
import LivingWell from "./pages/LivingWell";
import Gardening from "./pages/Gardening";
import BrainHealth from "./pages/BrainHealth";
import ArticleView from "./pages/ArticleView";
import NatureArticleView from "./pages/NatureArticleView";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/learning/ai" element={<AI />} />
        <Route path="/learning/ai/:id" element={<AiArticleView />} />
        <Route path="/learning/languages" element={<Languages />} />
        <Route path="/learning/music" element={<Music />} />
        <Route path="/learning/dogs" element={<DogTraining />} />
        <Route path="/health/books" element={<Books />} />
        <Route path="/health/living-well" element={<LivingWell />} />
        <Route path="/health/living-well/:id" element={<ArticleView />} />
        <Route path="/health/brain-health" element={<BrainHealth />} />
        <Route path="/nature/gardening" element={<Gardening />} />
        <Route path="/nature/gardening/:id" element={<NatureArticleView />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookie-policy-eu" element={<CookiePolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import AnalysisErrorBoundary from './components/AnalysisErrorBoundary';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={
          <AnalysisErrorBoundary>
            <Results />
          </AnalysisErrorBoundary>
        } />
      </Routes>
    </div>
  );
}

export default App;  
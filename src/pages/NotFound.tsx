import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-card">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-hero text-white rounded-lg hover:opacity-90 transition-smooth font-medium"
          >
            Return to Home
          </a>
          <div className="text-sm text-muted-foreground">
            <p>Or try these helpful links:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <a href="/tours" className="text-primary hover:underline">Browse Tours</a>
              <a href="/about" className="text-primary hover:underline">About Us</a>
              <a href="/contact" className="text-primary hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

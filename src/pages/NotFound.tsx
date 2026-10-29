import { Link } from "react-router-dom";
import { Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <MapPin className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-2">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          Looks like this address doesn't exist. Let's get you back on track.
        </p>
        <Link to="/">
          <Button size="lg" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </section>
  );
}


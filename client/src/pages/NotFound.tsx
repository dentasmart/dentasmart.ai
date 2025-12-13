import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <section className="flex-1 py-24 bg-background">
        <div className="container max-w-3xl text-center">
          <div className="text-8xl font-display font-bold text-primary mb-6">
            404
          </div>
          <h1 className="text-5xl font-display font-bold text-foreground mb-4">
            Page not found
          </h1>
          <p className="text-lg text-foreground/80 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link href="/">
            <a>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Go back home
              </Button>
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

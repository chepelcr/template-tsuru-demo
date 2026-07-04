import { Link } from "wouter";
import { Home, Search, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-gradient leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Kë̀ kú̱ne!
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Ì be' yulè kë̀ tso' í̱e̱. Bö̀ ù ki̱!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <a className="btn-primary px-8 py-3 rounded-md font-semibold text-lg inline-flex items-center justify-center gap-2 shadow-orange">
                <Home className="w-5 h-5" />
                Ù ki̱ bö̀
              </a>
            </Link>
            <Link href="/products">
              <a className="btn-secondary px-8 py-3 rounded-md font-semibold text-lg inline-flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Ìyi sú̱
              </a>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="card-modern p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-lg mb-4">Ñá̱la̱ kimà</h3>
            <div className="space-y-3 text-left">
              <Link href="/products">
                <a className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors group">
                  <span className="text-muted-foreground group-hover:text-primary">
                    Ìyi ulìtane sú̱
                  </span>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
              <a
                href="#"
                className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors group"
              >
                <span className="text-muted-foreground group-hover:text-primary">
                  Sa' ta̱ ushtè
                </span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors group"
              >
                <span className="text-muted-foreground group-hover:text-primary">
                  Kimà ù
                </span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Decorative Element */}
          <div className="mt-12 flex justify-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

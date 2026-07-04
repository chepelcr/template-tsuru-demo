import { Link } from "wouter";
import { Zap, Shield, TruckIcon, ShoppingCart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { useProducts, useCategories, useHomePage } from "@/hooks/useContent";
import { parsePageSections, getSectionByType } from "@/lib/pageUtils";

export default function Home() {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: pageData } = useHomePage();
  const featuredProducts = products.slice(0, 4);

  const sections = parsePageSections(pageData);
  const hero = getSectionByType(sections, 'hero')?.content || {};
  const benefits = getSectionByType(sections, 'benefits')?.content || {};
  const cta = getSectionByType(sections, 'cta')?.content || {};

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-orange-blue py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {hero.title || "Tsuru': sa' ìyök wö̀"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {hero.subtitle || "Ìyi bua'ë sa' ìyök wa, sa' ditsö̀ wa yö̀ne"}
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/products">
                <a className="bg-white text-accent hover:bg-gray-100 px-8 py-3 rounded-md font-semibold text-lg transition-colors shadow-lg">
                  {hero.ctaPrimary || 'Ìyi sú̱'}
                </a>
              </Link>
              <button className="bg-secondary hover:bg-secondary/90 px-8 py-3 rounded-md font-semibold text-lg transition-colors shadow-lg">
                {hero.ctaSecondary || "Sa' pàke sú̱"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ìs sa' kanè?
            </h2>
            <p className="text-lg text-muted-foreground">
              Ìyi bua'ë, ulà wa yö̀ne, feria ki̱
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(benefits.items || [{icon: 'Zap', title: 'Ìyök ìyi', description: "Ìyi yö̀ne sa' ìyök wa"}, {icon: 'Shield', title: "Sa' ditsö̀", description: "Kanè yö̀ne sa' ditsö̀ ta̱"}, {icon: 'ShoppingCart', title: "Tsuru' pàke", description: "Tsuru' dör sa' pàke kèkla"}, {icon: 'TruckIcon', title: 'Feria ki̱', description: "Ìyi mì be' a̱ feria wa"}]).map((benefit: any, index: number) => {
              const iconMap: any = { Zap, Shield, ShoppingCart, TruckIcon };
              const Icon = iconMap[benefit.icon] || Zap;
              return (
                <div key={index} className="card-modern p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ìyi kie sú̱
            </h2>
            <p className="text-lg text-muted-foreground">
              Be' ìyi yulè kú̱ í̱e̱
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesLoading ? (
              Array(4).fill(0).map((_, i) => <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-32" />)
            ) : (
              categories.map((category: any) => <CategoryCard key={category.id} {...category} />)
            )}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ìyi bua'ë
            </h2>
            <p className="text-lg text-muted-foreground">
              Ìyi yulène bua'ë be' a̱
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsLoading ? (
              Array(4).fill(0).map((_, i) => <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-80" />)
            ) : (
              featuredProducts.map((product: any) => <ProductCard key={product.id} {...product} />)
            )}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <a className="btn-primary px-8 py-3 rounded-md font-semibold text-lg inline-block shadow-orange">
                Ìyi ulìtane sú̱
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {cta.title || "Sa' ta̱ shkö̀?"}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {cta.description || "Feria ki̱ mì sa' ta̱ — ìyi bua'ë tso' be' a̱"}
          </p>
          <Link href="/products">
            <a className="bg-primary hover:bg-accent/90 px-8 py-3 rounded-md font-semibold text-lg inline-block transition-colors shadow-lg">
              {cta.buttonText || 'Ìyi sú̱'}
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

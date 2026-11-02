import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ButtonLink, TextLink } from "@/components/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="bg-ground">
        <div className="container-x py-24 md:py-32">
          <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-faint">404</p>
          <h1 className="mt-3 text-title text-ink">That page isn’t here.</h1>
          <p className="mt-4 max-w-[30rem] text-lede text-ink-soft">
            The link may be old or mistyped. Everything you need is on the homepage, and the free
            audit is one click away.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href="/" variant="primary-light">
              Back to the homepage
            </ButtonLink>
            <TextLink href="/audit">Get your free reputation audit</TextLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

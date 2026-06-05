import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">
          Error 404
        </p>
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-6">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}

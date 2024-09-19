export default function Footer() {
  return (
    <footer className="w-full py-4 md:py-6 h-auto text-muted-foreground">
      <div className="flex items-center justify-between max-w-5xl mx-auto text-sm">
        <div>
          <p className="flex gap-1">
            &copy; {new Date().getFullYear()}
            <span className="hidden sm:block">-</span> GPI360
          </p>
        </div>
        <div>
          Si tenés algún problema, contactá a{" "}
          <span className="underline hover:text-primary cursor-pointer font-bold">
            soporte@gpi360.com
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="w-full py-4 md:py-6 h-auto text-muted-foreground">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} - GPI360 
        </div>
        <div className="text-sm">
          Si tenés algún problema, contactá a <span className="underline hover:text-primary cursor-pointer">soporte@gpi360.com</span>
        </div>
      </div>
    </footer>
  );
}

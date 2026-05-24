const Footer = () => (
  <footer className="relative z-[1] mt-auto px-4 pb-10 pt-6 text-center">
    <p className="font-mono-retro text-xs text-muted-foreground/80">
      &copy; {new Date().getFullYear()}
    </p>
    <p className="font-mono-retro text-[10px] text-muted-foreground/50 mt-2">
      // INSERT COIN TO CONTINUE
    </p>
  </footer>
);

export default Footer;

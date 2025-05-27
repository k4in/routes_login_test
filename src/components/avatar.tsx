export function Avatar() {
  return (
    <div className="relative group cursor-pointer">
      <div className="size-10 rounded-full bg-secondary border-2 border-border hover:border-primary transition-all duration-200 group-hover:shadow-lg group-hover:shadow-primary/20">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-primary/80"></div>
        </div>
      </div>
    </div>
  );
}

import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <>
      {/* Mobile: Horizontal card */}
      <div className="flex lg:hidden items-center gap-4 bg-white/10 rounded-md p-4 w-full">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-[22px] h-[22px] text-text-inverse" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-text-inverse">
            {title}
          </h3>
          <p className="text-[13px] text-white/80">
            {description}
          </p>
        </div>
      </div>

      {/* Desktop: Vertical card */}
      <div className="hidden lg:flex flex-col items-center gap-4 p-6 w-[280px]">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <Icon className="w-7 h-7 text-text-inverse" />
        </div>
        <h3 className="text-xl font-semibold text-text-inverse text-center">
          {title}
        </h3>
        <p className="text-[15px] text-white/80 text-center max-w-[220px]">
          {description}
        </p>
      </div>
    </>
  );
}

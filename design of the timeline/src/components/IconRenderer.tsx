import React from 'react';
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Plane,
  Rocket,
  Heart,
  Star,
  Baby,
  Shield,
  Award,
  MapPin,
  Code,
  Palette,
  BookOpen,
  Compass,
  Home,
  CheckCircle,
  Activity,
  Zap,
} from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-4 h-4' }) => {
  switch (name.toLowerCase()) {
    case 'graduationcap':
    case 'graduation':
    case 'education':
      return <GraduationCap className={className} />;
    case 'briefcase':
    case 'job':
    case 'work':
    case 'career':
      return <Briefcase className={className} />;
    case 'plane':
    case 'travel':
    case 'flight':
      return <Plane className={className} />;
    case 'rocket':
    case 'launch':
    case 'project':
      return <Rocket className={className} />;
    case 'heart':
    case 'relationship':
    case 'love':
      return <Heart className={className} />;
    case 'baby':
    case 'birth':
      return <Baby className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'award':
      return <Award className={className} />;
    case 'mappin':
    case 'location':
      return <MapPin className={className} />;
    case 'code':
      return <Code className={className} />;
    case 'palette':
      return <Palette className={className} />;
    case 'bookopen':
    case 'book':
      return <BookOpen className={className} />;
    case 'home':
      return <Home className={className} />;
    case 'compass':
      return <Compass className={className} />;
    case 'star':
      return <Star className={className} />;
    case 'sparkles':
    case 'decision':
    default:
      return <Sparkles className={className} />;
  }
};

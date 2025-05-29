import { motion } from 'framer-motion';
import { Bot, Brain, Sparkles, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { CONTENT } from '../constants/content';

// Mapping of icon names to lucide-react components
const iconMap = {
  Bot: Bot,
  Brain: Brain,
  Sparkles: Sparkles,
  Zap: Zap,
  Shield: Shield,
  Globe: Globe,
};

const AboutPage = () => {
  const { title, subtitle, mission, features, cta } = CONTENT.aboutPage;

  return (
   <>
   About Page
   </>
  );
};

export default AboutPage;
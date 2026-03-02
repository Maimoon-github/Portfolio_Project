// specialist-portfolio/src/components/ui/HeroKPIStrip/HeroKPIStrip.tsx
import React from 'react';
import clsx from 'clsx';
import { HeroKPIStripProps } from './HeroKPIStrip.types';
import { KPICard } from './KPICard';
import styles from './HeroKPIStrip.module.css';

const HeroKPIStrip: React.FC<HeroKPIStripProps> = ({ data, className }) => {
  return (
    <div className={clsx(styles.kpiStrip, className)}>
      {data.map((item, index) => (
        <KPICard key={index} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export default HeroKPIStrip;
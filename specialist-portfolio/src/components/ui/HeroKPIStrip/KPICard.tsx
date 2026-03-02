// specialist-portfolio/src/components/ui/HeroKPIStrip/KPICard.tsx
import React from 'react';
import { KPICardProps } from './HeroKPIStrip.types';
import styles from './HeroKPIStrip.module.css';

export const KPICard: React.FC<KPICardProps> = ({ label, value }) => {
  return (
    <div className={styles.kpiCard}>
      <div className={styles.kpiCard__value}>{value}</div>
      <div className={styles.kpiCard__label}>{label}</div>
    </div>
  );
};
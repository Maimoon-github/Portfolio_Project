/**
 * Resume/CV type definitions.
 * Aligns with "The Data Specialist" design system and Full Navigation Structure.
 */

/**
 * Professional experience entry.
 */
export interface Experience {
  /** Job title */
  readonly role: string;
  /** Company or organization name */
  readonly company: string;
  /** Optional link to company projects page */
  readonly companyLink?: string;
  /** Employment period (e.g., "2023‑Present" or "2020‑2022") */
  readonly period: string;
  /** Bullet points focused on impact and metrics */
  readonly achievements: readonly string[];
}

/**
 * Education entry.
 */
export interface Education {
  /** Institution name */
  readonly institution: string;
  /** Degree obtained */
  readonly degree: string;
  /** Period of study */
  readonly period: string;
  /** Location (optional) */
  readonly location?: string;
}

/**
 * Certification entry.
 */
export interface Certification {
  /** Certification name */
  readonly name: string;
  /** Issuing organization */
  readonly issuer: string;
  /** Date obtained */
  readonly date: string;
  /** Optional credential ID or URL */
  readonly credentialId?: string;
}

/**
 * Publication or achievement entry.
 */
export interface Publication {
  /** Title of the publication */
  readonly title: string;
  /** Link to the publication (blog post, paper, etc.) */
  readonly link: string;
}

/**
 * Complete resume data structure.
 */
export interface ResumeData {
  /** Core competency tags */
  readonly competencies: readonly string[];
  /** Technical stack organized by category */
  readonly stack: readonly {
    /** Category name (e.g., "Languages", "Frameworks") */
    category: string;
    /** List of skills in this category */
    items: readonly string[];
  }[];
  /** Professional history (chronological) */
  readonly history: readonly Experience[];
  /** Education history */
  readonly education?: readonly Education[];
  /** Professional certifications */
  readonly certifications?: readonly Certification[];
  /** Publications and key achievements */
  readonly publications: readonly Publication[];
}
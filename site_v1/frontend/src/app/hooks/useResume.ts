import useSWR from "swr";
import { getResume } from "../services/api";
import { ResumeData } from "../types/api";

export function useResume() {
  const { data, error } = useSWR<ResumeData>("resume", getResume);
  return { resume: data, loading: !error && !data, error };
}
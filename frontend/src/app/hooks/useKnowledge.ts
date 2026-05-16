import useSWR from "swr";
import { getKnowledge, getTools } from "../services/api";
import { KnowledgeData, Tool } from "../types/api";

export function useKnowledge() {
  const { data, error } = useSWR<KnowledgeData>("knowledge", getKnowledge);
  return {
    data: data || { courses: [], tools: [] },
    loading: !error && !data,
    error,
  };
}

export function useTools() {
  const { data, error } = useSWR<Tool[]>("tools", getTools);
  return { tools: data || [], loading: !error && !data, error };
}
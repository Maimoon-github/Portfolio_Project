import useSWR from "swr";
import { getCourses, getCourse } from "../services/api";
import { Course } from "../types/api";

export function useCourses() {
  const { data, error } = useSWR<Course[]>("courses", getCourses);
  return { courses: data || [], loading: !error && !data, error };
}

export function useCourse(slug: string) {
  const { data, error } = useSWR<Course>(["course", slug], () => getCourse(slug));
  return { course: data, loading: !error && !data, error };
}
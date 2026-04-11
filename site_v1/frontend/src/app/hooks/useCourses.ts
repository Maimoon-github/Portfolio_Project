import useSWR from "swr";
import { getCourses, getCourse } from "../services/api";
import { Course, Paginated } from "../types/api";

export function useCourses() {
  const { data, error } = useSWR<Paginated<Course>>("courses", getCourses);
  return { courses: data?.results || [], loading: !error && !data, error };
}

export function useCourse(slug: string) {
  const { data, error } = useSWR<Course>(["course", slug], () => getCourse(slug));
  return { course: data, loading: !error && !data, error };
}
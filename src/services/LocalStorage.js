// src/services/localStorage.js

const ACTIVITIES_KEY = 'actividades';

export function guardarActividades(data) {
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(data));
}

export function obtenerActividades() {
  const data = localStorage.getItem(ACTIVITIES_KEY);
  return data ? JSON.parse(data) : [];
}

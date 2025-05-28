import { type FruitSearch } from '@/hooks/useFruitSearch';

const SEARCH_STATE_KEY = 'tableSearchState';

export function saveSearchState(category: string, search: FruitSearch) {
  const currentState = JSON.parse(sessionStorage.getItem(SEARCH_STATE_KEY) || '{}');
  currentState[category] = search;
  sessionStorage.setItem(SEARCH_STATE_KEY, JSON.stringify(currentState));
}

export function getSearchState(category: string): FruitSearch {
  const currentState = JSON.parse(sessionStorage.getItem(SEARCH_STATE_KEY) || '{}');
  return currentState[category] || {};
}

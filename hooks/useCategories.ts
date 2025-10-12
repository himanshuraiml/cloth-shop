import { useNavigation } from '@/contexts/NavigationContext';

export function useCategories() {
  const { categories, loadingCategories, refreshCategories } = useNavigation();

  const getCategoryBySlug = (slug: string) => {
    return categories.find(cat => cat.slug === slug);
  };

  const getParentCategories = () => {
    return categories.filter(cat => !cat.parent_id);
  };

  const getChildCategories = (parentId: string) => {
    return categories.filter(cat => cat.parent_id === parentId);
  };

  return {
    categories,
    loading: loadingCategories,
    refresh: refreshCategories,
    getCategoryBySlug,
    getParentCategories,
    getChildCategories
  };
}

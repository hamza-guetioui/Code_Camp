import { IFeature } from "@/types/feature";
import { useEffect, useMemo, useState } from "react";

const useSearch = (features: IFeature[]) => {
    const [search, setSearch] = useState<string>('');
    const [result, setResult] = useState<IFeature[]>(features);
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (!search.trim()) {
          setResult(features);
        } else {
          const filtered = features.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          );
          setResult(filtered);
        }
      }, 300); // debounce delay of 300ms
  
      return () => clearTimeout(timeoutId);
    }, [search, features]);
  
    // Optional message logic: if a search term is provided but no features match.
    const message = useMemo(() => {
      if (search.trim() && result.length === 0) {
        return 'No results found.';
      }
      return '';
    }, [search, result]);
  
    return { search, setSearch, result, message };
  };
  
  export default useSearch;
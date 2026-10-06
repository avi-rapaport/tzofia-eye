import { useEffect, useState } from 'react';

export function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(url, { credentials: 'include' });

        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }
        setData(result);
        setIsLoading(false);
      } catch (err) {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : 'an error accurd';
          setError(message);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading, error };
}

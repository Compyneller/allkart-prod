import api from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import { useCoordinates } from 'hooks/useCoordinates';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity, useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';



function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
const Search = () => {
    const router = useRouter()
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState('');
    const { location: coordinates, error, isLoading: LocationLoading } = useCoordinates()
    const wrapperRef = useRef<HTMLDivElement>(null);
    const debouncedQuery = useDebounce(query, 300);



    useEffect(() => {
        // 2. Define the event handler
        function handleClickOutside(event: MouseEvent) {
            // If the wrapper exists and the clicked target is NOT inside the wrapper
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }

        // 3. Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on cleanup
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);


    const { data: suggestions, isLoading } = useQuery({
        queryKey: ["search-suggestions", debouncedQuery],

        queryFn: async ({ signal }) => {
            const { data } = await api.get(`/api/v1/search-suggestion`, {
                params: {
                    q: debouncedQuery,
                    latitude: coordinates?.lat,
                    longitude: coordinates?.lng
                },
                signal,
            });
            return data;
        },

        // C. Conditions: Only run if we have 2+ characters
        enabled: debouncedQuery.length >= 2,
    });

    return (
        <div ref={wrapperRef} className='w-full relative'>
            <Input placeholder="Search" onKeyDown={(e) => {
                if (e.key === "Enter") {
                    router.push(`/search?q=${encodeURIComponent(query)}`)
                    setShowSuggestions(false)
                }
            }} onFocus={() => setShowSuggestions(true)} onChange={(e) => setQuery(e.target.value)} />
            <Activity mode={showSuggestions && (suggestions || isLoading) ? 'visible' : 'hidden'}>
                <div className='absolute z-20 top-full left-0 w-full h-full rounded-b-lg py-5 px-2 bg-white dark:bg-primary flex items-center '>
                    <ul className='space-y-2'>
                        {
                            isLoading ? <h1>Loading...</h1> : null
                        }
                        {
                            suggestions?.data?.length === 0 ? <h1 className='text-sm text-black'>No items found</h1> : null
                        }
                        {suggestions?.data?.map((suggestion: { title: string }) => (
                            <li key={suggestion.title} onClick={() => {
                                setShowSuggestions(false)
                            }} className='p-2 flex text-sm text-black items-center gap-1'>
                                <SearchIcon className="w-4 h-4" /> <Link href={`/search?q=${encodeURIComponent(suggestion.title)}`}>{suggestion.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Activity>
        </div>
    )
}

export default Search
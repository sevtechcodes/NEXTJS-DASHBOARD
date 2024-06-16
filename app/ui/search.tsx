'use client'; // This is a Client Component, which means you can use event listeners and hooks.

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// import { useDebouncedCallback } from 'use-debounce';
export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
  const { replace } = useRouter();

	//<Search> is a Client Component, so you used the useSearchParams() hook to access the params from the client.
	//<Table> is a Server Component that fetches its own data, so you can pass the searchParams prop from the page to the component.
	//if you want to read the params from the client, use the useSearchParams() hook as this avoids having to go back to the server.
	function handleSearch(term: string){
		console.log(`Searching... ${term}`); 
		//We saw each time we type, it makes server request. We need to debounce it to prevent multiple unneccessay requests.
		//we'll use a library called use-debounce: pnpm i use-debounce
		const params = new URLSearchParams(searchParams); //URLSearchParams is a Web API that provides utility methods for manipulating the URL query parameters.
		params.set('page', '1');
		//set the params string based on the user’s input. If the input is empty, you want to delete it:
		if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
		replace(`${pathname}?${params.toString()}`);
	}

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
				onChange={(e)=>{
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get('query')?.toString()} //To ensure the input field is in sync with the URL and will be populated when sharing
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

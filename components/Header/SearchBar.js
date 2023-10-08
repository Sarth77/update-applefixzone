"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
const SearchBar = () => {
    const { status } = useSession()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        defaultValues: {
            query: '',
        }
    });
    const onSubmit = (data) => {
        if (status === "loading") return
        return new Promise(async (resolve, reject) => {
            const searchQuery = data.query.toString()
            if (searchQuery) {
                reset()
                resolve(router.push(`/searchpage?query=${searchQuery}`))
            }
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center bg-gray-100 p-2 rounded-full w-full'>
            <span><BiSearch size={20} className='opacity-50' /></span>
            <input
                id="query"
                name="query"
                {...register('query')}
                type="text"
                className="w-full outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]"
                placeholder="Search"
                autoComplete="false"
            />
        </form>
    )
}

export default SearchBar
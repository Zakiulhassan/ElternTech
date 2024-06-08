"use client"
import { useFormStatus } from "react-dom"


export default function PostButton () {
    const {pending} = useFormStatus();
    return(
        <button
        disabled={pending}
            className="block mx-2 bg-gray-800 disabled:opacity-50 rounded-md px-2 py-1 text-white" type="submit">
            Submit
        </button>
    )
}
import { FaTools } from "react-icons/fa";

export default function NotImplemented({
    title = "Feature Not Available",
    message = "This feature is not yet implemented. Please check back later."
}) {
    return (
        <div className="flex flex-col items-center justify-center h-96 text-center">
            <FaTools className="w-16 h-16 text-gray-400 dark:text-gray-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-white">{title}</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{message}</p>
        </div>
    );
}

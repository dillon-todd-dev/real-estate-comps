import { useQuery } from "@tanstack/react-query"

export const AUTH = "auth";

const useAuth = (opts = {}) => {
    const { data: currentUser, ...rest } = useQuery({
        queryKey: 
    })
})
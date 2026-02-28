import { useEffect, useState } from "react";
import { getTopicsRequest } from "../api/auth";
import { getRecentCallsRequest } from "../api/auth";

interface Topic {
    id: number;
    iconUrl: string;
    name: string;
}

interface TopicResponse {
    defaultThemes: Topic[];
    favoriteThemes: Topic[];

}

interface RecentCall {
    id: number;
    iconUrl: string;
    name: string;
    rating: number;
}

interface RecentCallResponse {
    content: RecentCall[];
}

export const useClient = () => {
    const [topics, setTopics] = useState<TopicResponse | null>(null);
    const [allRecentCalls, setAllRecentCalls] = useState<RecentCallResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setIsLoading(true);
                const topicsData = await getTopicsRequest();
                setTopics(topicsData);
                const callsData = await getRecentCallsRequest();
                setAllRecentCalls(callsData);
            } catch (err) {
                console.error("API Error - Fetching dashboard failed:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    return {
        defaultTopics: topics?.defaultThemes || [],
        favoriteTopics: topics?.favoriteThemes || [],
        recentCalls: allRecentCalls?.content || [],
        isLoading
    }
}

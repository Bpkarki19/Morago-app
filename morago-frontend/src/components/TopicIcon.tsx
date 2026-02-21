import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

interface TopicIconProps {
    iconUrl: string;
    altText?: string;
    className?: string;
}

export const TopicIcon = ({ iconUrl, altText = "", className }: TopicIconProps) => {
    const [src, setSrc] = useState<string>("");

    useEffect(() => {
        let active = true;
        let url = "";

        const fetchImage = async () => {
            if (!iconUrl) return;

            // If it's an external URL (not our API), just use it directly
            if (iconUrl.startsWith('http') && !iconUrl.includes('morago-api')) {
                setSrc(iconUrl);
                return;
            }

            try {
                const response = await apiClient.get(iconUrl, { responseType: "blob" });

                if (active) {
                    url = URL.createObjectURL(response.data);
                    setSrc(url);
                }
            } catch (error) {
                console.error("Failed to load icon:", error);
            }
        };

        fetchImage();

        return () => {
            active = false;
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    }, [iconUrl]);

    // If no src, we can render nothing or a placeholder
    if (!src) return <div className={className} style={{ background: '#eee' }} />;

    return <img src={src} alt={altText} className={className} />;
};

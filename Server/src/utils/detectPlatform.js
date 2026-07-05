export const detectPlatform = (contentUrl) => {
    try {
        const hostname = new URL(contentUrl).hostname.toLowerCase();

        if (
            hostname.includes("youtube.com") ||
            hostname.includes("youtu.be")
        ) {
            return "youtube";
        }

        if (hostname.includes("instagram.com")) {
            return "instagram";
        }

        return "unsupported";
    } catch (error) {
        return "invalid";
    }
};
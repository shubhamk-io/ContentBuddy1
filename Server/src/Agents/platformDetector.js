import { detectPlatform } from "../utils/detectPlatform"


export const platformDetector = async (state) => {
    
const platform = detectPlatform(state.contentUrl);

if(platform === "unsupported" || platform === "invalid"){
    return {error: "Unsupported and Invalid URL"}
}

return platform;

}
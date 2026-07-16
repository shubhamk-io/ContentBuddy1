import { findSimilarVideos } from "../utils/findSimilarVideos"



export const similarVideoFinderAgent = async(state) => {
if(!state.searchQuery){
    return {similarVideos: []}
}

const video = await findSimilarVideos(state.searchQuery,5);

return {similarVideos:video};
}
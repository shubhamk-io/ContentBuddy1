


export const transcriptAgent = async (state) => {
    
    const result = await getTranscript(state.contentUrl);

    if(!result.success){
        return {error:result.error}
    }

    return {
        transcript : result.transcript,
        transcriptMethod: result.method,
    }
}
export interface AISummary {
    summary: string;
}

export const getAISummary = async (search: string): Promise<AISummary> => {
    // wait for 3 second to simulate delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // return a default summary for now
    // TODO: Use an AI model to generate summary
    return { summary: "Example summary for " + search.slice(0,20)};
}

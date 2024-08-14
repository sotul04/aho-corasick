interface TextState{
    text: string;
    patterns: string[]
}

function parseInputCase(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                resolve(json);
            } catch (error) {
                reject(error);
            }
        }
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    })
}

export async function getInputCase(file: File): Promise<TextState | null> {
    try {
        const data = await parseInputCase(file);
        if (!data.text || !data.patterns) return null;

        return {
            text: data.text,
            patterns: data.patterns
        }

    } catch (error) {
        return null;
    }
}
import { ResultItem } from "./result-item"

type SolutionType = {
    pattern: string,
    appearances: Array<[number, number]>
}

interface ResultProps {
    result: Array<SolutionType>
}

export function Result({ result }: ResultProps) {
    return <>
        <h3 className="text-xl text-center mb-3 font-serif font-semibold">Result</h3>
        <div className="rounded p-3 shadow-md grid grid-cols-3 items-center text-sm font-semibold">
            <p>Pattern</p>
            <p>Number of Occurrences</p>
            <p>{"Position of Occurences"}</p>
        </div>
        {
            result.map(item => <ResultItem key={item.pattern} pattern={item.pattern} appearances={item.appearances} />)
        }
    </>
}
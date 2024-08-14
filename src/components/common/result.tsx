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
        <div className="rounded p-3 shadow-md grid grid-cols-3 items-center">
        <p>Pattern</p>
        <p>Number of Occurrences</p>
        <p>{"Position of Occurences"}</p>
    </div>
    {
        result.map(item => <ResultItem key={item.pattern} pattern={item.pattern} appearances={item.appearances}/>)
    }
    </>
}
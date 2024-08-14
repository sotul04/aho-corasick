import { IndexBox } from "./index-box-item";

interface ResultItemProps {
    pattern: string;
    appearances: Array<[number, number]>
}

export function ResultItem({ pattern, appearances }: ResultItemProps) {
    
    return <div className="rounded p-3 shadow-md grid grid-cols-3">
        <p >{pattern}</p>
        <p >{appearances.length}</p>
        <div className="flex flex-wrap gap-2">
            {appearances.map(item => <IndexBox key={`${item[0]}${item[1]}`} first={item[0]} second={item[1]}/>)}
        </div>
    </div>

}
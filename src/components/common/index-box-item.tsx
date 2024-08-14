export function IndexBox({first, second}: {first: number, second: number}) {
    return <div className="inline-flex rounded shadow-md px-2 py-1">
        <span>{`${first}, ${second}`}</span>
    </div>

}
declare module 'react-graph-vis' {
    import * as React from 'react';

    export interface Node {
        id: number | string;
        label?: string;
        title?: string;
        [key: string]: any;
    }

    export interface Edge {
        from: number | string;
        to: number | string;
        [key: string]: any;
    }

    export interface Graph {
        nodes: Node[];
        edges: Edge[];
    }

    export interface Options {
        layout?: any;
        edges?: any;
        nodes?: any;
        physics?: any;
        [key: string]: any;
    }

    export interface Events {
        select?: (event: { nodes: any[]; edges: any[] }) => void;
        [key: string]: any;
    }

    export interface GraphProps {
        graph: Graph;
        options?: Options;
        events?: Events;
        getNetwork?: (network: any) => void;
        style?: React.CSSProperties;
    }

    const Graph: React.FC<GraphProps>;

    export default Graph;
}

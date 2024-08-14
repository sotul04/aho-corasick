import React from "react";
import Graph from "react-graph-vis";
import { AhoCorasick } from "../model/AhoCorasick";

interface TextProps {
    text: string;
    patterns: string[];
}

export default function Automaton({ text, patterns }: TextProps) {

    const automaton = new AhoCorasick(text, patterns);

    for (const pattern of patterns) {
        automaton.addString(pattern);
    }

    const edges: { from: number, to: number, label: string, color: { color: string } }[] = [];

    automaton.trie.map((node, index) => {
        automaton.getLink(index);
        node.next.forEach((val, key) => edges.push({
            from: index,
            to: val,
            label: key,
            color: { color: "black" }
        }));

        if (index !== 0) {
            edges.push({
                from: index,
                to: node.link,
                label: "",
                color: { color: "blue" }
            });
        }

    });

    automaton.trie.map((node, index) => {
        if (node.output) {
            let currNode = automaton.trie[node.link]
            let currIdx = node.link
            while (!currNode.output && currIdx !== 0) {
                currIdx = currNode.link;
                currNode = automaton.trie[currNode.link];
            }
            if (currIdx !== 0 && currNode.output) {
                edges.push({
                    from: index,
                    to: currIdx,
                    label: "",
                    color: { color: "green" }
                });
            }
        }
    })

    const graph = {
        nodes: automaton.trie.map((node, index) => ({
            id: index,
            label: node.str,
            title: node.str,
            color: node.output ? "#6095F7" : "#AAAAAA",
        })),
        edges
    };

    const options = {
        layout: {
            hierarchical: false,
        },
        edges: {
            smooth: {
                type: "dynamic", 
                roundness: 0.5, 
            },
            arrows: {
                to: {
                    enabled: true,
                },
            },
            color: {
                color: "#000000",
                highlight: "#ff0000",
            },
        },
        nodes: {
            shape: "circle",
        },
        physics: {
            enabled: true,
        },
    };

    const events = {
        select: function (event: any) {
            const { nodes, edges } = event;
            console.log("Selected nodes:", nodes);
            console.log("Selected edges:", edges);
        },
    };

    return (
        <div style={{ height: "750px" }}>
            <Graph graph={graph} options={options} events={events} style={{ height: "100%" }} />
        </div>
    );
}

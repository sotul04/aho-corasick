export class Vertex {
    next: Map<string, number>;
    output: boolean;
    parent: number;
    parentChar: string;
    link: number;
    go: Map<string, number>;
    str: string;

    constructor(parent: number = -1, parentChar: string = '$') {
        this.next = new Map<string, number>();
        this.output = false;
        this.parent = parent;
        this.parentChar = parentChar;
        this.link = -1;
        this.go = new Map<string, number>();
        this.str = "";
    }
}

export class AhoCorasick {
    trie: Vertex[];
    patterns: string[];
    text: string;

    constructor(text: string, patterns: string[]) {
        this.trie = [new Vertex()];
        this.text = text;
        this.patterns = patterns;
    }

    getCharCodeInsensitive(c: string): string {
        if (c >= 'A' && c <= 'Z') {
            return c.toLowerCase();
        }
        return c;
    }

    addString(s: string) {
        let currVertex = 0;
        for (const ch of s) {
            const code = this.getCharCodeInsensitive(ch);
            if (!this.trie[currVertex].next.has(code)) {
                this.trie[currVertex].next.set(code, this.trie.length);
                const newVertex = new Vertex(currVertex, code);
                newVertex.str = this.trie[currVertex].str + code;
                this.trie.push(newVertex);
            }
            currVertex = this.trie[currVertex].next.get(code)!;
        }
        this.trie[currVertex].output = true;
    }

    getLink(currVertex: number): number {
        if (this.trie[currVertex].link === -1) {
            if (currVertex === 0 || this.trie[currVertex].parent === 0) {
                this.trie[currVertex].link = 0;
            } else {
                this.trie[currVertex].link = this.go(this.getLink(this.trie[currVertex].parent), this.trie[currVertex].parentChar);
            }
        }
        return this.trie[currVertex].link;
    }

    private go(currVertex: number, letter: string): number {
        const code = this.getCharCodeInsensitive(letter);
        if (!this.trie[currVertex].go.has(code)) {
            if (this.trie[currVertex].next.has(code)) {
                this.trie[currVertex].go.set(code, this.trie[currVertex].next.get(code)!);
            } else {
                this.trie[currVertex].go.set(code, currVertex === 0 ? 0 : this.go(this.getLink(currVertex), letter));
            }
        }
        return this.trie[currVertex].go.get(code)!;
    }

    searchInText(): Map<string, Array<[number, number]>> {
        const patternMatch = new Map<string, Array<[number, number]>>();
        this.patterns.map(pattern => {
            this.addString(pattern);
            patternMatch.set(pattern, []);
        });
        let currVertex = 0;
        for (let i = 0; i < this.text.length; i++) {
            currVertex = this.go(currVertex, this.text[i]);
            for (let tempVertex = currVertex; tempVertex !== 0; tempVertex = this.getLink(tempVertex)) {
                if (this.trie[tempVertex].output) {
                    patternMatch.get(this.trie[tempVertex].str)!.push([i - this.trie[tempVertex].str.length + 1, i]);
                }
            }
        }
        return patternMatch;
    }
}

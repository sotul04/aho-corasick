'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInputCase } from "@/lib/parse";
import { ChangeEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AhoCorasick } from "@/components/model/AhoCorasick";
import { ResultItem } from "@/components/common/result-item";
import { Result } from "@/components/common/result";
import Graph from "react-graph-vis";
import { Vertex } from "@/components/model/AhoCorasick";
import Automaton from "@/components/common/automaton";

interface TextProps {
  text: string;
  patterns: string[];
}

type SolutionType = {
  pattern: string,
  appearances: Array<[number, number]>
}

export default function Home() {

  const { toast } = useToast();
  const [textState, setTextState] = useState<TextProps | null>(null);
  const [parsingMessage, setParsingMessage] = useState<string | null>(null);
  const [solution, setSolusion] = useState<Array<SolutionType> | null>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    setSolusion(null);
    if (selectedFile) {
      try {
        const parsedTextCase = await getInputCase(selectedFile);
        setTextState(parsedTextCase);
        if (!parsedTextCase) setParsingMessage("The file format is not appropriate");
        else setParsingMessage(null);
      } catch (error) {
        setParsingMessage("Failed to parse the file.");
      }
    }
  }

  function handleClickSearch() {
    if (textState) {
      if (textState.patterns.length > 0) {
        const solver = new AhoCorasick(textState.text, textState.patterns);
        const result = solver.searchInText();
        const solutionResult = new Array<SolutionType>()
        result.forEach((val, key) => solutionResult.push({
          pattern: key,
          appearances: val
        }))
        setSolusion(solutionResult);
      } else {
        setSolusion(null);
        toast({
          title: 'Pattern violation',
          description: 'The pattern you upload is empty.',
          variant: 'destructive'
        });
      }
    }
  }

  return (
    <>
      <section className="w-[65%] min-w-[400px] flex flex-col mt-10 item-center container">
        <div className="container mt-4">
          <Label htmlFor="input" className="inline-flex">
            Upload your text and query as .json file
          </Label>
          <Input
            className="cursor-pointer"
            id="input"
            type="file"
            accept="application/json"
            multiple={false}
            onChange={handleFileChange}
          />
          {parsingMessage && <p className="text-sm text-red-500 mb-4 max-w-[300px]">{parsingMessage}</p>}
          <p className="text-sm mt-3">The .json file must has format like this example.</p>
          <div className="rounded-md bg-gray-200 py-3 px-4 text-sm">
            <p>{"{"}</p>
            <p className="pl-4">"text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."</p>
            <p className="pl-4">{"\"pattern\": [ \"query1\", \"query2\", \"query3\", ... ]"}</p>
            <p>{"}"}</p>
          </div>
          {textState && <>
            <p className="text-sm mt-2 font-bold">Text from file:</p>
            <div className="rounded-md bg-gray-100 py-3 px-4 text-sm font-semibold">
              <p>{textState.text}</p>
            </div>
          </>}
          <Button className="my-4" disabled={textState === null} onClick={() => handleClickSearch()}>Search</Button>
        </div>
      </section>
      {solution &&
        <section className="flex flex-col w-[65%] min-w-[400px] mt-10 item-center container justify-center gap-4">
          <div className="container">
            <Result result={solution} />
          </div>
        </section>
      }
      { solution && textState && <section className="w-[90%] mx-auto">
        <h2 className="text-center text-xl font-serif font-semibold mt-5">Automaton</h2>
        <Automaton text={textState.text} patterns={textState.patterns} />
      </section>}
    </>
  );
}

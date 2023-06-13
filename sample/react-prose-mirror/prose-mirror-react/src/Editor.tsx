import { EditorState, Transaction } from "prosemirror-state"
import { EditorView } from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import { useCallback, useEffect, useRef } from "react"
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

const mySchema = new Schema({
    nodes: {
    doc: {
      content: "block+"
    },
    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return ["p", 0];
      }
    },
    text: {
      group: "inline"
    }
  },
})

const state = () => {
    const element = document.createElement("div")
    return EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(element),
        plugins: [
            keymap({
        Enter: baseKeymap["Enter"],
        Backspace: baseKeymap["Backspace"]
            })
        ]
})}

export function Editor() {
    const editorDOMRef = useRef<HTMLDivElement | null>(null)
    const editorViewRef = useRef<EditorView>()

    const update = useCallback((transaction: Transaction) => {
        if (editorViewRef.current) {
            console.log("a", transaction)
            console.log("Document size went from", transaction.before.content.size,
                "to", transaction.doc.content.size)
            const newState = editorViewRef.current.state.apply(transaction)
            editorViewRef.current.updateState(newState)
        }
    }, [editorViewRef])

    useEffect(() => {
        if (editorDOMRef.current != null && editorViewRef.current === undefined) {
            editorViewRef.current = new EditorView(editorDOMRef.current, {
                state: state(),
                dispatchTransaction: update
            })
        }
        return () => {
            console.log("destory")
        }
    }, [update])

    const onClick = useCallback(() => {
        console.log(editorViewRef.current)
    }, [])
    return (
        <div>
            <div ref={editorDOMRef} />
            <button onClick={onClick} type="button">submit</button>
        </div>
    )
}
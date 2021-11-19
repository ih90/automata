import prompt from 'prompt';
import * as fs from 'fs';
import FiniteAutomata from "./src/finiteAutomata.js";

const menu = "0.Exit\n" +
    "1.Display initial state\n" +
    "2.Display FA States\n" +
    "3.Display FA Alphabet\n" +
    "4.Display FA transitions\n" +
    "5.Display FA final states\n" +
    "6.Check if sequence is accepted by the FA\n" +
    "Input>>";
console.log(menu);
prompt.start();

const fileContent = fs.readFileSync('src/fa.in', 'utf8').toString().split("\n");
const automata = new FiniteAutomata(fileContent);


const display = () => {
    prompt.get(['option'], function (err, result) {
        if (err) { return onErr(err); }
        console.log('input received:');
        const option = parseInt(result.option, 10);
        console.log('  Option: ', option);
        switch(option) {
            case 1:
                console.log("Initial state: ", automata.initialState);
                display();
                break;
            case 2:
                console.log("FA states: ", automata.states);
                display();
                break;
            case 3:
                console.log("Fa alphabet: ", automata.alphabet);
                display();
                break;
            case 4:
                console.log("Fa transitions: ", automata.transitions);
                display();
                break;
            case 5:
                console.log("Fa final states: ", automata.finalStates);
                display();
                break;
            case 6:
                prompt.get(['sequence'], function (err, result) {
                    if (err) { return onErr(err); }
                    const sequence = result.sequence;
                    console.log("Is accepted: ", automata.verifyIfTheFAIsAccepted(sequence));
                    display();
                });

                break;
            case 0:
                console.log("Done");
                break;
            default:
                break;
        }
    });
}

display();

function onErr(err) {
    console.log(err);
    return 1;
}

class FiniteAutomata {
    states = [];
    alphabet = [];
    initialState;
    finalStates;
    transitions = new Map();

    constructor(arrayFromFile) {
        this.states = [];
        this.alphabet = [];
        this.finalStates = [];
        this.transitions = new Map();
        this.assignValuesFromFile(arrayFromFile);
    }

    // returns true if all the transition are valid (value is different form null)
    isDFA = () => {
        for (let value of this.transitions.values()){
            if (value === null){
                return false;
            }
        }
        return true;
    }

    // method which adds the values from string, if the length is 1, to the list
    initializeLists = (aux, list) => {
        aux.forEach(entry => {
            if (entry.length === 1){
                list.push(entry);
            }
        })
    }
    // method that takes the value from a list of strings,
    // which is the content of a file, and assigned those values to the declared fields
    assignValuesFromFile = (fileContent) => {
        const auxStates = fileContent[0].split(' ');
        this.initializeLists(auxStates, this.states);
        const auxAlphabet = fileContent[1].split(' ');
        this.initializeLists(auxAlphabet, this.alphabet);
        this.initialState = fileContent[2].charAt(5);
        const auxFinalStates = fileContent[3].split(' ');
        this.initializeLists(auxFinalStates, this.finalStates);
        for (let i = 5; i < fileContent.length; i++) {
            const line = fileContent[i];
            const chr1 = line[1];
            const chr2 = line[4];
            const chr3 = line[9];
            this.transitions.set(`${chr1}-${chr2}`, chr3);
        }
    }

    // returns true if the state is final state, or false otherwise
    isFinalState = (string) => {
        return !!this.finalStates.includes(string);
    }

    // method verifies if the given sequence is accepted as FA, we iterate
    // through the sequence and see if we have a value at the position(currentState, first character of the sequence)
    // we have a path from a node to another; currentState is first the initial state and then is the next node
    verifyIfTheFAIsAccepted = (sequence) => {
        if (this.isDFA()) {
            let currentState = this.initialState;
            for (let i = 0; i < sequence.length; i++) {
            const constant = sequence[i];
            const item = (`${currentState}-${constant}`);
            if (this.transitions.get(item)){
                currentState = this.transitions.get(item);
            } else {
                return false;
            }
        }
        return this.isFinalState(currentState);
        }
        return false;
    }
}


export default FiniteAutomata;
const clearDataType = "CLEAR_DATA";
const addParameterType = "PARAMETER_ADDED";
const deleteParameterType = "PARAMETER_DELETED";
const addFieldType = "FIELD_ADDED";
const deleteFieldType = "FIELD_DELETED";
const inputChangeType = "INPUT_CHANGE";
const changeConsistencyType = "CHANGE_CONSISTENCY_TYPE";


const initialState = {
    parameters: ["Actors", "Goals", "Methods", "Means"],
    fields: [["State", "Network", "Business Enterprise", "Individual(s)"],
    ["Regime Change", "Political Concessions", "Mil. Exercise/Intel. Gathering", "Economic Gain"],
    ["Mil. Control Entire Territory",
        "Mil. Control Parts of Territory",
        "Denial of Access",
        "Symbolic Use of Force",
        "Peace Time Operations",
        "Att. Infrastr./Population",
        "Economic Force",
        "Criminality"],
    ["Large Scale Use of Force",
        "Limited Use of Force",
        "Large Scale Non-Mil. Force",
        "Limited Non-Mil. Force",
        "Economic Sanctions",
        "Other Means",]],
    matrix: [
    	new Array(22).fill(false),
		new Array(22).fill(false),
		new Array(22).fill(false),
		new Array(22).fill(false),
        [true,  false, false, false].concat(new Array(22-4).fill(false)),
        [true,  true,  false, true].concat(new Array(22-4).fill(false)),
        [true,  true,  false, false].concat(new Array(22-4).fill(false)),
        [false, false, true,  true].concat(new Array(22-4).fill(false)),

        [false, false, false, false, true,  false, false, false].concat(new Array(22-4-4).fill(false)),
        [true,  false, false, false, false, true,  false, false].concat(new Array(22-4-4).fill(false)),
        [true,  false, false, false, false, true,  false, false].concat(new Array(22-4-4).fill(false)),
        [true,  false, false, false, false, true,  false, false].concat(new Array(22-4-4).fill(false)),
        [true,  false, false, false, false, false, true,  false].concat(new Array(22-4-4).fill(false)),
        [true,  true,  false, true,  false, true,  false, false].concat(new Array(22-4-4).fill(false)),
        [true,  false, true,  false, false, true,  false, false].concat(new Array(22-4-4).fill(false)),
        [false, false, true,  true,  false, false, false, true].concat(new Array(22-4-4).fill(false)),

        [true,  false, false, false, true,  true,  false, false, true,  true,  false, false, false, false, false, false,].concat(new Array(22-4-4-8).fill(false)),
        [true,  false, false, false, false, true,  true,  false, false, true,  true,  true,  true,  true, false, false,].concat(new Array(22-4-4-8).fill(false)),
        [false, true,  false, false, false, true,  false, false, false, false, false, false, false, true, false, false,].concat(new Array(22-4-4-8).fill(false)),
        [false, true,  false, true,  false, true,  false, false, false, false, false, false, false, true, false, false,].concat(new Array(22-4-4-8).fill(false)),
        [true,  false, true,  false, false, true,  false, false, false, false, false, false, false, false, true, false,].concat(new Array(22-4-4-8).fill(false)),
        [true,  true,  true,  true,  false, false, false, true,  false, false, false, false, false, false, false, true,].concat(new Array(22-4-4-8).fill(false)),
	],
    solutions: []
};
const range = (start, stop, step=1) => Array(stop - start).fill(start).map((x, y) => x + y * step)

const arraySum = arr => arr.reduce((a,b) => a + b, 0)


function product() {
  let args = Array.prototype.slice.call(arguments); // makes array from arguments
  return args.reduce(function tl (accumulator, value) {
    let tmp = [];
    accumulator.forEach(function (a0) {
      value.forEach(function (a1) {
        tmp.push(a0.concat(a1));
      });
    });
    return tmp;
  }, [[]]);
}

function checkConsistencyOfGroup(group, matrix) {
    for (let i = 0; i < group.length; i++)
    {
        let col_nbr = group[i];
        for (let j = i+1; j < group.length; j++)
        {
            let row_nbr = group[j];
            if (!matrix[row_nbr][col_nbr])
            {
                return false;
            }
        }
    }
    return true;
}

const calculateSolutions = function (parameters, matrix) {
    let parameterLengths = parameters.map(p => (p.length));
    let ranges = parameterLengths.map((n, i) => range(arraySum(parameterLengths.slice(0, i)), arraySum(parameterLengths.slice(0, i+1)) ));
    let solutions = []
    product(...ranges).forEach(group => {
        let consistent = checkConsistencyOfGroup(group, matrix);
        if (consistent)
        {
            solutions.push(group);
        }
    });
    return solutions;
};

export const actionCreators = {

    // setHoverEffectOnCells: (query) => async (dispatch, getState) => {
    // 	dispatch({ type: priorityInteractionHoverType, hoverEffect: query.cell });
    // },
    clearAllData: (query) => async (dispatch, getState) => {
        dispatch({
            type: clearDataType,
            parameters: [],
            fields: [],
            matrix: [],
        });
    },
    addParameter: (query) => async (dispatch, getState) => {
        let state = getState();
        dispatch({
            type: addParameterType,
            parameters: state.data.parameters.concat(["", ]),
            fields: state.data.fields.concat([[], ]),
        });
    },
    deleteParameter: (query) => async (dispatch, getState) => {
        let state = getState();

        let nFields = state.data.fields[query.parameterIndex].length
        let parameterLengths = state.data.fields.map(p => (p.length));

        // Handle matrix
        let matrix = state.data.matrix.slice()
        // For each row, insert a new column value.
        let deleteFrom = arraySum(parameterLengths.slice(0, query.parameterIndex))
        for (let i = 0; i < matrix.length; i++) {
            matrix[i].splice(deleteFrom, nFields);
        }
        matrix.splice(deleteFrom, nFields);

        // Handle Fields
        let fields = state.data.fields.slice();
        fields.splice(query.parameterIndex, 1);

        // Handle Parameters
        let parameters = state.data.parameters.slice();
        parameters.splice(query.parameterIndex, 1);

        dispatch({
            type: deleteParameterType,
            parameters: parameters,
            fields: fields,
            matrix: matrix
        });
    },
    addField: (query) => async (dispatch, getState) => {
        let state = getState();
        let parameterLengths = state.data.fields.map(p => (p.length));

        // Handle fields
        let fields = state.data.fields.slice();
        fields[query.parameterIndex].push("");

        // Handle matrix
        let matrix = state.data.matrix.slice()
        // For each row, insert a new column value.
        let newRowAndColumnIndex = arraySum(parameterLengths.slice(0, query.parameterIndex+1))
        for (let i = 0; i < matrix.length; i++) {
            matrix[i].splice(newRowAndColumnIndex, 0, false);
        }
        matrix.splice(newRowAndColumnIndex, 0, new Array(arraySum(parameterLengths)+1).fill(false));

        dispatch({
            type: addFieldType,
            fields: fields,
            matrix: matrix,
        });
    },
    deleteField: (query) => async (dispatch, getState) => {
        let state = getState();

        let nFields = 1
        let parameterLengths = state.data.fields.map(p => (p.length));

        // Handle matrix
        let matrix = state.data.matrix.slice()
        // For each row, insert a new column value.
        let deleteFrom = arraySum(parameterLengths.slice(0, query.parameterIndex)) + query.fieldIndex
        for (let i = 0; i < matrix.length; i++) {
            matrix[i].splice(deleteFrom, nFields);
        }
        matrix.splice(deleteFrom, nFields);

        // Handle Fields
        let fields = state.data.fields.slice();
        fields[query.parameterIndex].splice(query.fieldIndex, 1);

        dispatch({
            type: deleteFieldType,
            fields: fields,
            matrix: matrix
        });
    },
    changeName: (query) => async (dispatch, getState) => {
        let state = getState();

        switch (query.type) {

            case "parameter":
                let parameters = state.data.parameters.slice()
                parameters[query.parameterIndex] = query.value;
                dispatch({
                    type: inputChangeType,
                    parameters: parameters,
                    fields: state.data.fields
                });
                break
            case "field":
                let fields = state.data.fields.slice()
                fields[query.parameterIndex][query.fieldIndex] = query.value;
                dispatch({
                    type: inputChangeType,
                    parameters: state.data.parameters,
                    fields: fields
                });
                break
            default:
                break;
        }
    },
    changeConsistencyState: (query) => async (dispatch, getState) => {
        let state = getState();
        let matrix = state.data.matrix.slice();
        matrix[query.row_idx][query.column_idx] = !matrix[query.row_idx][query.column_idx];
        dispatch({type: changeConsistencyType, matrix});
    },
};

export const reducer = function (state = 0, action) {
    state = state || initialState;

    switch (action.type) {
        case addParameterType:
            return {
                ...state,
                parameters: action.parameters,
                fields: action.fields,
                solutions: calculateSolutions(action.fields, action.matrix)
            };
        case deleteParameterType:
            return {
                ...state,
                parameters: action.parameters,
                fields: action.fields,
                matrix: action.matrix,
                solutions: calculateSolutions(action.fields, action.matrix)
            };
        case addFieldType:
            return {
                ...state,
                fields: action.fields,
                matrix: action.matrix,
                solutions: calculateSolutions(action.fields, action.matrix)
            };
        case deleteFieldType:
            return {
                ...state,
                fields: action.fields,
                matrix: action.matrix,
                solutions: calculateSolutions(action.fields, action.matrix)
            };

        case inputChangeType:
            return {
                ...state,
                parameters: action.parameters,
                fields: action.fields
            };
        case changeConsistencyType:
            return {
                ...state,
                matrix: action.matrix,
                solutions: calculateSolutions(state.fields, action.matrix)
            };

        case clearDataType:
            return {
                ...state,
                parameters: action.parameters,
                fields: action.fields,
                matrix: action.matrix,
                solutions: []
            }

        default:
            return {
                ...state,
                solutions: calculateSolutions(state.fields, state.matrix)
            }
    }
};

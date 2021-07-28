import { actionTypes } from "../common/types";

const initialState = {
  allSchools: [],
  revokedSchools: [],
  schoolPaymentHistory:[]
};

export const schoolReducer = (state = initialState, { type, payload }) => {
  console.log('==>', type, payload);

  switch (type) {
    //   console.log(type);
    case actionTypes.GET_ALL_SCHOOLS:

      return { ...state, allSchools: payload.result };
      
    case actionTypes.PAYMENT_HISTORY_SCHOOL:
console.log("HISTORY PAY REDUCE")
      return { ...state, schoolPaymentHistory: payload.result };

    // case actionTypes.REVOKE_SCHOOL:
    //   console.log("payload redux", payload);
    //   // const revSkls = state.allSchools.filter((skl) => skl.revoked === true);
    //   // const unRevSkls = state.allSchools.filter((skl) => skl.revoked === false);
    //   console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", payload);
    //   // return { ...state, revokedSchool, allSchools };
    //   break
    
    case actionTypes.UN_REVOKE_SCHOOL:
      console.log("payload redux", payload);
      return{
        ...state
      }
      // const revSkls = state.allSchools.filter((skl) => skl.revoked === true);
      // const unRevSkls = state.allSchools.filter((skl) => skl.revoked === false);
      break

    // return { ...state, revokedSchools, allSchools };
    // case actionTypes.ADD_SCHOOL:
    //   console.log("SCHOOL TO UPDATE 01", type, payload);
    //   break

    case actionTypes.REMOVE_SCHOOL:
      console.log("SCHOOL TO UPDATE 01 ", payload)
      // const newSchool = state.allSchools.filter(allSchools => allSchools._id !== payload)
      // console.log("NEW SCHOOLS",newSchool)
      // console.log("revoke payload", payload);
      const schoolToUpdate = state.allSchools.findIndex(
        (school) => school._id === payload
      );

      console.log("SCHOOL TO UPDATE 02 ", schoolToUpdate)
      const updatedSchool = state.allSchools;
      console.log("SCHOOL TO BE UPDATE 03", updatedSchool)
      console.log("SCHOOL TO BE UPDATE 04", updatedSchool[schoolToUpdate])
       updatedSchool[schoolToUpdate].revoked = false;
      return {
       ...state,
        allSchools: updatedSchool
      };

    //  console.log("updated SCHOKIL ==>", updatedSchool);


    default:
      return state;
  }

  // case "REMOVE_STUDENT":
  //     const newStudents = state.students.filter(student => student._id !== payload._id);
  //     // console.log("removed student", payload)
  //     return {
  //       ...state,
  //       students: newStudents,
  //       unassignedStudents: [...state.unassignedStudents, payload]
  //     };
};

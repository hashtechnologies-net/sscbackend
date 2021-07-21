import api from "../../api";

// A mock function to mimic making an async request for data
export function fetchPolicy() {
  return api.get(`/policy`);
}

// export function searchHospital(name) {
//   return api.post(`/hospitals`, {
//     params: {
//       name,
//     },
//   });
// }

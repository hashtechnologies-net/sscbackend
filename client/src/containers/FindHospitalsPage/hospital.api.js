import api from "../../api";

// A mock function to mimic making an async request for data
export function fetchHospital() {
  return api.get(`/hospitals`);
}

export function searchHospital(name) {
  return api.get(`/hospitals`, {
    params: {
      name,
    },
  });
}

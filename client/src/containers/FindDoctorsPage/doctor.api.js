import api from "../../api";

// A mock function to mimic making an async request for data
export function fetchDoctor() {
  return api.get(`/doctors`);
}

export function searchDoctor(name) {
  return api.get(`/doctors`, {
    params: {
      name,
    },
  });
}

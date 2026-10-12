
import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';

// Load student credentials from JSON file
const students = JSON.parse(open('./students.json'));

export const options = {
  vus: 1,
  iterations: 1,
};

const BASE_URL = 'https://uni-reg-cloud.vercel.app';

export default function () {

  // Step 1: Open home page
  const homeResponse = http.get(`${BASE_URL}/`);

  check(homeResponse, {
    'Home Page - status is 200': (r) => r.status === 200,
  });

  // Step 2: Student login
  const loginPayload = JSON.stringify({
    studentId: students[0].studentId,
    password: students[0].password,
  });

  const loginResponse = http.post(
    `${BASE_URL}/api/login`,
    loginPayload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(loginResponse, {
    'Student Login - status is 200': (r) => r.status === 200,
    'Student Login - token received': (r) =>
      Boolean(r.json('token')),
  });

  // Step 3: Open course detail page
  const authToken = loginResponse.json('token');

  const courseResponse = http.get(
    `${BASE_URL}/api/courses/A-CSE101`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  check(courseResponse, {
    'Course Detail - status is 200': (r) => r.status === 200,
    'Course Detail - response is JSON': (r) =>
      r.headers['Content-Type']?.includes('application/json'),
  });

  // Step 4: Open My Registrations
  const registrationResponse = http.get(
    `${BASE_URL}/api/my-courses`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  check(registrationResponse, {
    'My Registrations - status is 200': (r) => r.status === 200,
    'My Registrations - response is JSON': (r) =>
      r.headers['Content-Type']?.includes('application/json'),
  });

  // Step 5: Student Logout
  const logoutResponse = http.post(
    `${BASE_URL}/api/logout`,
    null,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  check(logoutResponse, {
    'Student Logout - status is 200': (r) => r.status === 200,
  });

}

// Generate JSON summary for HTML reporting

export function handleSummary(data) {
  return {
    'C:/k6/UniReg-Cloud/summary.json': JSON.stringify(data, null, 2),
    'stdout': textSummary(data),
  };
}



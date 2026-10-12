
# UniReg Cloud - k6 Performance Testing

## Task 4: k6 Authentication Test

This folder contains the k6 performance test script,
student test data, execution results, and HTML report.

### Test Journey
1. Open Home Page
2. Student Login
3. Open Course Detail Page
4. Open My Registrations
5. Student Logout

### Test Configuration
- Tool: k6 v2.3.0
- Virtual Users: 1
- Iterations: 1
- Authentication: Bearer Token
- Test Portal: https://uni-reg-cloud.vercel.app/

### Execution Command
k6 run unireg-test.js

### Test Data
Student credentials are read from students.json.

# challecara-student

The app for students of the Challecara.
The Challecara is a community of software development with college students in Fukuoka, Japan! 

# How to request a callable function with curl?

See protocol specification of the callable function:
https://firebase.google.com/docs/functions/callable-reference 

For example:
```
curl -H "Content-Type: application/json" -X POST http://localhost:5001/challecara-student/us-central1/addMessage -d '{"data": {}}'
```

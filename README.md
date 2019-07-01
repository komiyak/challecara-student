# challecara-student

The app for students of the Challecara.
The Challecara is a community of software development with college students in Fukuoka, Japan! 

# Tips

## How to run locally?

Running with the `service-account.json`.

```
./serve.sh
```

To run a specific service.
```
./serve.sh hosting
./serve.sh functions
```

## How to request a callable function with curl?

See protocol specification of the callable function:
https://firebase.google.com/docs/functions/callable-reference 

For example:
```
curl -H "Content-Type: application/json" -X POST http://<your-localhost>/challecara-student/us-central1/addMessage -d '{"data": {}}'
```

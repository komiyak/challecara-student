# challecara-student

The app for students of the Challecara.
The Challecara is a community of software development with college students in Fukuoka, Japan! 

## functions

- [functions](./README.md)

# Tips

## How to request a callable function with curl?

See protocol specification of the callable function:
https://firebase.google.com/docs/functions/callable-reference 

For example:
```
curl -H "Content-Type: application/json" -X POST http://<your-localhost>/challecara-student/us-central1/addMessage -d '{"data": {}}'
```

## How to request a function with functions shell?

```
npm start
> helloWorld()
```

With http headers.
```
> helloWorld("", { headers: {'authorization': "Bearer ..."} })
```

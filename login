$ curl -X POST http://localhost:8181/api/auth/login -H "Content-Type: application/json" -d '{"email":"anuar.musljumov@gmail.com","password":"Secret123"}'
{"authtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoibXZ4dHR1NGwiLCJlbWFpbCI6ImFudWFyLm11c2xqdW1vdkBnbWFpbC5jb20ifSwiaWF0IjoxNzkzNTM3MzQ3LCJleHAiOjE3OTM2MjM3NDd9.EqspiUiPvwn20PDTLv_HJOReXVCHtkQsE0qI0kiBN7k","id":"mvxttu4l","name":"Anuar Musljumov","email":"anuar.musljumov@gmail.com","phone":"7012345678","role":"Patient","createdAt":"2026-11-01T12:49:07.345Z"}

$ curl -X POST http://localhost:8181/api/auth/login -H "Content-Type: application/json" -d '{"email":"anuar.musljumov@gmail.com","password":"wrong-password"}'
# (wrong password - rejected)
{"errors":[{"msg":"Invalid email or password"}]}

# How to run the project locally

- install docker and docker-compose from [Docker site](https://www.docker.com/)
- clone the project
- create a `.env` file in the root directory and add the following
  ```env
  NODE_ENV
  PORT

  MONGO_URI

  JWT_SECRET

  CLOUDINARY_NAME
  CLOUDINARY_API_KEY
  CLOUDINARY_API_SECRET

  ```
- run `docker-compose up --build`

# API Documentation
> - #### [**_Postman collection_**](https://bold-moon-879178.postman.co/workspace/993ca060-363c-49a6-8bb2-8635753623c2)

# Making workflow

- ## [Resource] DB Schema Design [#1][i1]

![DocDoc DB](https://github.com/RechidiAhmedAbdelaaziz/DocDoc-Backend/assets/124708904/8639c017-a681-4392-b52f-239426b8f8ea)

[i1]: https://github.com/RechidiAhmedAbdelaaziz/DocDoc-Backend/issues/1

- ## [Feature] User Authentication [#2][i2]
- [x] User Registration
- [x] Doctor Registration
- [x] User Login
- [x] User Forgot Password
- [x] User Reset Password
- [x] Refresh Token
- [ ] change password

[i2]: https://github.com/RechidiAhmedAbdelaaziz/DocDoc-Backend/issues/14

- ## [Feature] Doctor [#3][i3]
- [x] Get Doctor Profile
- [x] Doctors List (Pagination , Filter , Search)

[i3]: https://github.com/RechidiAhmedAbdelaaziz/DocDoc-Backend/issues/23

- ## [Feature] User [#4][i4]
- [x] Get User Profile
- [x] Update User Profile

[i4]: https://github.com/RechidiAhmedAbdelaaziz/DocDoc-Backend/issues/26

- ## [Feature] Appointment [#5][i5]
- [x] Send Appointment Request
- [x] Accept Appointment Request
- [x] Reject Appointment Request
- [x] Cancel Appointment Request
- [x] Get Appointment Details
- [x] Get Appointments List (Pagination , Filter , Search) For User and Doctor
- [x] Reschedule Appointment

[i5]: https://github.com/RechidiAhmedAbdelaaziz/DocDoc-Backend/issues/15

> Realtime chat using socket.io

- ## [Feature] Chat [#6][i6]
- [x] Send Message
- [x] Get Messages List (Pagination)
- [x] Get Conversation List (Pagination)

[i6]: https://github.com/RechidiAhmedAbdelaaziz/DocDoc-Backend/issues/24

- ## [Feature] Notification [#7][i7]
- [x] Send Notifications

[i7]: https://github.com/RechidiAhmedAbdelaaziz/DocDoc-Backend/issues/20

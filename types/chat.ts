interface Message {
  id: string,
  userId: string,
  text: string,
  createdAt: Date,
}

interface User {
  id: string,
  name: string
}

export {
  Message,
  User
}
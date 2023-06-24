interface Message {
  id: string | null,
  userId: string,
  text: string,
  createdAt: Date,
}

interface User {
  id: string,
  name: string,
  avatar: ''
}

export {
  Message,
  User
}

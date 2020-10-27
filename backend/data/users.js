import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  {
    name: 'Mervin',
    email: 'mervin@example.com',
    password: bcrypt.hashSync('12345', 10),
  },
  {
    name: 'Test1',
    email: 'test1@example.com',
    password: bcrypt.hashSync('12345', 10),
  },
]

export default users

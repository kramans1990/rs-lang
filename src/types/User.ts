class User {
  name: string;

  email: string;

  password: string;

  constructor(email: string, password: string, name: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export default User;

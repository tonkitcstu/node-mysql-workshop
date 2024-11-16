import { User, UserRepository } from "../user_repository";
import { Connection } from "mysql";

export class MySQLUserRepository implements UserRepository {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async findOne(id: number): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM users where id = " + id,
        function (err, results, fields) {
          if (err) {
            reject(err);
          }

          if (Object.keys(results).length == 0) {
            reject(new Error("empty result"));
          }

          const user: User = {
            id: results[0].id,
            name: results[0].name ?? "",
            email: results[0].email ?? "",
            age: results[0].age ?? 0, // I know it's weird, but for now it's okay.
          };
          resolve(user);
        },
      );
    });
  }

  async findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM users",
        function (err, results, fields) {
          if (err) {
            reject(err);
          }

          if (Object.keys(results).length == 0) {
            reject(new Error("empty result"));
          }
          let users: User[] = [];
          for (let i = 0; i < Object.keys(results).length; i++) {
            users.push({
              id: results[i].id,
              name: results[i].name ?? "",
              email: results[i].email ?? "",
              age: results[i].age ?? 0, // I know it's weird, but for now it's okay.
            });
          }
          resolve(users);
        },
      );
    });
  }
}

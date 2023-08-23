import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("users.db");

export function init() {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `create table if not exists users (
            id integer primary key not null,
            name text not null
        )`,
        [],
        () => {
          resolve();
          console.log("db init");
        },
        (_, error) => {
          reject(error);
          return true;
        },
      );
    });
  });

  return promise;
}

export function insertUser(name: string) {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `insert into users (name) values (?)`,
        [name],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return true;
        },
      );
    });
  });

  return promise;
}

export function fetchUser() {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `select * from users order by id desc`, // the order doesnt matter, bc there will be only one row anyways
        [],
        (_, result) => {
          resolve(result);
          console.log("in fetchUser", result);
        },
        (_, error) => {
          reject(error);
          return true;
        },
      );
    });
  });

  return promise;
}

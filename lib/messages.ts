import sql from "better-sqlite3";
import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";

const db = new sql("messages.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message: string) {
  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

export const getMessages = nextCache(
  cache(async () => {
    console.log("Fetching messages from db");
    return db.prepare("SELECT * FROM messages").all() as Message[];
  }),
  ["messages"],
  {
    revalidate: 5,
    tags: ["msg"],
  }
);

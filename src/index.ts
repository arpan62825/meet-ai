import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";
import { usersTable } from "./db/schema";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL!);

const main = async () => {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    email: "john@example.com",
    password: "a-very-secure-password",
  };

  // insert
  await db.insert(usersTable).values(user);
  console.log("New user created:", user);

  // select
  const users = await db.select().from(usersTable);
  console.log("All users:", users);

  // delete
  // const deletedUser = await db.delete(usersTable);
  // console.log("Deleted user:", deletedUser);
};

main();

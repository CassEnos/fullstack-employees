import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 15; i++) {
    const employee = {
      name: "Employee " + i,
      birthday: "1001-10-01",
      salary: Math.floor(Math.random() * 500000),
    };
    await createEmployee(employee);
  }
}

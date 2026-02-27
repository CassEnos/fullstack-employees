import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  try {
    const {
      rows: [newlyCreatedEmployee],
    } = await db.query(
      `
      INSERT INTO employees (name, birthday, salary)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [name, birthday, salary],
    );

    console.log(`NEWLY CREATED EMPLOYEE:`, newlyCreatedEmployee);
    return newlyCreatedEmployee;
  } catch (err) {
    console.log(`ERROR CREATING A EMPLOYEE:`, err);
  }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const sql = `
  SELECT *
  FROM employees
  `;
  // destructuring object, but NOT the array. This is giving rows an alias of movies
  const { rows: employees } = await db.query(sql);
  return employees;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const sql = `
  SELECT *
  FROM employees
  WHERE id = $1
  `;
  // destructuring object, but NOT the array. This is giving rows an alias of movies
  const {
    rows: [employee],
  } = await db.query(sql, [id]);
  return employee;
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const sql = `
    UPDATE employees
    SET name = $2,
    birthday = $3,
    salary = $4
  WHERE id = $1
  RETURNING *
  `;
  const {
    rows: [employee],
  } = await db.query(sql, [id, name, birthday, salary]);
  return employee;
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const sql = `
  DELETE FROM employees
  WHERE id = $1
  RETURNING *
  `;
  const {
    rows: [employee],
  } = await db.query(sql, [id]);
  return employee;
}

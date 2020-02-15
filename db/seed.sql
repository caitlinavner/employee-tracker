use employees;
INSERT INTO department (name)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");
INSERT INTO role (title, salary, department_id)
VALUES
  ("Sales Lead", 45000, 1),
  ("Engineering Lead", 55000, 1),,
  (
    "Finance Lead",
    95000,
    1 "), (" Legal Lead ", 100000, 1"
  );
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Sean', 'Hog', 2, NULL),
  ('Naomi', 'White' 6, NULL),
  ('Jane', 'Willson', 10, NULL);
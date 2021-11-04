SELECT * FROM department;

SELECT role.title, role.id, department.name, role.salary
    FROM role
    INNER JOIN department ON role.department_id=department.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    INNER JOIN role ON employee.role_id=role.id
    INNER JOIN department ON role.department_id=department.id;

INSERT INTO department (name) 
    VALUES ('?');

INSERT INTO role (title, salary, department_id)
    VALUES
        ('?', 120000, 1);
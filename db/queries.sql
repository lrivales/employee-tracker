SELECT * FROM department;

SELECT role.title, role.id, department.name, role.salary FROM role INNER JOIN department ON role.department_id=department.id;
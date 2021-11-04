INSERT INTO department (name)
    VALUES
        ('Purchasing'),
        ('Production'),
        ('Human Resources');;

INSERT INTO role (title, salary, department_id)
    VALUES
        ('Purchasing Manager', 120000, 1),
        ('Purchasing Specialist', 100000, 1),
        ('Production Manager', 120000, 2),
        ('Production Analyst', 100000, 2),
        ('HR Manager', 120000, 3),
        ('HR Specialist', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ('James', 'Fraser', 1, NULL),
        ('Robert', 'Bruce', 2, 1),
        ('Peter', 'Greenaway', 3, NULL),
        ('Derek', 'Jarman', 4, 3),
        ('Paolo', 'Pasolini', 5, NULL),
        ('Heathcote', 'Williams', 6, 5);
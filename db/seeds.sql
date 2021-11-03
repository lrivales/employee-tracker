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
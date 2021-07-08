INSERT INTO department (dep_name)
VALUE
('Production'),
('Research and Development'),
('Purchasing'),
('Marketing'),
('Human Resource Management'),
('Accounting and Finance'),
('Information Technology');

INSERT INTO roles (title, salary, department_id)
VALUES
('Instrumentation Technician', 50000, 1),
('Automation Technician', 55000, 1),
('Project Engineer', 75000, 1),
('Senior Engineer', 95000, 1), 
('Process Engineer', 85000, 1),  
('Development Engineer', 85000, 1),  
('Warehouse Worker', 40000, 1),  
('Warehouse Associate', 45000, 1),  
('Production Worker', 45000, 1),  
('Warehouse Manager', 55000, 1),
('Assembly Supervisor', 75000, 1),
('R & D Assistant', 45000, 2),
('R & D Worker', 55000, 2),
('R & D Manager', 75000, 2),
('Purchasing Assistant', 35000, 3),
('Purchasing Administrator', 45000, 3),
('Purchasing Manager', 65000, 3),
('Marketing Administrator', 45000, 4),
('Marketing Manager', 65000, 4),
('Marketing Coordinator', 55000, 4),
('HR Assistant', 45000, 5),
('HR Coordinator', 50000, 5),
('HR Manager', 70000, 5),
('AP Administrator', 50000, 6),
('AR Administrator', 50000, 6),
('Finance Manager', 70000, 6),
('IT Administrator', 40000, 7),
('IT Manager', 60000, 7);

-- Add Managers
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jakobe', 'Snell', 4, NULL),
('Athan', 'Travis', 10, NULL),
('Kaine', 'Sarah', 14, NULL),
('Krish', 'Kendall', 17, NULL),
('Aada', 'Laine', 19, NULL),
('Andrew', 'Posen', 23, NULL),
('James', 'Fraser', 1, 1),
('Jack', 'London', 3, 1),
('Robert', 'Bruce', 6, 3),
('Peter', 'Greenaway', 13, 3),
('Derek', 'Jarman', 16, 4),
('Paolo', 'Pasolini', 18, 5),
('Heathcote', 'Williams', 22, 6);


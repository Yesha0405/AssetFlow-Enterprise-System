USE assetflow;

-- ===========================================
-- DEPARTMENTS
-- ===========================================

INSERT INTO departments (department_name, description, status) VALUES
('IT', 'Information Technology', 'Active'),
('Engineering', 'Engineering Department', 'Active'),
('Human Resources', 'HR Department', 'Active'),
('Finance', 'Finance Department', 'Active'),
('Administration', 'Administrative Department', 'Active'),
('Operations', 'Operations Department', 'Active');

-- ===========================================
-- Categories
-- ===========================================

INSERT INTO categories (category_name, description, depreciable) VALUES
('Laptop','Company Laptops',TRUE),
('Desktop','Desktop Computers',TRUE),
('Monitor','LCD/LED Monitors',TRUE),
('Printer','Printers & Scanners',TRUE),
('Projector','Projectors',TRUE),
('Meeting Room','Bookable Meeting Rooms',FALSE),
('Furniture','Office Furniture',TRUE),
('Networking','Networking Equipment',TRUE);

-- ===========================================
-- EMPLOYEES
-- ===========================================

INSERT INTO employees
(employee_code,first_name,last_name,email,phone,department_id,designation,employment_status)
VALUES
('EMP001','Rahul','Sharma','rahul@assetflow.com','9876543210',2,'Software Engineer','Active'),
('EMP002','Priya','Patel','priya@assetflow.com','9876543211',2,'Senior Engineer','Active'),
('EMP003','Amit','Verma','amit@assetflow.com','9876543212',1,'IT Administrator','Active'),
('EMP004','Sneha','Mehta','sneha@assetflow.com','9876543213',3,'HR Executive','Active'),
('EMP005','Rohan','Shah','rohan@assetflow.com','9876543214',4,'Finance Officer','Active'),
('EMP006','Anjali','Joshi','anjali@assetflow.com','9876543215',6,'Operations Manager','Active');

-- ===========================================
-- USERS
-- ===========================================

INSERT INTO users
(employee_id,email,password_hash,role,status)
VALUES
(3,'admin@assetflow.com','admin123','Admin','Active'),
(6,'manager@assetflow.com','manager123','Manager','Active'),
(1,'employee@assetflow.com','employee123','Employee','Active');

-- ===========================================
-- ASSETS
-- ===========================================

INSERT INTO assets
(
asset_tag,
asset_name,
category_id,
department_id,
serial_number,
acquisition_date,
acquisition_cost,
asset_condition,
location,
status,
is_bookable,
asset_photo,
description
)
VALUES

('AF0001','Dell Latitude 5420',1,2,'DL001','2025-01-15',65000,'Excellent','Engineering Floor','Allocated',FALSE,NULL,'Developer Laptop'),

('AF0002','HP EliteBook 840',1,2,'HP002','2025-02-10',72000,'Excellent','Engineering Floor','Available',FALSE,NULL,'Developer Laptop'),

('AF0003','Dell 24-inch Monitor',3,2,'MON003','2025-01-20',12000,'Good','Engineering Floor','Available',FALSE,NULL,'Office Monitor'),

('AF0004','Conference Room A',6,5,'ROOM001','2024-06-01',0,'Excellent','Block A','Available',TRUE,NULL,'Meeting Room'),

('AF0005','Epson Projector',5,5,'PROJ001','2024-10-05',45000,'Excellent','Meeting Hall','Available',TRUE,NULL,'Conference Projector');

-- ===========================================
-- ASSET HISTORY
-- ===========================================

    INSERT INTO asset_history
(asset_id,performed_by,action,remarks)
VALUES
(1,1,'Created','Initial asset registration'),
(2,1,'Created','Initial asset registration'),
(3,1,'Created','Initial asset registration'),
(4,1,'Created','Meeting room registered'),
(5,1,'Created','Projector registered');

-- ===========================================
-- ASSET ALLOCATIONS
-- ===========================================

INSERT INTO asset_allocations
(
asset_id,
employee_id,
allocated_by,
expected_return_date,
allocation_status,
remarks
)
VALUES
(1,1,1,'2027-01-01','Allocated','Laptop assigned'),
(3,2,1,'2027-01-01','Allocated','Monitor assigned');

-- ===========================================
-- TRANSFER REQUESTS
-- ===========================================

INSERT INTO transfer_requests
(
allocation_id,
asset_id,
current_employee_id,
requested_employee_id,
requested_by,
request_reason,
manager_approval,
department_approval,
request_status
)
VALUES
(
1,
1,
1,
2,
2,
'Project change',
'Pending',
'Pending',
'Requested'
);

-- ===========================================
-- ASSET RETURNS
-- ===========================================

INSERT INTO asset_returns
(
allocation_id,
asset_id,
employee_id,
returned_to,
asset_condition,
inspection_notes,
return_status
)
VALUES
(
2,
3,
2,
1,
'Good',
'Returned in good condition',
'Completed'
);

-- ===========================================
-- RESOURCE BOOKINGS
-- ===========================================

INSERT INTO resource_bookings
(
asset_id,
employee_id,
booking_date,
start_time,
end_time,
booking_purpose,
booking_status
)
VALUES
(
4,
1,
'2026-07-20',
'10:00:00',
'11:00:00',
'Sprint Planning',
'Upcoming'
);

-- ===========================================
-- MAINTENANCE REQUESTS
-- ===========================================

INSERT INTO maintenance_requests
(
asset_id,
requested_by,
assigned_to,
maintenance_type,
priority,
issue_description,
maintenance_status
)
VALUES
(
5,
2,
1,
'Preventive',
'Medium',
'Annual maintenance',
'Assigned'
);

-- ===========================================
-- AUDIT LOGS
-- ===========================================

INSERT INTO audit_logs
(
asset_id,
audited_by,
expected_location,
actual_location,
asset_condition,
audit_status,
audit_result,
remarks
)
VALUES
(
1,
1,
'Engineering Floor',
'Engineering Floor',
'Excellent',
'Matched',
'Pass',
'Verified'
);

-- Placeholder SQL schema
-- Schema for AssetFlow - Allocation & Resource Management Module
-- Target: MySQL 8+ | Engine: InnoDB | Character Set: utf8mb4

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ===========================================
-- DEPARTMENTS
-- ===========================================

CREATE TABLE departments (
    department_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    status ENUM('Active','Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Organization departments';

-- ===========================================
-- CATEGORIES
-- ===========================================

CREATE TABLE categories (
    category_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    depreciable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Asset categories';

-- ===========================================
-- EMPLOYEES
-- ===========================================

CREATE TABLE employees (
    employee_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    employee_code VARCHAR(20) UNIQUE NOT NULL,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    phone VARCHAR(20),

    department_id INT UNSIGNED,

    designation VARCHAR(100),

    employment_status ENUM('Active','Inactive')
        DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)

) ENGINE=InnoDB COMMENT='Employee master';

-- ===========================================
-- USERS
-- ===========================================

CREATE TABLE users (

    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    employee_id INT UNSIGNED,

    email VARCHAR(150) UNIQUE NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    role ENUM(
        'Admin',
        'Manager',
        'Employee'
    ) DEFAULT 'Employee',

    status ENUM(
        'Active',
        'Inactive'
    ) DEFAULT 'Active',

    last_login DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_employee
        FOREIGN KEY(employee_id)
        REFERENCES employees(employee_id)

) ENGINE=InnoDB COMMENT='Application users';

-- 5. ASSETS
CREATE TABLE assets (
    asset_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for asset',

    asset_tag VARCHAR(20) NOT NULL UNIQUE COMMENT 'System generated asset tag',

    asset_name VARCHAR(255) NOT NULL COMMENT 'Display name of the asset',

    category_id INT UNSIGNED NOT NULL COMMENT 'FK to categories table',

    department_id INT UNSIGNED NULL COMMENT 'FK to departments table',

    serial_number VARCHAR(100) UNIQUE NOT NULL COMMENT 'Manufacturer serial number',

    acquisition_date DATE NOT NULL COMMENT 'Purchase date',

    acquisition_cost DECIMAL(12,2) DEFAULT 0 COMMENT 'Purchase price',

    asset_condition ENUM(
        'Excellent',
        'Good',
        'Fair',
        'Poor',
        'Damaged'
    ) NOT NULL DEFAULT 'Good' COMMENT 'Physical condition of asset',

    location VARCHAR(255) NOT NULL COMMENT 'Current physical location',

    status ENUM(
        'Available',
        'Allocated',
        'Reserved',
        'Under Maintenance',
        'Lost',
        'Retired',
        'Disposed'
    ) NOT NULL DEFAULT 'Available' COMMENT 'Current asset status',

    is_bookable BOOLEAN DEFAULT TRUE COMMENT 'Whether asset can be booked',

    asset_photo VARCHAR(255) NULL COMMENT 'Image path or URL',

    description TEXT NULL COMMENT 'Optional description',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    deleted_at TIMESTAMP NULL COMMENT 'Soft delete timestamp',

    CONSTRAINT fk_asset_category
    FOREIGN KEY(category_id)
    REFERENCES categories(category_id),

    CONSTRAINT fk_asset_department
    FOREIGN KEY(department_id)
    REFERENCES departments(department_id)

) ENGINE=InnoDB COMMENT='Master table containing all organization assets';

CREATE INDEX idx_asset_status
ON assets(status);

CREATE INDEX idx_asset_category
ON assets(category_id);

CREATE INDEX idx_asset_location
ON assets(location);

CREATE INDEX idx_asset_tag
ON assets(asset_tag);

CREATE INDEX idx_asset_department
ON assets(department_id);

-- 6. ASSET HISTORY

CREATE TABLE asset_history (

    history_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    asset_id INT UNSIGNED NOT NULL COMMENT 'FK to assets table',

    action ENUM(
        'Created',
        'Updated',
        'Allocated',
        'Transferred',
        'Returned',
        'Maintenance',
        'Audited',
        'Deleted'
    ) NOT NULL COMMENT 'Performed action',

    performed_by INT UNSIGNED NULL COMMENT 'FK to users',

    remarks TEXT NULL COMMENT 'Reason or additional information',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_history_asset
    FOREIGN KEY(asset_id)
    REFERENCES assets(asset_id),

    CONSTRAINT fk_history_user
    FOREIGN KEY(performed_by)
    REFERENCES users(user_id)

) ENGINE=InnoDB COMMENT='Tracks complete lifecycle history of every asset';

CREATE INDEX idx_history_asset
ON asset_history(asset_id);

CREATE INDEX idx_history_action
ON asset_history(action);

-- 1. ASSET ALLOCATIONS
CREATE TABLE asset_allocations (
    allocation_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for allocation',
    asset_id INT UNSIGNED NOT NULL COMMENT 'FK to assets table',
    employee_id INT UNSIGNED NOT NULL COMMENT 'FK to employees table (the recipient)',
    allocated_by INT UNSIGNED NOT NULL COMMENT 'FK to users table (the admin/manager)',
    allocation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date when allocation started',
    expected_return_date DATETIME NOT NULL COMMENT 'Expected return deadline',
    actual_return_date DATETIME NULL COMMENT 'Actual date of physical return',
    allocation_status ENUM('Allocated', 'Returned', 'Overdue', 'Cancelled') NOT NULL DEFAULT 'Allocated' COMMENT 'Status of current allocation',
    remarks TEXT NULL COMMENT 'Additional details or notes',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation time',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record last update time',
    
   CONSTRAINT fk_alloc_asset
FOREIGN KEY (asset_id)
REFERENCES assets(asset_id),

CONSTRAINT fk_alloc_employee
FOREIGN KEY (employee_id)
REFERENCES employees(employee_id),

CONSTRAINT fk_alloc_user
FOREIGN KEY (allocated_by)
REFERENCES users(user_id),

CONSTRAINT chk_return_date
CHECK (
    actual_return_date IS NULL
    OR actual_return_date >= allocation_date
)

) ENGINE=InnoDB COMMENT='Tracks current and historical asset assignments to employees';

-- Indexing for Allocation:
-- idx_asset_status: Crucial for "Only one active allocation per asset" queries.
-- idx_employee_alloc: Optimizes dashboard views for specific employee current holdings.
CREATE INDEX idx_allocation_asset_status
ON asset_allocations(asset_id, allocation_status);
CREATE INDEX idx_employee_alloc 
ON asset_allocations(employee_id, allocation_status);

-- 2. TRANSFER REQUESTS
CREATE TABLE transfer_requests (
    transfer_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for transfer',
    allocation_id INT UNSIGNED NOT NULL COMMENT 'FK to asset_allocations',
    asset_id INT UNSIGNED NOT NULL COMMENT 'FK to assets table',
    current_employee_id INT UNSIGNED NOT NULL COMMENT 'FK to employees (giver)',
    requested_employee_id INT UNSIGNED NOT NULL COMMENT 'FK to employees (receiver)',
    requested_by INT UNSIGNED NOT NULL COMMENT 'FK to users',
    request_reason TEXT NOT NULL COMMENT 'Reason for the transfer request',
    manager_approval ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    department_approval ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    request_status ENUM('Requested', 'Approved', 'Rejected', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Requested',
    approved_at DATETIME NULL COMMENT 'Timestamp when final approval granted',
    completed_at DATETIME NULL COMMENT 'Timestamp when transfer finalized',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_trans_alloc FOREIGN KEY (allocation_id) REFERENCES asset_allocations(allocation_id),
    CONSTRAINT fk_trans_asset FOREIGN KEY (asset_id) REFERENCES assets(asset_id),
    CONSTRAINT fk_trans_curr_emp FOREIGN KEY (current_employee_id) REFERENCES employees(employee_id),
    CONSTRAINT fk_trans_req_emp FOREIGN KEY (requested_employee_id) REFERENCES employees(employee_id)
) ENGINE=InnoDB COMMENT='Workflows for transferring assets between employees';

CREATE INDEX idx_trans_status ON transfer_requests(request_status);
CREATE INDEX idx_trans_allocation ON transfer_requests(allocation_id);

-- 3. ASSET RETURNS
CREATE TABLE asset_returns (
    return_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    allocation_id INT UNSIGNED NOT NULL COMMENT 'FK to asset_allocations',
    asset_id INT UNSIGNED NOT NULL COMMENT 'FK to assets',
    employee_id INT UNSIGNED NOT NULL COMMENT 'FK to employees',
    returned_to INT UNSIGNED NOT NULL COMMENT 'FK to user receiving the asset',
    return_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    asset_condition ENUM('Good', 'Minor Damage', 'Major Damage') NOT NULL,
    inspection_notes TEXT NULL,
    return_status ENUM('Pending Inspection', 'Completed', 'Sent to Maintenance') NOT NULL DEFAULT 'Pending Inspection',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_ret_alloc 
    FOREIGN KEY (allocation_id) 
    REFERENCES asset_allocations(allocation_id),

    CONSTRAINT fk_ret_asset 
    FOREIGN KEY (asset_id) 
    REFERENCES assets(asset_id),

    CONSTRAINT fk_ret_emp 
    FOREIGN KEY (employee_id) 
    REFERENCES employees(employee_id),

    CONSTRAINT fk_ret_user
    FOREIGN KEY (returned_to)
    REFERENCES users(user_id)
) ENGINE=InnoDB COMMENT='Logging of asset return processes and condition reports';

-- 4. RESOURCE BOOKINGS
CREATE TABLE resource_bookings (
    booking_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    asset_id INT UNSIGNED NOT NULL COMMENT 'FK to assets table',
    employee_id INT UNSIGNED NOT NULL COMMENT 'FK to employees',
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    booking_purpose VARCHAR(255) NOT NULL,
    booking_status ENUM('Upcoming', 'Ongoing', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Upcoming',
    remarks TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_book_emp FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    CONSTRAINT fk_booking_asset
    FOREIGN KEY (asset_id)
    REFERENCES assets(asset_id),
    CONSTRAINT chk_times CHECK (end_time > start_time)
) ENGINE=InnoDB COMMENT='Scheduling system for shared company resources';

CREATE INDEX idx_res_date_time
ON resource_bookings(asset_id, booking_date, start_time, end_time);

-- ===========================================
-- MAINTENANCE REQUESTS
-- ===========================================

CREATE TABLE maintenance_requests (

    maintenance_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique maintenance request',

    asset_id INT UNSIGNED NOT NULL COMMENT 'FK to assets table',

    requested_by INT UNSIGNED NOT NULL COMMENT 'FK to users table',

    assigned_to INT UNSIGNED NULL COMMENT 'FK to users table',

    maintenance_type ENUM(
        'Preventive',
        'Corrective',
        'Inspection',
        'Calibration',
        'Repair'
    ) NOT NULL DEFAULT 'Corrective',

    priority ENUM(
        'Low',
        'Medium',
        'High',
        'Critical'
    ) DEFAULT 'Medium',

    issue_description TEXT NOT NULL,

    maintenance_status ENUM(
        'Open',
        'Assigned',
        'In Progress',
        'Completed',
        'Cancelled'
    ) DEFAULT 'Open',

    start_date DATETIME NULL,

    completed_date DATETIME NULL,

    maintenance_cost DECIMAL(12,2) DEFAULT 0,

    vendor_name VARCHAR(255),

    remarks TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_maint_asset
        FOREIGN KEY(asset_id)
        REFERENCES assets(asset_id),

    CONSTRAINT fk_maint_requested
        FOREIGN KEY(requested_by)
        REFERENCES users(user_id),

    CONSTRAINT fk_maint_assigned
        FOREIGN KEY(assigned_to)
        REFERENCES users(user_id)

) ENGINE=InnoDB COMMENT='Maintenance requests for assets';

CREATE INDEX idx_maint_asset
ON maintenance_requests(asset_id);

CREATE INDEX idx_maint_status
ON maintenance_requests(maintenance_status);

CREATE INDEX idx_maint_priority
ON maintenance_requests(priority);

-- ===========================================
-- AUDIT LOGS
-- ===========================================

CREATE TABLE audit_logs (

    audit_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Audit log entry',

    asset_id INT UNSIGNED NOT NULL COMMENT 'FK to assets',

    audited_by INT UNSIGNED NOT NULL COMMENT 'FK to users',

    audit_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    expected_location VARCHAR(255),

    actual_location VARCHAR(255),

    asset_condition ENUM(
        'Excellent',
        'Good',
        'Fair',
        'Poor',
        'Damaged'
    ) NOT NULL,

    audit_status ENUM(
        'Matched',
        'Mismatch',
        'Missing'
    ) DEFAULT 'Matched',

    audit_result ENUM(
    'Pass',
    'Fail'
    ) DEFAULT 'Pass',

    remarks TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_asset
        FOREIGN KEY(asset_id)
        REFERENCES assets(asset_id),

    CONSTRAINT fk_audit_user
        FOREIGN KEY(audited_by)
        REFERENCES users(user_id)

) ENGINE=InnoDB COMMENT='Asset audit records';

CREATE INDEX idx_audit_asset
ON audit_logs(asset_id);

CREATE INDEX idx_audit_status
ON audit_logs(audit_status);

CREATE INDEX idx_audit_date
ON audit_logs(audit_date);



-- Indexing for Bookings:
-- idx_res_date_time: Prevents double-booking by allowing quick range checks for specific resource/date.

SET FOREIGN_KEY_CHECKS = 1;

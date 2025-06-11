-- Seed initial data for Oil Booking System
USE OilBookingSystem;
GO

-- Insert sample users
INSERT INTO Users (Name, Email, Role) VALUES
('Pranav P', 'john.doe@example.com', 'Buyer'),
('Sriram', 'jane.smith@example.com', 'Buyer'),
('Vijay', 'mike.johnson@example.com', 'Admin'),
('Prakash', 'sarah.wilson@example.com', 'Buyer');

-- Insert sample products
INSERT INTO Products (Name, Description, UOM) VALUES
('Crude Oil', 'West Texas Intermediate Crude Oil', 'Barrel'),
('Natural Gas', 'Pipeline Quality Natural Gas', 'MMBtu'),
('Diesel', 'Ultra Low Sulfur Diesel', 'Barrel'),
('Gasoline', 'Regular Unleaded Gasoline', 'Barrel'),
('Heating Oil', 'No. 2 Heating Oil', 'Barrel');

-- Insert sample counter parties
INSERT INTO CounterParties (Name, ContactInfo, Address) VALUES
('Oil Corp Ltd', 'contact@oilcorp.com | +1-555-0101', '123 Industrial Ave, Houston, TX 77001'),
('Energy Solutions Inc', 'info@energysolutions.com | +1-555-0102', '456 Energy Blvd, Dallas, TX 75201'),
('Petroleum Partners', 'sales@petropartners.com | +1-555-0103', '789 Refinery Rd, Beaumont, TX 77701'),
('Global Energy Co', 'orders@globalenergy.com | +1-555-0104', '321 Oil Plaza, Midland, TX 79701');

-- Insert sample price masters
INSERT INTO PriceMasters (ProductId, Price, EffectiveDate, ExpiryDate) VALUES
(1, 75.50, '2024-01-01', '2024-12-31'), -- Crude Oil
(2, 3.25, '2024-01-01', '2024-12-31'),  -- Natural Gas
(3, 85.75, '2024-01-01', '2024-12-31'), -- Diesel
(4, 82.30, '2024-01-01', '2024-12-31'), -- Gasoline
(5, 78.90, '2024-01-01', '2024-12-31'); -- Heating Oil

-- Insert sample requests
INSERT INTO Requests (UserId, ProductId, Quantity, UOM, Price, Notes, Status) VALUES
(1, 1, 100, 'Barrel', 75.50, 'Urgent delivery required', 'Pending'),
(2, 2, 500, 'MMBtu', 3.25, 'Standard delivery', 'Approved'),
(1, 3, 200, 'Barrel', 85.75, 'Premium grade required', 'Ordered'),
(3, 1, 150, 'Barrel', 75.50, 'Monthly supply', 'Approved');

-- Create Oil Booking System Database
CREATE DATABASE OilBookingSystem;
GO

USE OilBookingSystem;
GO

-- Create Users table
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    Role NVARCHAR(50) NOT NULL,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1
);

-- Create Products table
CREATE TABLE Products (
    ProductId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    UOM NVARCHAR(20) NOT NULL, -- MMBtu/Barrel
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME2 DEFAULT GETDATE()
);

-- Create CounterParties table
CREATE TABLE CounterParties (
    CounterPartyId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    ContactInfo NVARCHAR(500),
    Address NVARCHAR(500),
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME2 DEFAULT GETDATE()
);

-- Create PriceMasters table
CREATE TABLE PriceMasters (
    PriceId INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    EffectiveDate DATETIME2 NOT NULL,
    ExpiryDate DATETIME2 NULL,
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

-- Create Requests table
CREATE TABLE Requests (
    RequestId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity DECIMAL(18,2) NOT NULL,
    UOM NVARCHAR(20) NOT NULL,
    Price DECIMAL(18,2) NOT NULL,
    RequestDate DATETIME2 NOT NULL DEFAULT GETDATE(),
    Notes NVARCHAR(1000),
    Status NVARCHAR(50) NOT NULL DEFAULT 'Pending', -- Pending, Approved, Rejected, Ordered
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

-- Create Orders table
CREATE TABLE Orders (
    OrderId INT IDENTITY(1,1) PRIMARY KEY,
    CounterPartyId INT NOT NULL,
    DeliveryAddress NVARCHAR(500) NOT NULL,
    PlacedDate DATETIME2 NOT NULL DEFAULT GETDATE(),
    Status NVARCHAR(50) NOT NULL DEFAULT 'Placed', -- Placed, Delivered, Cancelled
    TotalAmount DECIMAL(18,2) NOT NULL,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (CounterPartyId) REFERENCES CounterParties(CounterPartyId)
);

-- Create OrderRequests junction table
CREATE TABLE OrderRequests (
    OrderRequestId INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL,
    RequestId INT NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (RequestId) REFERENCES Requests(RequestId)
);

-- Create Invoices table
CREATE TABLE Invoices (
    InvoiceId INT IDENTITY(1,1) PRIMARY KEY,
    InvoiceDate DATETIME2 NOT NULL DEFAULT GETDATE(),
    TotalAmount DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'Draft', -- Draft, Issued, Paid, Cancelled
    CreatedDate DATETIME2 DEFAULT GETDATE()
);

-- Create InvoiceOrders junction table
CREATE TABLE InvoiceOrders (
    InvoiceOrderId INT IDENTITY(1,1) PRIMARY KEY,
    InvoiceId INT NOT NULL,
    OrderId INT NOT NULL,
    FOREIGN KEY (InvoiceId) REFERENCES Invoices(InvoiceId),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
);

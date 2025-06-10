# Oil Booking System

A comprehensive oil booking and management system built with ASP.NET Core and Next.js.

## Prerequisites

- .NET 8.0 SDK
- Node.js 18+ and npm
- SQL Server (LocalDB or full SQL Server)
- Visual Studio Code with C# extension

## Setup Instructions

### 1. Database Setup

1. Open SQL Server Management Studio or use sqlcmd
2. Run the scripts in this order:
   \`\`\`sql
   -- Run scripts/create-database.sql
   -- Run scripts/seed-initial-data.sql
   \`\`\`

### 2. Backend Setup (ASP.NET Core API)

1. Navigate to the API project:
   \`\`\`bash
   cd OilBookingSystem.API
   \`\`\`

2. Restore packages:
   \`\`\`bash
   dotnet restore
   \`\`\`

3. Update database connection string in `appsettings.json` if needed

4. Run the API:
   \`\`\`bash
   dotnet run
   \`\`\`

   The API will be available at: `https://localhost:7001` or `http://localhost:5001`

### 3. Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   \`\`\`bash
   cd ../  # Go back to root
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Update API base URL in frontend components if needed

4. Run the frontend:
   \`\`\`bash
   npm run dev
   \`\`\`

   The frontend will be available at: `http://localhost:3000`

## Project Structure

\`\`\`
OilBookingSystem/
├── OilBookingSystem.API/          # ASP.NET Core Web API
│   ├── Controllers/               # API Controllers
│   ├── Models/                    # Entity Models
│   ├── Services/                  # Business Logic
│   ├── Data/                      # Database Context
│   └── ViewModels/                # Request/Response Models
├── scripts/                       # Database Scripts
├── components/                    # React Components
├── app/                          # Next.js App Router
└── lib/                          # Utility Functions
\`\`\`

## Features

- ✅ User Management (CRUD)
- ✅ Product Management (CRUD)
- ✅ Counter Party Management (CRUD)
- ✅ Request Management
- ✅ Order Management
- ✅ Invoice Management
- ✅ Database Integration
- ✅ RESTful API
- ✅ Modern React UI

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `PATCH /api/users/{id}/toggle-active` - Toggle user active status

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Counter Parties
- `GET /api/counterparties` - Get all counter parties
- `POST /api/counterparties` - Create new counter party
- `PUT /api/counterparties/{id}` - Update counter party
- `DELETE /api/counterparties/{id}` - Delete counter party

## Development

### Running in Development Mode

1. Start the API:
   \`\`\`bash
   cd OilBookingSystem.API
   dotnet watch run
   \`\`\`

2. Start the frontend:
   \`\`\`bash
   npm run dev
   \`\`\`

### Database Migrations

To create a new migration:
\`\`\`bash
cd OilBookingSystem.API
dotnet ef migrations add MigrationName
dotnet ef database update
\`\`\`

## Troubleshooting

1. **Database Connection Issues**: 
   - Ensure SQL Server is running
   - Check connection string in `appsettings.json`
   - Verify database exists and scripts have been run

2. **CORS Issues**:
   - Ensure frontend URL is added to CORS policy in `Program.cs`

3. **Port Conflicts**:
   - API runs on ports 5001/7001
   - Frontend runs on port 3000
   - Change ports in `launchSettings.json` or `package.json` if needed

## Next Steps

- Add authentication and authorization
- Implement real-time updates with SignalR
- Add file upload functionality
- Implement advanced reporting
- Add email notifications

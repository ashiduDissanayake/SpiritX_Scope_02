#!/bin/bash
# Database initialization script for Spirit11

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Set default values if not found in environment
DB_HOST=${DB_HOST:-"localhost"}
DB_USER=${DB_USER:-"root"}
DB_PASSWORD=${DB_PASSWORD:-""}
DB_NAME=${DB_NAME:-"spirit11"}

echo "=== Spirit11 Database Initialization ==="
echo "This script will:"
echo "1. Create the database schema"
echo "2. Create the default admin user"
echo "3. Import player data from CSV"
echo ""

# Create the database schema
echo "Creating database schema..."
mysql -h $DB_HOST -u $DB_USER ${DB_PASSWORD:+-p$DB_PASSWORD} < database_setup.sql
if [ $? -eq 0 ]; then
  echo "Database schema created successfully!"
else
  echo "Error creating database schema"
  exit 1
fi

# Import player data using the Node.js script
echo "Importing player data..."
node scripts/data_import.js
if [ $? -eq 0 ]; then
  echo "Player data imported successfully!"
else
  echo "Error importing player data"
  exit 1
fi

echo ""
echo "=== Database initialization completed ==="
echo "You can now start the application"
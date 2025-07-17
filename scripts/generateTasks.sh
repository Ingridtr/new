#!/bin/bash

# Task File Generator Script
# This script generates individual JSON task files for activities

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${BLUE}🎯 Activity Task File Generator${NC}"
echo "=================================="

# Check if node is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is required but not installed.${NC}"
    exit 1
fi

# Navigate to script directory
cd "$SCRIPT_DIR"

# Check for arguments
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: ./generateTasks.sh [activity-id]"
    echo ""
    echo "Options:"
    echo "  activity-id    Generate tasks only for the specified activity ID"
    echo "  --help, -h     Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./generateTasks.sh                    # Generate tasks for all activities"
    echo "  ./generateTasks.sh mattesheriff       # Generate tasks only for mattesheriff"
    exit 0
fi

# Run the Node.js script
echo -e "${BLUE}🚀 Running task generator...${NC}"
echo ""

if [ -z "$1" ]; then
    node generateTaskFiles.js
else
    node generateTaskFiles.js "$1"
fi

# Check if script ran successfully
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✨ Task generation completed successfully!${NC}"
else
    echo ""
    echo -e "${RED}❌ Task generation failed!${NC}"
    exit 1
fi

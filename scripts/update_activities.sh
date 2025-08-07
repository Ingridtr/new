#!/bin/bash
# Quick Update Script for Activities
# This script provides shortcuts for common update operations

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UPDATE_SCRIPT="$SCRIPT_DIR/update_activities_from_csv.py"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Activity Update Helper${NC}"
echo "======================================"

# Check if Python script exists
if [[ ! -f "$UPDATE_SCRIPT" ]]; then
    echo -e "${RED}❌ Error: update_activities_from_csv.py not found!${NC}"
    exit 1
fi

# Function to show usage
show_usage() {
    echo -e "${YELLOW}Usage:${NC}"
    echo "  $0 <csv-file>                    # Update activities from CSV"
    echo "  $0 <csv-file> --grade <grade>   # Force specific grade"
    echo "  $0 <csv-file> --backup          # Create backup before update"
    echo "  $0 <csv-file> --dry-run         # Preview changes without updating"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  $0 new_activities.csv"
    echo "  $0 activities.csv --grade 'Andre årstrinn'"
    echo "  $0 *.csv --backup"
    echo "  $0 activities.csv --dry-run"
    echo ""
}

# Check arguments
if [[ $# -eq 0 ]]; then
    echo -e "${RED}❌ No CSV file specified!${NC}"
    echo ""
    show_usage
    exit 1
fi

# Check if first argument is a help flag
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    show_usage
    exit 0
fi

# Run the Python script with all arguments
echo -e "${GREEN}📄 Running update with: $@${NC}"
echo ""

python3 "$UPDATE_SCRIPT" "$@"
exit_code=$?

echo ""
if [[ $exit_code -eq 0 ]]; then
    echo -e "${GREEN}✅ Update completed successfully!${NC}"
else
    echo -e "${RED}❌ Update failed with exit code $exit_code${NC}"
fi

exit $exit_code

#!/bin/bash

# Status Overview Updater
# This script automatically updates the status overview tables for Projects and Tutorials every 30 seconds

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo "OPTIONS:"
    echo "  --once      - Run once and exit"
    echo "  --daemon    - Run continuously every 30 seconds (default)"
    echo "  -h, --help  - Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0           # Run continuously every 30 seconds"
    echo "  $0 --daemon  # Run continuously every 30 seconds"
    echo "  $0 --once    # Run once and exit"
}

# Parse command line arguments
DAEMON_MODE=true

while [[ $# -gt 0 ]]; do
    case $1 in
        --once)
            DAEMON_MODE=false
            shift
            ;;
        --daemon)
            DAEMON_MODE=true
            shift
            ;;
        -h|--help|help)
            show_usage
            exit 0
            ;;
        *)
            echo "❌ Error: Unknown option '$1'"
            echo ""
            show_usage
            exit 1
            ;;
    esac
done

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change to the script directory
cd "$SCRIPT_DIR"

# Function to update status tables
update_status() {
    echo "🔄 Updating status overview tables... $(date)"
    
    # Run the Python script to update all sections
    python3 generate_status_overview.py
    
    echo "✅ Status overview tables updated successfully! $(date)"
}

# Handle interrupt signal (Ctrl+C)
trap 'echo ""; echo "🛑 Stopping status updater..."; exit 0' INT

if [ "$DAEMON_MODE" = true ]; then
    echo "🚀 Starting status overview updater in daemon mode..."
    echo "📝 Updates will run every 30 seconds"
    echo "🛑 Press Ctrl+C to stop"
    echo ""
    
    # Run initial update
    update_status
    
    # Run continuously every 30 seconds
    while true; do
        sleep 30
        update_status
    done
else
    # Run once
    update_status
fi
